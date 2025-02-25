import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const application = 'Fut-Amigos'

//Função para a conexão ao banco de dados
const mongoConnect = (app) => {
    mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log(`Conectado ao mongoDB: APP => ${application}`)
    })
    .catch((error) => {
        console.log(`Erro ao tentar se conectar ao mongoDB => ${error}`)
    })
}

export default mongoConnect