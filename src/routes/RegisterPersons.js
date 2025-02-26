import { Router } from "express"
import Partida from "../models/Partida.js"
import Players from "../models/Players.js"
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

register.post('/addPerson/:id', (req, res) => {
    //Pegando os dados do jogador do formulário
    const { name, phone } = req.body
    //Pegando o id da partida
    const { id } = req.params

    const newPlayer = new Players({name, phone})

    newPlayer.save()
    .then((savedPlayer) => {
        Partida.findById(id)
        .then((partida) => {
            if(!partida){
                console.log("Partida não encontrada!")
            }

            partida.players.push(savedPlayer._id)

            return partida.save()
        })
    })
    .then(() => {
        res.redirect('/')
    })
    .catch((error) => {
        console.log("Erro ao adicionar jogador!", error)
    })  
})

register.get('/listPersons/:id', (req, res) => {
    const { id } = req.params
    Partida.findById(id)
    .populate('players', 'name phone')
    .then((data) => {
        res.render('pages/listPersons', {data})
    })
    .catch((error) => {
        console.log(error)
    })
})

export default register