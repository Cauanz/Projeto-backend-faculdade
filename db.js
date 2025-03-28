const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("backend_projeto_faculdade", "postgres", "2456", {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
});

async function connectDB() {
  try {
  await sequelize.authenticate();
  console.log("Conexão com banco de dados bem sucedida");
  } catch (error) {
    console.log("Não foi possivel se conectar ao banco de dados", error)
  }
}

connectDB();


module.exports = sequelize;