const yup = require("yup");

const sendOTPValidatior = yup.object({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^(09)[0-9]{9}$/,
      "Phone number must start with 09 and be 11 digits long"
    ),
});

const otpVerifyValidator = yup.object({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^(09)[0-9]{9}$/,
      "Phone number must start with 09 and be 11 digits long"
    ),
  otp: yup
    .string()
    .required("OTP code is required")
    .matches(/^[0-9]+$/, "OTP code must be a string of numbers"),
});

module.exports = {
  sendOTPValidatior,
  otpVerifyValidator,
};
