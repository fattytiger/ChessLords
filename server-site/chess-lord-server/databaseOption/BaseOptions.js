const base = require('../datamodel/BaseModel')

module.exports = {
    findBaseByHeroID:function(hero_id){
        return new Promise((resolved,reject) =>{
            base.findOne({
                hero_id:hero_id
            },(err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },
    findBaseByObjectID:function(objec_id){
        return new Promise((resolved,reject) => {
            base.findOne({
                _id:objec_id
            },(err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },

    updateBaseHPByObjectID:function(hp,object_id){
        return new Promise((resolved,reject) => {
            let searchCondition = {"_id":object_id}
            let updateCondition = {"base_hp":hp}
            base.updateOne(searchCondition,updateCondition,(err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },

    createRedBaseByHeroID: function (heroID) {
        return new Promise((resolved, reject) => {
            let newBase = new base({
                tile_id: 52,
                base_hp: 200,
                hero_id: heroID,
                camp: 'red'

            })
            newBase.save((err, document) => {
                if (err) { reject }
                resolved(document)
            })
        })
    },
    createBlueBaseByHeroID:function(heroID){
        return new Promise((resolved,reject) => {
            let newBase = new base({
                tile_id: 192,
                base_hp: 200,
                hero_id: heroID,
                camp: 'blue'
            })

            newBase.save((err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },

    deleteBaseByHeroID:function(hero_id){
        return new Promise((resolved,reject)=>{
            base.deleteOne({hero_id:hero_id},(error,status) => {
                if(error){reject}
                resolved(status)
            })
        })
    }
}