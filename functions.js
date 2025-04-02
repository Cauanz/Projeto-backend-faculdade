
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const formatCPF = (cpf) => {
  return cpf.replace(/\D/g, '');
}

function formatPhone(phone) {
  return phone.replace(/\D/g, '');
}

module.exports = { removeAccents, formatCPF, formatPhone };