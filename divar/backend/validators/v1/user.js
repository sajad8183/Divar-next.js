const yup = require("yup");

const nationalCodeValidator = yup.object().shape({
  nationalCode: yup.number().required("national code is required"),
});

const roleValidator = yup.object().shape({
  role: yup.string().required("Role is required").oneOf(["ADMIN", "USER"]),
});

module.exports = { nationalCodeValidator, roleValidator };
