const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TroopSchema = new Schema({
    hero_id:{type:String,required:true,max:100},
    tile_from:{type:Number,required:true},
    tile_to:{type:Number,required:true},
    troop_type:{type:Number,required:true},
    troop_name:{type:String,required:true},
    troop_hp:{type:Number,required:true},
    camp:{type:String,required:true},
    master_troop:{type:Boolean,default:false}
})


module.exports = mongoose.model('troop',TroopSchema)