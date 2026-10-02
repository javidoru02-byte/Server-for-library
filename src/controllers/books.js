const pool = require("../db");

const getAll = async (req, res) => {
  const result = await pool.query("SELECT * FROM books ORDER BY id");
  res.json(result.rows);
};

const getById = async (req, res) => {
  const result = await pool.query("SELECT * FROM books WHERE id = $1", [
    req.params.id,
  ]);
  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(result.rows[0]);
};

const create = async (req, res) => {
  const { title, genre_id, shelf_id, description, image } = req.body;
  const result = await pool.query(
    `INSERT INTO books (title, genre_id, shelf_id, description, image, "createdAt", "updatedAt")
     VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *`,
    [title, genre_id, shelf_id, description, image],
  );
  res.status(201).json(result.rows[0]);
};

const update = async (req, res) => {
  const { title, genre_id, shelf_id, description, image } = req.body;
  const result = await pool.query(
    `UPDATE books
     SET title = $1, genre_id = $2, shelf_id = $3, description = $4, image = $5, "updatedAt" = NOW()
     WHERE id = $6 RETURNING *`,
    [title, genre_id, shelf_id, description, image, req.params.id],
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(result.rows[0]);
};

const remove = async (req, res) => {
  const result = await pool.query(
    "DELETE FROM books WHERE id = $1 RETURNING *",
    [req.params.id],
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.status(204).send();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
