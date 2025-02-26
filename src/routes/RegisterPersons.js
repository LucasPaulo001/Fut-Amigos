import { Router } from "express"
import Partida from "../models/Partida.js"
import Players from "../models/Players.js"
import mongoose from "mongoose"
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
    .populate('players', 'name phone status')
    .then((data) => {
        res.render('pages/listPersons', {data})
    })
    .catch((error) => {
        console.log(error)
    })
})

register.post('/updateStatus/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Verifica se o id é válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    Players.findOneAndUpdate(
        { _id: id }, // Filtro passado como objeto
        { $set: { status: status } },
        { new: true }
    )
    .then(updatedPlayer => {
        if (!updatedPlayer) {
            return res.status(404).json({ message: 'Jogador não encontrado' });
        }
        res.json({ message: 'Status atualizado com sucesso!', player: updatedPlayer });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Erro ao atualizar status.' });
    });
});


export default register