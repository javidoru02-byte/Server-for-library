const yup = require("yup");

const customersSchema = yup.object().shape({
  password: yup.string().required().max(255),
  full_name: yup.string().trim().nullable().max(255),
  email: yup.string().trim().email().nullable().max(255),
  phone: yup.string().trim().nullable().max(255),
});

module.exports = { customersSchema };
