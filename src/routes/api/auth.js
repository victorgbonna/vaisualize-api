
const login = require("../../controllers/auth/login");
const loginWithGoogle = require("../../controllers/auth/loginWithGoogle");
const register = require("../../controllers/auth/register");
const registerWithGoogle = require("../../controllers/auth/registerWithGoogle");
const { registerSchema, loginSchema, authGoogleSchema } = require("../../middleware/validators/auth");
const { approvePaymentSchema } = require("../../middleware/validators/payment");

const router = require("express").Router();

router.post("/sign-in",loginSchema, login); 
router.post("/google/sign-in", authGoogleSchema, loginWithGoogle);
router.post("/sign-up",registerSchema, register);
router.post("/google/sign-up", authGoogleSchema, registerWithGoogle);


module.exports = router;