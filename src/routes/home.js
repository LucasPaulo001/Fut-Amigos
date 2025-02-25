import { Router } from "express"
import Partida from "../models/Partida.js"
const home = Router()


home.get('/', (req, res) => {
    Partida.find()
    .then((partida) => {
        res.render('pages/home', {partida})
    })
})

home.post('/', (req, res) => {
    const { title, local, dateGame } = req.body

    const newPartida = new Partida({
        title: title,
        local: local,
        dateGame: dateGame
    })

    newPartida.save()
    .then(() => {
        res.redirect('/')
        console.log("Dados salvos!")
    })
    .catch((error) => {
        console.log('Erro ao salvar dados', error)
    })
})

export default home