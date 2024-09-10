const yup = require("yup");

const linkSchema = async (field, data) => {
  return yup
    .object()
    .shape({
      [field.slug]: yup
        .string()
        .trim()
        .required("This field is required.")
        .url("you should send a url") // Validates as a URL
        .max(2048, "Maximum length is 2048 characters."),
    })
    .validate({ [field.slug]: data }, { abortEarly: false });
};

const checkboxSchema = async (field, data) => {
  return yup
    .object()
    .shape({
      [field.slug]: yup.boolean().required("Please select this checkbox."),
    })
    .validate({ [field.slug]: data }, { abortEarly: false });
};

const textSchema = async (field, data) => {
  return yup
    .object()
    .shape({
      [field.slug]: yup
        .string()
        .trim()
        .required("This field is required.")
        .min(3, "Minimum length is 3 characters.")
        .max(255, "Maximum length is 255 characters."),
    })
    .validate({ [field.slug]: data }, { abortEarly: false });
};
const numberSchema = async (field, data) => {
  return yup
    .object()
    .shape({
      [field.slug]: yup
        .number()
        .required("This field is required.")
        .min(field.min, `Minimum value is ${field.min}.`)
        .max(field.max, `Maximum value is ${field.max}.`),
    }) // Set maximum value from field data
    .validate({ [field.slug]: data }, { abortEarly: false });
};

const radioSchema = async (field, data) => {
  return yup
    .object()
    .shape({
      [field.slug]: yup
        .string()
        .required("Please select an option.")
        .oneOf(field.options, "Invalid option."),
    }) // Set maximum value from field data
    .validate({ [field.slug]: data }, { abortEarly: false });
};

const dynamicFieldsValidator = async (field, data) => {
  try {
    switch (field.type) {
      case "text":
        return await textSchema(field, data);

      case "checkbox":
        return await checkboxSchema(field, data);

      case "link":
        return await linkSchema(field, data);

      case "number":
        return await numberSchema(field, data);

      case "radio":
      case "selectbox":
        return await radioSchema(field, data);

      default:
        console.log("error in validating dynamic data");
        break;
    }
  } catch (error) {
    throw error;
  }
};

const postStaticFieldsValidator = yup.object().shape({
  title: yup.string().required("Title is required."),
  description: yup
    .string()
    .min(3, "Description must be at least 3 characters."),
  city: yup.string().required("City is required."),
  neighborhood: yup.string().required("Neighborhood is required."),
  price: yup.number().required("price is required. send 0 for قیمت توافقی"),
  map: yup.object().shape({
    x: yup.number().required("Map X coordinate is required."),
    y: yup.number().required("Map Y coordinate is required."),
  }),
  exchange:yup.boolean()
});


const postStaticFieldsUpdateValidator = yup.object().shape({
  title: yup.string(),
  description: yup
    .string()
    .min(3, "Description must be at least 3 characters."),
  city: yup.string(),
  neighborhood: yup.string(),
  price: yup.number(),
  map: yup.object().shape({
    x: yup.number(),
    y: yup.number(),
  }),
  exchange:yup.boolean()
});

module.exports = { dynamicFieldsValidator, postStaticFieldsValidator,postStaticFieldsUpdateValidator };
