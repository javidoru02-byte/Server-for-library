require("dotenv").config();

const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.json());

const authorsRouter = require("./routes/authors");
app.use("/authors", authorsRouter);

const booksRouter = require("./routes/books");
app.use("/books", booksRouter);

const customersRouter = require("./routes/customers");
app.use("/customers", customersRouter);

const errorHandler = require("./middelwares/errorHandler");
app.use(errorHandler);


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
