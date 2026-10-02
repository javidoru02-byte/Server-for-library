const express = require("express");
const controller = require("../controllers/authors.js");
const validate = require("../middelwares/validate.js");
const { authorsSchema } = require("../validation/author.js");

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validate(authorsSchema), controller.create);
router.put("/:id", validate(authorsSchema), controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
