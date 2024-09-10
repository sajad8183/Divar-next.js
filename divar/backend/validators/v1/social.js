const yup = require("yup");

const createSocialValidator = yup.object().shape({
  name: yup
    .string()
    .required("Name is required"),
  link: yup.string().required("Link is required"),
});

const updateSocialValidator = yup.object().shape({
  name: yup.string(),
  link: yup.string(),
});

module.exports = { createSocialValidator, updateSocialValidator };
