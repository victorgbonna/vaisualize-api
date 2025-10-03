const approvePayments = require("../../controllers/admin/approvePayments");
const getAllPayments = require("../../controllers/admin/getAllPayments");
const getAllPaymentsByEmail = require("../../controllers/admin/getAllPaymentsByEmail");
const getAllRequests = require("../../controllers/admin/requests/getAllRequests");
const getOneRequest = require("../../controllers/admin/requests/getOneRequest");
const getSavedEmailRequests = require("../../controllers/admin/requests/getSavedEmailRequests");
const getSavedRequests = require("../../controllers/admin/requests/getSavedRequests");

const router = require("express").Router();


router.get("/requests/all", getAllRequests); 
router.get("/request/saved", getSavedRequests);
router.get("/request/saved/:email", getSavedEmailRequests);
router.get("/request/saved/one/:id", getOneRequest);

router.get("/payments", getAllPayments);
router.get("/payments/:email", getAllPaymentsByEmail);
router.patch("/payments/approve", approvePayments);

module.exports = router;