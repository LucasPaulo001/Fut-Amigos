import mongoose, { Schema } from "mongoose"

const PartidaSchema = new Schema({
    title: {type: String, required: true},
    local: {type: String, required: true},
    dateGame: {type: Date, required: true}
})

export default mongoose.model('Partida', PartidaSchema)