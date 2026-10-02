const pool = require("../db");

const getAll = async (req, res) => {
  const result = await pool.query("SELECT * FROM authors ORDER BY id");
  res.json(result.rows);
};

const getById = async (req, res) => {
  const result = await pool.query("SELECT * FROM authors WHERE id = $1", [
    req.params.id,
  ]);
  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Author not found" });
  }
  res.json(result.rows[0]);
};

const create = async (req, res) => {
  const { full_name, email, nationality_id } = req.body;
  const result = await pool.query(
    `INSERT INTO authors (full_name, email, nationality_id, "createdAt", "updatedAt")
     VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *`,
    [full_name, email, nationality_id],
  );
  res.status(201).json(result.rows[0]);
};

const update = async (req, res) => {
  const { full_name, email, nationality_id } = req.body;
  const result = await pool.query(
    `UPDATE authors SET full_name = $1, email = $2, nationality_id = $3, "updatedAt" = NOW() WHERE id = $4 RETURNING *`,
    [full_name, email, nationality_id, req.params.id],
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Author not found" });
  }
  res.json(result.rows[0]);
};

const remove = async (req, res) => {
  const result = await pool.query(
    "DELETE FROM authors WHERE id = $1 RETURNING *",
    [req.params.id],
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Author not found" });
  }
  res.json(result.rows[0]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
