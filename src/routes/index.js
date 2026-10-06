const express = require("express");

const authorRouter = require("./authors");
const booksRouter = require("./books");
const customersRouter = require("./customers");

const router = express.Router();

router.use("/authors", authorRouter);
router.use("/books", booksRouter);
router.use("/customers", customersRouter);

module.exports = router;
