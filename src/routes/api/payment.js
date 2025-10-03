const addPayment = require("../../controllers/payment/addPayment");
const checkIfPaymentExists = require("../../controllers/payment/checkIfPaymentExists");
const initializePayment = require("../../controllers/payment/initializePayment");

const router = require("express").Router();

router.get("/check/:email", checkIfPaymentExists); 
router.post("/initialize", initializePayment);
router.post("/add", addPayment);

module.exports = router;