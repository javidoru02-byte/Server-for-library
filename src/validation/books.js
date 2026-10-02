const yup = require("yup");

const booksSchema = yup.object().shape({
  title: yup.string().trim().required().max(255),
  genre_id: yup.number().integer().required(),
  shelf_id: yup.number().integer().required(),
  description: yup.string().trim().nullable(),
  image: yup.string().trim().max(255).nullable(),
});
module.exports = { booksSchema };
