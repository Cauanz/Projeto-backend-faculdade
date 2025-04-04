const { adminRegister, adminLogin, getAdmins, getAdmin, updateAdmin, deleteAdmin } = require("../controllers/admin-controller");
const { doctorRegister, doctorLogin, getDoctors, getDoctor, updateDoctor, deleteDoctor } = require("../controllers/doctor-controller");
const { patientRegister, patientLogin, getPatients, getPatient, updatePatient, deletePatient } = require("../controllers/pacient-controller");
const router = require("express").Router();


//ROTAS PACIENTES:
router.post("/patients/", patientRegister);
router.post("/patients/login/", patientLogin);
// router.post("/patients/logout/", patientLogout);
router.get("/patients/", getPatients);
router.get("/patients/:id", getPatient);
router.put("/patients/:id", updatePatient);
router.delete("/patients/:id", deletePatient);

//TODO - TECNICAMENTE É SÓ TERMINAR AS ROTAS DE PACIENTE E DUPLICAR ELAS ALTERANDO OQUE FOR NECESSÁRIO NAS OUTRAS (DISSERAM QUE EU SÓ PRECISO FAZER O CRUD, NÉ?)
//TODO - CRIAR O MIDDLEWARE QUE EXIGE TOKEN PARA ACESSAR ROTAS

//ROTAS PROFISSIONAIS:
router.post("/doctors/", doctorRegister);
router.post("/doctors/login", doctorLogin);
// router.post("/doctors/logout", doctorsLogout);
router.get("/doctors/", getDoctors);
router.get("/doctors/:id", getDoctor);
router.put("/doctors/:id", updateDoctor);
router.delete("/doctors/:id", deleteDoctor);


//ROTAS ADMINISTRADORES:
router.post("/admin/", adminRegister);
router.post("/admin/login", adminLogin);
// router.post("/admin/logout", adminLogout);
router.get("/admin/", getAdmins);
router.get("/admin/:id", getAdmin);
router.put("/admin/:id", updateAdmin);
router.delete("/admin/:id", deleteAdmin);

module.exports = router;