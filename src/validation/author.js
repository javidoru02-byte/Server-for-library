const yup = require("yup");

const authorsSchema = yup.object({
  full_name: yup.string().trim().required().max(255),
  email: yup.string().trim().required().email().max(255),
  nationality_id: yup.number().integer().nullable(),
});
module.exports = { authorsSchema };
