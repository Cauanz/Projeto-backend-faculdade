const router = require("express").Router();
const { adminRegister, adminLogin, getAdmins, getAdmin, updateAdmin, deleteAdmin } = require("../controllers/admin-controller");
const { appointmentRegister, getAppointments, getAppointment, updateAppointment, deleteAppointment, getPacientAppointment, getPacientAppointments } = require("../controllers/appointment-controller");
const { doctorRegister, doctorLogin, getDoctors, getDoctor, updateDoctor, deleteDoctor } = require("../controllers/doctor-controller");
const { patientRegister, patientLogin, getPatients, getPatient, updatePatient, deletePatient } = require("../controllers/pacient-controller");


//ROTAS PACIENTES:
router.post("/patients/", patientRegister); //Cria um novo paciente
router.post("/patients/login/", patientLogin); //Realiza login do paciente com token JWT
// router.post("/patients/logout/", patientLogout);
router.get("/patients/", getPatients); //Retorna todos os pacientes.
router.get("/patients/:id", getPatient); //Retorna paciente especifico pelo ID.
router.put("/patients/:id", updatePatient); //Atualiza paciente especifico pelo ID.
router.delete("/patients/:id", deletePatient); //Remove paciente especifico pelo ID.

//ROTAS PROFISSIONAIS:
router.post("/doctors/", doctorRegister);  //Cria um novo profissional.
router.post("/doctors/login", doctorLogin); //Realiza login do profissional com token JWT.
// router.post("/doctors/logout", doctorsLogout);
router.get("/doctors/", getDoctors); //Retorna todos os pacientes.
router.get("/doctors/:id", getDoctor); //Retorna paciente especifico pelo ID.
router.put("/doctors/:id", updateDoctor); //Atualiza paciente especifico pelo ID.
router.delete("/doctors/:id", deleteDoctor); //Remove paciente especifico pelo ID.

//ROTAS ADMINISTRADORES:
router.post("/admin/", adminRegister); //Cria um novo administrador.
router.post("/admin/login", adminLogin); //Realiza login do administrador com token JWT.
// router.post("/admin/logout", adminLogout);
router.get("/admin/", getAdmins); //Retorna todos os administradores.
router.get("/admin/:id", getAdmin); //Retorna administrador especifico pelo ID.
router.put("/admin/:id", updateAdmin); //Atualiza administrador especifico pelo ID.
router.delete("/admin/:id", deleteAdmin); //Remove administrador especifico pelo ID.

//ROTAS CONSULTAS:
router.post("/appointments/", appointmentRegister); //Cria uma nova consulta.
router.get("/appointments/", getAppointments); //Retorna todas as consultas cadastradas.
router.delete("/appointments/:pacientId", getPacientAppointments); //Retorna todas as consultas de um paciente específico pelo ID.
router.get("/appointments/:id", getAppointment); //Retorna uma consulta específica pelo ID.
router.put("/appointments/:id", updateAppointment); //Atualiza uma consulta específica pelo ID.
router.delete("/appointments/:id", deleteAppointment); //Remove uma consulta específica pelo ID.

module.exports = router;