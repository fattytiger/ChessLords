
const hero = require('../datamodel/HeroModel')

module.exports = {

    findLoginedHeros:function(){
        return new Promise((resolved,reject) => {
            hero.find({"login":true},(err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },

    findReadyHeroes:function(){
        return new Promise((resolved,reject) => {
            hero.find({"ready":true,"ingame":false},(err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },

    findHero:function(findCondition){
        return new Promise((resolved,reject) => {
            hero.find(findCondition,(err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },

    findHeroByHeroID:function(hero_id){
        return new Promise((resolved,reject) => {
            hero.findOne({
                hero_id:hero_id
            },(err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },

    findAnotherReadyHero:function(){
       let searchCondition = { 'login': true, 'ready': true}
        return new Promise((resolved,reject) => {
            hero.find(searchCondition,(err,documents) => {
                if(err){reject}
                resolved(documents)
            })
        })
    },

    updateHeroLoginByHeroID:function(hero_id,isTrue){
        return new Promise((resolved,reject) => {
            let searchCondition = {"hero_id":hero_id}
            let updateCondition = {"login":isTrue}
            hero.updateOne(searchCondition,updateCondition,(err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    }, 

    updateHero:function(searchCondition,updateCondition){
        return new Promise((resolved,reject) => {
            hero.updateOne(searchCondition,updateCondition,(err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },
    
    updateHeroReadyByHeroID:function(hero_id,isTrue){
        return new Promise((resolved,reject) => {
            let searchCondition = {"hero_id":hero_id}
            let updateCondition = {"ready":isTrue}
            hero.updateOne(searchCondition,updateCondition,(err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },

    updateHeroIngameByHeroID:function(hero_id,isTrue){
        return new Promise((resolved,reject) => {
            let searchCondition = {"hero_id":hero_id}
            let updateCondition = {"ingame":isTrue}
            hero.updateOne(searchCondition,updateCondition,(err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },

    updateHeroCampByHeroID:function(hero_id,camp){
        return new Promise((resolved,reject) => {
            let searchCondition = {"hero_id":hero_id}
            let updateCondition = {"camp":camp}
            hero.updateOne(searchCondition,updateCondition,(err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },
    updateHeroClientByHeroID:function(hero_id,client){
        return new Promise((resolved,reject) => {
            let searchCondition = {"hero_id":hero_id}
            let updateCondition = {"client":client}
            hero.updateOne(searchCondition,updateCondition,(err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },
    updateHeroAnamyByHeroID:function(hero_id,anmy_id){
        return new Promise((resolved,reject) => {
            let searchCondition = {"hero_id":hero_id}
            let updateCondition = {"anamy":anmy_id}
            hero.updateOne(searchCondition,updateCondition,(err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },
    updateBaseByHeroID:function(hero_id,object_id){
        return new Promise((resolved,reject) => {
            let searchCondition = {"hero_id":hero_id}
            let updateCondition = {"base"   :object_id}
            hero.updateOne(searchCondition,updateCondition,(err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },
    pushTroopByHeroID:function(hero_id,object_id){
        let troop = object_id
        return new Promise((resolved,reject) => {
            let searchCondition = {"hero_id":hero_id}
            let updateCondition = { "$push":{troops:troop} }
            hero.updateOne(searchCondition,updateCondition,(err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },

    deleteHeroTroopesByHeroID:function(hero_id){
        return new Promise((resolved,reject) => {
            let searchCondition = {"hero_id" : hero_id}
            let updateCondition = {"troops" : []}
            hero.updateOne(searchCondition,updateCondition,(err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },

    deleteHeroBaseByHeroID:function(hero_id){
        return new Promise((resolved,reject) => {
            let searchCondition = {"hero_id":hero_id}
            let updateCondition = {"base"   :null}
            hero.updateOne(searchCondition,updateCondition,(err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },
    


    createHeroByHeroID:function(hero_id,hero_name,client){
        return new Promise((resolved,reject) => {
            let newHero = new hero({
                hero_id     : hero_id,
                hero_name   : hero_name,
                client      : client,
                login       : true,
                ready       : false,
                ingame      : false,
                camp        : null ,
                base        : null
            })
            newHero.save((err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    }

}