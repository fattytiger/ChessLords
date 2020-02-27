const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TroopSchema = new Schema({
    hero_id:{type:String,required:true,max:100},
    tile_from:{type:Number,required:true},
    tile_to:{type:Number,required:true}
})

module.exports = mongoose.model('troop',TroopSchema)