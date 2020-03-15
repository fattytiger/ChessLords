const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const roomSchema = new Schema({
    heros:{type:Array,require:true},
    room_name:{type:String,require:true}
})
module.exports = mongoose.model('room',roomSchema)