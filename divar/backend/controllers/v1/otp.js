const request = require("request");
const otpModel = require("../../models/otp");

exports.send = async (req, res) => {
  const code = Math.floor(Math.random() * 99999);
  request.post(
    {
      url: "http://ippanel.com/api/select",
      body: {
        op: "pattern",
        user: "09921558293",
        pass: "Faraz@2790842760",
        fromNum: "3000505",
        toNum: req.body.phone,
        patternCode: "jqcrkffb9sevvss",
        inputData: [{ "verification-code": code }],
      },
      json: true,
    },
    async function (error, response, body) {
      if (!error && response.statusCode === 200) {
        await otpModel.create({ phone: req.body.phone, code });
        res.json({ message: "Code send successfully :))" });
      } else {
        res.json({ message: "Unknown error !!" });
      }
    }
  );
};

exports.verify = async (req, res) => {
  const { phone, code } = req.body;

  const otp = await otpModel.findOne({ phone, code });
  if (otp) {
    return res.status(200).json({ message: "Code is correct" });
  } else {
    return res.status(409).json({ message: "Code is not correct" });
  }
};
