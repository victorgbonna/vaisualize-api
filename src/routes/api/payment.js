const addPayment = require("../../controllers/payment/addPayment");
const checkIfPaymentExists = require("../../controllers/payment/checkIfPaymentExists");
const initializePayment = require("../../controllers/payment/initializePayment");
const { addPaymentSchema } = require("../../middleware/validators/payment");

const router = require("express").Router();

router.get("/check/:email", checkIfPaymentExists); 
router.post("/initialize", addPaymentSchema, initializePayment);
router.post("/add", addPaymentSchema, addPayment);

module.exports = router;