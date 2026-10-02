const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors,
    });
  }

  if (err.code === "23505") {
    return res.status(409).json({
      message: "Record with this value already exists",
      detail: err.detail,
    });
  }

  if (err.code === "23503") {
    if (req.method === "DELETE") {
      return res.status(409).json({
        message: "Cannot delete: record is used by other records",
        detail: err.detail,
      });
    }
    return res.status(400).json({
      message: "Referenced record does not exist",
      detail: err.detail,
    });
  }

  if (err.code === "22P02") {
    return res.status(400).json({
      message: "invalid id format",
    });
  }

  console.error(err);
  res.status(500).json({ message: "Internal server error" });
};

module.exports = errorHandler;
