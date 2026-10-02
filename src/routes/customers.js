const express = require("express");
const controller = require("../controllers/customers.js");
const validate = require("../middelwares/validate.js");
const { customersSchema } = require("../validation/customers.js");

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validate(customersSchema), controller.create);
router.put("/:id", validate(customersSchema), controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
