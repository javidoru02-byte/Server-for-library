const pool = require("../db");

const getAll = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT id, full_name, email, phone, \"createdAt\", \"updatedAt\" FROM customers ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT id, full_name, email, phone, \"createdAt\", \"updatedAt\" FROM customers WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { password, full_name, email, phone } = req.body;
    const result = await pool.query(
      `INSERT INTO customers (password, full_name, email, phone, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING id, full_name, email, phone, "createdAt", "updatedAt"`,
      [password, full_name, email, phone],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { password, full_name, email, phone } = req.body;
    const result = await pool.query(
      `UPDATE customers
       SET password = $1, full_name = $2, email = $3, phone = $4, "updatedAt" = NOW()
       WHERE id = $5 RETURNING id, full_name, email, phone, "createdAt", "updatedAt"`,
      [password, full_name, email, phone, req.params.id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await pool.query(
      "DELETE FROM customers WHERE id = $1 RETURNING id, full_name, email, phone, \"createdAt\", \"updatedAt\"",
      [req.params.id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};