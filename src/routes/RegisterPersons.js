import { Router } from "express"
import Partida from "../models/Partida.js"
const register = Router()

register.get('/addPerson/:id', (req, res) => {
    const { id } = req.params
    Partida.findById(id)
    .then((partidaData) => {
        res.render('pages/addPerson', {partidaData})
    })
    .catch((error) => {
        console.log(error)
    })
})

export default register