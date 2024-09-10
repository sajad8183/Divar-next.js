const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const OTP = require("../../models/OTP");
const User = require("../../models/User");

const { sendSMS } = require("../../services/sms");
const { errorResponse, successResponse } = require("../../helpers/responses");
const {
  sendOTPValidatior,
  otpVerifyValidator,
} = require("../../validators/v1/auth");
const Ban = require("../../models/Ban");

// Helper function to check the existence and expiration of OTP
const getOTPDetails = async (phone) => {
  const otp = await OTP.find({ phone }).sort({ createdAt: -1 });
  if (!otp[0] || otp[0].expiresAt < Date.now() + 30000) {
    return { expired: true, code: null, remainingTime: 0 };
  }

  // calculate the expiration time
  const now = Date.now();
  const remainingTime = Math.round((otp[0].expiresAt - now) / 1000) - 30;
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return {
    expired: false,
    code: otp[0].code,
    remainingTime: formattedTime,
  };
};

const generateOTP = async (phone, length = 5, expireTime = 1) => {
  // generate otp code
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }

  //! temporary
  otp = "1111";

  // expireation time
  const expiresAt = new Date(Date.now() + expireTime * 60 * 1000);

  // hashing the OTP to save in database
  const hashedOTP = await bcrypt.hash(otp, 10);

  await OTP.create({ phone, code: hashedOTP, expiresAt });

  return otp;
};

exports.send = async (req, res, next) => {
  try {
    const { phone } = req.body;

    const isBanned = await Ban.findOne({ phone });
    if (isBanned) {
      return errorResponse(res, 403, "This phone number has been banned");
    }

    await sendOTPValidatior.validate({ phone }, { abortEarly: false });

    const { expired, remainingTime } = await getOTPDetails(phone);
    if (!expired) {
      return successResponse(res, 200, {
        message: `OTP already sent, please try again after ${remainingTime}`,
      });
    }

    //generate and send OTP
    const otp = generateOTP(phone);
    const pattern = process.env.VERIFY_PATTERN_CODE;
    await sendSMS({ toNum: phone, code: otp, pattern });

    return successResponse(res, 200, { message: `OTP sent successfully` });
  } catch (error) {
    next(error);
  }
};

exports.verify = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;

    await otpVerifyValidator.validate({ phone, otp }, { abortEarly: false });

    const svedOtp = await OTP.find({ phone }).sort({ createdAt: -1 });
    if (!svedOtp[0] || svedOtp[0].expiresAt < Date.now()) {
      return successResponse(res, 200, {
        message: "Wrong or Expired OTP",
      });
    }

    //check if code is valid
    const isOTPCorrect = await bcrypt.compare(otp, svedOtp[0].code);

    if (!isOTPCorrect) {
      return errorResponse(res, 400, "Invalid OTP.");
    }

    //check if user available
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      const token = jwt.sign(
        { userId: existingUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );

      return successResponse(res, 200, { token, user: existingUser });
    }

    //create a new user account
    const isFirstUser = (await User.countDocuments()) === 0;

    const user = await User.create({
      phone,
      username: phone,
      role: isFirstUser ? "ADMIN" : "USER",
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return successResponse(res, 201, {
      message: "User registered successfully!",
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Controller to fetch user details based on token
exports.getMe = async (req, res, next) => {
  try {
    const user = req.user;

    return successResponse(res, 200, { user });
  } catch (error) {
    next(error);
  }
};
