const express = require("express");
const controller = require("../controllers/books.js");
const validate = require("../middelwares/validate.js");
const { booksSchema } = require("../validation/books.js");

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validate(booksSchema), controller.create);
router.put("/:id", validate(booksSchema), controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
