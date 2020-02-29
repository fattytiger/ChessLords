const TroopModel = require('../datamodel/troop/TroopModel')

module.exports = {

    createRedSoldierByHeroID: function (hero_id) {
        return new Promise((resolved, reject) => {
            let troop = new TroopModel({
                hero_id: hero_id,
                tile_from: 71,
                tile_to: 71,
                troop_type: 1,
                troop_name: 'solier',
                troop_hp: 100,
                camp: 'red'
            })
            troop.save((err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },
    createRedCavalryByHeroID: function (hero_id) {
        return new Promise((resolved, reject) => {
            let troop = new TroopModel({
                hero_id: hero_id,
                tile_from: 72,
                tile_to: 72,
                troop_type: 2,
                troop_name: 'cavalry',
                troop_hp: 100,
                camp: 'red'
            })
            troop.save((err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },
    createRedArcherByHeroID: function (hero_id) {
        return new Promise((resolved, reject) => {
            let troop = new TroopModel({
                hero_id: hero_id,
                tile_from: 73,
                tile_to: 73,
                troop_type: 3,
                troop_name: 'archer',
                troop_hp: 100,
                camp: 'red'
            })
            troop.save((err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },
    createBlueSoldierByHeroID: function (hero_id) {
        return new Promise((resolved, reject) => {
            let troop = new TroopModel({
                hero_id: hero_id,
                tile_from: 171,
                tile_to: 171,
                troop_type: 1,
                troop_name: 'solier',
                troop_hp: 100,
                camp: 'blue'
            })
            troop.save((err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },
    createBlueCavalryByHeroID: function (hero_id) {
        return new Promise((resolved, reject) => {
            let troop = new TroopModel({
                hero_id: hero_id,
                tile_from: 172,
                tile_to: 172,
                troop_type: 2,
                troop_name: 'cavalry',
                troop_hp: 100,
                camp: 'blue'
            })
            troop.save((err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    },
    createBlueArcherByHeroID: function (hero_id) {
        return new Promise((resolved, reject) => {
            let troop = new TroopModel({
                hero_id: hero_id,
                tile_from: 173,
                tile_to: 173,
                troop_type: 3,
                troop_name: 'archer',
                troop_hp: 100,
                camp: 'blue'
            })
            troop.save((err,document) => {
                if(err){reject}
                resolved(document)
            })
        })
    }

}
