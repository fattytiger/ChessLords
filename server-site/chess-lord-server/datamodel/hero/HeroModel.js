const mongoose = require('mongoose')
const Schema = mongoose.Schema
const heroSchema = new Schema(
    {
        hero_id:{type:String,required:true,max:100},
        hero_name:{type:String,required:true,max:100},
        client:{type:Object,require:true},
        login:{type:Boolean,require:true},
        ready:{type:Boolean,require:true},
        ingame:{type:Boolean,require:true},
        camp:{type:String,require:true},
        anamy:{type:String,default:null},
        troops:{type:Array,default:[]}
    }
)
module.exports = mongoose.model('hero',heroSchema)