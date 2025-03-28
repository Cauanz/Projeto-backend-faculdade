const { patientRegister } = require("../controllers/pacient-controller");
const router = require("express").Router();



router.get("/patientRegister", patientRegister);




module.exports = router;