import mongoose, { Schema } from "mongoose"

const PlayersSchema = new Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    status: { type: String, default: 'Indefinido' }
})

export default mongoose.model('Players', PlayersSchema)