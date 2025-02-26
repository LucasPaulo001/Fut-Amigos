import mongoose, { Schema } from "mongoose"

const PlayersSchema = new Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true}
})

export default mongoose.model('Players', PlayersSchema)