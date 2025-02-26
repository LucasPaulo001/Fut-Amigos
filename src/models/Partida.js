import mongoose, { Schema } from "mongoose"

const PartidaSchema = new Schema({
    title: {type: String, required: true},
    local: {type: String, required: true},
    dateGame: {type: String, required: true},
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Players',
        required: true
    }]
})

export default mongoose.model('Partida', PartidaSchema)