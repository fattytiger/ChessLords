const mongoose = require('mongoose')
const Schema = mongoose.Schema
const playerSchema = new Schema(
    {
        hero_id:{type:String,required:true,max:100},
        hero_name:{type:String,required:true,max:100},
        login:{type:Boolean,require:true},
        ready:{type:Boolean,require:true}
    }
)

playerSchema.virtual('hero')
.get(function(){
    return this.hero_id
})

playerSchema.virtual('player_info')
.get(function(){
    let hero = {}
    hero.hero_id = this.hero_id
    hero.hero_name = this.hero_name
    hero.login = this.login
    hero.ready = this.ready
    return hero
})


module.exports = mongoose.model('player',playerSchema)