
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const formatCPF = (cpf) => {
  return cpf.replace(/\D/g, '');
}

function formatPhone(phone) {
  return phone.replace(/\D/g, '');
}

function formatCRM(crm){
  return crm.replace(/[^a-zA-Z0-9/]/g, '').toUpperCase();
}

module.exports = { removeAccents, formatCPF, formatPhone, formatCRM };