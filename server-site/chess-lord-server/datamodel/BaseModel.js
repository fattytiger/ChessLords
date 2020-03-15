const mongoose = require('mongoose')
const Schema = mongoose.Schema
const baseSchema = new Schema({
    tile_id:{type:Number,required:true},
    base_hp:{type:Number,required:true},
    hero_id:{type:String,required:true},
    camp:{type:String}
})

module.exports = mongoose.model('base',baseSchema)
