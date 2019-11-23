import { type } from "os";

cc.Class({
    extends: cc.Component,

    properties: {
        bottomCity:cc.Node,
        bottomArcher:cc.Node,
        bottomKnight:cc.Node,
        bottomTroop:cc.Node,

        leftCity:cc.Node,
        leftArcher:cc.Node,
        leftKnight:cc.Node,
        leftTroop:cc.Node,

        rightCity:cc.Node,
        rightArcher:cc.Node,
        rightKnight:cc.Node,
        rightTroop:cc.Node

    },

    // LIFE-CYCLE CALLBACKS:
    InitLocation(){
        this.bottomCityOriginal = { x : this.bottomCity.x -100, y : this.bottomCity.y - 100 }
        this.leftCityOriginal   = { x : this.leftCity.x -100,   y : this.leftCity.y -   100 }
        this.rightCityOriginal  = { x : this.rightCity.x  -100, y : this.rightCity.y  - 100 }


        this.bottomCityArea = [
            {x:this.bottomCityOriginal.x - 200  ,y:this.bottomCityOriginal.y + 200},
            {x:this.bottomCityOriginal.x       ,y:this.bottomCityOriginal.y +  200},
            {x:this.bottomCityOriginal.x + 200 ,y:this.bottomCityOriginal.y +  200},
            {x:this.bottomCityOriginal.x - 200 ,y:this.bottomCityOriginal.y      },
            {x:this.bottomCityOriginal.x + 200 ,y:this.bottomCityOriginal.y      },
            {x:this.bottomCityOriginal.x - 200 ,y:this.bottomCityOriginal.y - 200},
            {x:this.bottomCityOriginal.x ,      y:this.bottomCityOriginal.y - 200},
            {x:this.bottomCityOriginal.x + 200 ,y:this.bottomCityOriginal.y - 200},
        ]
        this.leftCityArea = [
            {x:this.leftCityOriginal.x - 200 ,y:this.leftCityOriginal.y + 200 },
            {x:this.leftCityOriginal.x       ,y:this.leftCityOriginal.y +  200},
            {x:this.leftCityOriginal.x + 200 ,y:this.leftCityOriginal.y +  200},
            {x:this.leftCityOriginal.x - 200 ,y:this.leftCityOriginal.y       },
            {x:this.leftCityOriginal.x + 200 ,y:this.leftCityOriginal.y       },
            {x:this.leftCityOriginal.x - 200 ,y:this.leftCityOriginal.y - 200 },
            {x:this.leftCityOriginal.x ,      y:this.leftCityOriginal.y - 200 },
            {x:this.leftCityOriginal.x + 200 ,y:this.leftCityOriginal.y - 200 },
        ]
        this.rightCityArea = [
            {x:this.rightCityOriginal.x - 200 ,y:this.rightCityOriginal.y + 200 },
            {x:this.rightCityOriginal.x       ,y:this.rightCityOriginal.y +  200},
            {x:this.rightCityOriginal.x + 200 ,y:this.rightCityOriginal.y +  200},
            {x:this.rightCityOriginal.x - 200 ,y:this.rightCityOriginal.y       },
            {x:this.rightCityOriginal.x + 200 ,y:this.rightCityOriginal.y       },
            {x:this.rightCityOriginal.x - 200 ,y:this.rightCityOriginal.y - 200 },
            {x:this.rightCityOriginal.x ,      y:this.rightCityOriginal.y - 200 },
            {x:this.rightCityOriginal.x + 200 ,y:this.rightCityOriginal.y - 200 },
        ]
    },


    updateSoliderLocation(){
        this.bottomArcherLocation = { x : this.bottomCityOriginal.x + this.bottomArcher.x , y:this.bottomCityOriginal.y + this.bottomArcher.y }
        this.bottomKnightLocation = { x : this.bottomCityOriginal.x + this.bottomKnight.x , y:this.bottomCityOriginal.y + this.bottomKnight.y }
        this.bottomTroopLocation  = { x : this.bottomCityOriginal.x + this.bottomTroop.x , y:this.bottomCityOriginal.y + this.bottomTroop.y }

        this.bottomArcherArea = [
            { x :this.bottomArcherLocation.x - 200 , y:this.bottomArcherLocation.y + 200 },
            { x :this.bottomArcherLocation.x       , y:this.bottomArcherLocation.y + 200 },
            { x :this.bottomArcherLocation.x + 200 , y:this.bottomArcherLocation.y + 200 },
            { x :this.bottomArcherLocation.x - 200 , y:this.bottomArcherLocation.y       },
            { x :this.bottomArcherLocation.x + 200 , y:this.bottomArcherLocation.y       },
            { x :this.bottomArcherLocation.x - 200 , y:this.bottomArcherLocation.y - 200 },
            { x :this.bottomArcherLocation.x       , y:this.bottomArcherLocation.y - 200 },
            { x :this.bottomArcherLocation.x + 200 , y:this.bottomArcherLocation.y - 200 }
        ]

        this.bottomKnightArea = [
            { x :this.bottomKnightLocation.x - 200 , y:this.bottomKnightLocation.y + 200 },
            { x :this.bottomKnightLocation.x       , y:this.bottomKnightLocation.y + 200 },
            { x :this.bottomKnightLocation.x + 200 , y:this.bottomKnightLocation.y + 200 },
            { x :this.bottomKnightLocation.x - 200 , y:this.bottomKnightLocation.y       },
            { x :this.bottomKnightLocation.x + 200 , y:this.bottomKnightLocation.y       },
            { x :this.bottomKnightLocation.x - 200 , y:this.bottomKnightLocation.y - 200 },
            { x :this.bottomKnightLocation.x       , y:this.bottomKnightLocation.y - 200 },
            { x :this.bottomKnightLocation.x + 200 , y:this.bottomKnightLocation.y - 200 }
        ]

        this.bottomTroopArea = [
            { x :this.bottomTroopLocation.x - 200 , y:this.bottomTroopLocation.y + 200 },
            { x :this.bottomTroopLocation.x       , y:this.bottomTroopLocation.y + 200 },
            { x :this.bottomTroopLocation.x + 200 , y:this.bottomTroopLocation.y + 200 },
            { x :this.bottomTroopLocation.x - 200 , y:this.bottomTroopLocation.y       },
            { x :this.bottomTroopLocation.x + 200 , y:this.bottomTroopLocation.y       },
            { x :this.bottomTroopLocation.x - 200 , y:this.bottomTroopLocation.y - 200 },
            { x :this.bottomTroopLocation.x       , y:this.bottomTroopLocation.y - 200 },
            { x :this.bottomTroopLocation.x + 200 , y:this.bottomTroopLocation.y - 200 }
        ]



        //left city
        this.leftArcherLocation = {x : this.leftCityOriginal.x + this.leftArcher.x , y:this.leftCityOriginal.y + this.leftArcher.y }
        this.leftKnightLocation = {x : this.leftCityOriginal.x + this.leftKnight.x , y:this.leftCityOriginal.y + this.leftKnight.y }
        this.leftTroopLocation  = {x : this.leftCityOriginal.x + this.leftTroop.x  , y:this.leftCityOriginal.y + this.leftTroop.y  }
        
        this.leftArcherArea = [
            { x :this.leftArcherLocation.x - 200 , y:this.leftArcherLocation.y + 200 },
            { x :this.leftArcherLocation.x       , y:this.leftArcherLocation.y + 200 },
            { x :this.leftArcherLocation.x + 200 , y:this.leftArcherLocation.y + 200 },
            { x :this.leftArcherLocation.x - 200 , y:this.leftArcherLocation.y       },
            { x :this.leftArcherLocation.x + 200 , y:this.leftArcherLocation.y       },
            { x :this.leftArcherLocation.x - 200 , y:this.leftArcherLocation.y - 200 },
            { x :this.leftArcherLocation.x       , y:this.leftArcherLocation.y - 200 },
            { x :this.leftArcherLocation.x + 200 , y:this.leftArcherLocation.y - 200 }
        ]
        this.leftKnightArea = [
            { x :this.leftKnightLocation.x - 200 , y:this.leftKnightLocation.y + 200 },
            { x :this.leftKnightLocation.x       , y:this.leftKnightLocation.y + 200 },
            { x :this.leftKnightLocation.x + 200 , y:this.leftKnightLocation.y + 200 },
            { x :this.leftKnightLocation.x - 200 , y:this.leftKnightLocation.y       },
            { x :this.leftKnightLocation.x + 200 , y:this.leftKnightLocation.y       },
            { x :this.leftKnightLocation.x - 200 , y:this.leftKnightLocation.y - 200 },
            { x :this.leftKnightLocation.x       , y:this.leftKnightLocation.y - 200 },
            { x :this.leftKnightLocation.x + 200 , y:this.leftKnightLocation.y - 200 }
        ]
        this.leftTroopArea = [
            { x :this.leftTroopLocation.x - 200 , y:this.leftTroopLocation.y + 200 },
            { x :this.leftTroopLocation.x       , y:this.leftTroopLocation.y + 200 },
            { x :this.leftTroopLocation.x + 200 , y:this.leftTroopLocation.y + 200 },
            { x :this.leftTroopLocation.x - 200 , y:this.leftTroopLocation.y       },
            { x :this.leftTroopLocation.x + 200 , y:this.leftTroopLocation.y       },
            { x :this.leftTroopLocation.x - 200 , y:this.leftTroopLocation.y - 200 },
            { x :this.leftTroopLocation.x       , y:this.leftTroopLocation.y - 200 },
            { x :this.leftTroopLocation.x + 200 , y:this.leftTroopLocation.y - 200 }
        ]

        //right city 
        this.rightArcherLocation = {x : this.rightCityOriginal.x + this.rightArcher.x , y:this.rightCityOriginal.y + this.rightArcher.y }
        this.rightKnightLocation = {x : this.rightCityOriginal.x + this.rightKnight.x , y:this.rightCityOriginal.y + this.rightKnight.y }
        this.rightTroopLocation  = {x : this.rightCityOriginal.x + this.rightTroop.x ,  y:this.rightCityOriginal.y + this.rightTroop.y }

        this.rightArcherArea = [
            { x :this.rightArcherLocation.x - 200 , y:this.rightArcherLocation.y + 200 },
            { x :this.rightArcherLocation.x       , y:this.rightArcherLocation.y + 200 },
            { x :this.rightArcherLocation.x + 200 , y:this.rightArcherLocation.y + 200 },
            { x :this.rightArcherLocation.x - 200 , y:this.rightArcherLocation.y       },
            { x :this.rightArcherLocation.x + 200 , y:this.rightArcherLocation.y       },
            { x :this.rightArcherLocation.x - 200 , y:this.rightArcherLocation.y - 200 },
            { x :this.rightArcherLocation.x       , y:this.rightArcherLocation.y - 200 },
            { x :this.rightArcherLocation.x + 200 , y:this.rightArcherLocation.y - 200 }
        ]

        this.rightKnightArea = [
            { x :this.rightKnightLocation.x - 200 , y:this.rightKnightLocation.y + 200 },
            { x :this.rightKnightLocation.x       , y:this.rightKnightLocation.y + 200 },
            { x :this.rightKnightLocation.x + 200 , y:this.rightKnightLocation.y + 200 },
            { x :this.rightKnightLocation.x - 200 , y:this.rightKnightLocation.y       },
            { x :this.rightKnightLocation.x + 200 , y:this.rightKnightLocation.y       },
            { x :this.rightKnightLocation.x - 200 , y:this.rightKnightLocation.y - 200 },
            { x :this.rightKnightLocation.x       , y:this.rightKnightLocation.y - 200 },
            { x :this.rightKnightLocation.x + 200 , y:this.rightKnightLocation.y - 200 }
        ]

        this.rightTroopArea = [
            { x :this.rightTroopLocation.x - 200 , y:this.rightTroopLocation.y + 200 },
            { x :this.rightTroopLocation.x       , y:this.rightTroopLocation.y + 200 },
            { x :this.rightTroopLocation.x + 200 , y:this.rightTroopLocation.y + 200 },
            { x :this.rightTroopLocation.x - 200 , y:this.rightTroopLocation.y       },
            { x :this.rightTroopLocation.x + 200 , y:this.rightTroopLocation.y       },
            { x :this.rightTroopLocation.x - 200 , y:this.rightTroopLocation.y - 200 },
            { x :this.rightTroopLocation.x       , y:this.rightTroopLocation.y - 200 },
            { x :this.rightTroopLocation.x + 200 , y:this.rightTroopLocation.y - 200 }
        ]

    },
    

    onLoad () {
        this.InitLocation()
        this.updateSoliderLocation()
        this.bottomArcher.getComponent('bottomArcher').maplocation = this
        this.bottomKnight.getComponent('bottomKnight').maplocation = this
        this.bottomTroop.getComponent('bottomTroop').maplocation   = this


        this.leftArcher.getComponent('leftArcher').maplocation     = this
        this.leftKnight.getComponent('leftKnight').maplocation     = this
        this.leftTroop.getComponent('leftTroop').maplocation       = this


        this.rightArcher.getComponent('rightArcher').maplocation   = this
        this.rightKnight.getComponent('rightKnight').maplocation   = this
        this.rightTroop.getComponent('rightTroop').maplocation     = this
    },


    bottomCityJudgeOthercity(solidertype){
        switch (solidertype){
            case 'archer':
                //clear the target
                this.ArcherBottom.targetBandit  = []
                for (let i in this.bottomArcherArea) {
                    let index = parseInt(i)
                    for (let j in this.bottomCityArea) {
                        if (this.bottomArcherArea[i].x == this.bottomCityArea[j].x && this.bottomArcherArea[i].y == this.bottomCityArea[j].y) {
                            cc.find(`Canvas/background/BottomCity/archer/fightRegion/region${index + 1}`).active = false
                        }
                    }
                    //judge self solider
                    if (this.bottomArcherArea[i].x == this.bottomKnightLocation.x && this.bottomArcherArea[i].y == this.bottomKnightLocation.y) {
                        cc.find(`Canvas/background/BottomCity/archer/fightRegion/region${index + 1}`).active = false
                        
                    }
                    if (this.bottomArcherArea[i].x == this.bottomTroopLocation.x && this.bottomArcherArea[i].y == this.bottomTroopLocation.y) {
                        cc.find(`Canvas/background/BottomCity/archer/fightRegion/region${index + 1}`).active = false
                        
                    }
        
                    //judge left city
                    //judge left city
                    for(let left in this.leftCityArea){
                        if(this.bottomArcherArea[i].x == this.leftCityArea[left].x && this.bottomArcherArea[i].y == this.leftCityArea[left].y){
                            cc.find(`Canvas/background/BottomCity/archer/fightRegion/region${index + 1}`).active = false
                            cc.find(`Canvas/background/BottomCity/archer/anamyRegion/anamy${index+1}`).active = true
                            this.ArcherBottom.nearHaveBndit = true
                            //clear the Array
                            this.ArcherBottom.targetBandit.push(this.leftCity)
                        }
                    }
                    if(this.bottomArcherArea[i].x == this.leftKnightLocation.x && this.bottomArcherArea[i].y == this.leftKnightLocation.y){
                        cc.find(`Canvas/background/BottomCity/archer/fightRegion/region${index + 1}`).active = false
                        cc.find(`Canvas/background/BottomCity/archer/anamyRegion/anamy${index+1}`).active = true
                        this.ArcherBottom.nearHaveBndit = true
                        this.ArcherBottom.targetBandit.push(this.leftKnight)
                    }
                    if(this.bottomArcherArea[i].x == this.leftArcherLocation.x && this.bottomArcherArea[i].y == this.leftArcherLocation.y){
                        cc.find(`Canvas/background/BottomCity/archer/fightRegion/region${index + 1}`).active = false
                        cc.find(`Canvas/background/BottomCity/archer/anamyRegion/anamy${index+1}`).active = true
                        this.ArcherBottom.nearHaveBndit = true
                        
                        this.ArcherBottom.targetBandit.push(this.leftArcher)
                        
                    }
                    if(this.bottomArcherArea[i].x == this.leftTroopLocation.x && this.bottomArcherArea[i].y == this.leftTroopLocation.y){
                        cc.find(`Canvas/background/BottomCity/archer/fightRegion/region${index + 1}`).active = false
                        cc.find(`Canvas/background/BottomCity/archer/anamyRegion/anamy${index+1}`).active = true
                        this.ArcherBottom.nearHaveBndit = true
                        this.ArcherBottom.targetBandit.push(this.leftTroop)
                    }
        
        
                    //judge right city
                    for(let right in this.rightCityArea){
                        if(this.bottomArcherArea[i].x == this.rightCityArea[right].x && this.bottomArcherArea[i].y == this.rightCityArea[right].y){
                            cc.find(`Canvas/background/BottomCity/archer/fightRegion/region${index + 1}`).active = false
                            cc.find(`Canvas/background/BottomCity/archer/anamyRegion/anamy${index+1}`).active = true
                            this.ArcherBottom.nearHaveBndit = true
                            this.ArcherBottom.targetBandit.push(this.rightCity)
                        }
                    }
                    if(this.bottomArcherArea[i].x == this.rightKnightLocation.x && this.bottomArcherArea[i].y == this.rightKnightLocation.y){
                        cc.find(`Canvas/background/BottomCity/archer/fightRegion/region${index + 1}`).active = false
                        cc.find(`Canvas/background/BottomCity/archer/anamyRegion/anamy${index+1}`).active = true
                        this.ArcherBottom.nearHaveBndit = true
                        this.ArcherBottom.targetBandit.push(this.rightKnight)
                    }
                    if(this.bottomArcherArea[i].x == this.rightArcherLocation.x && this.bottomArcherArea[i].y == this.rightArcherLocation.y){
                        cc.find(`Canvas/background/BottomCity/archer/fightRegion/region${index + 1}`).active = false
                        cc.find(`Canvas/background/BottomCity/archer/anamyRegion/anamy${index+1}`).active = true
                        this.ArcherBottom.nearHaveBndit = true
                        this.ArcherBottom.targetBandit.push(this.rightArcher)
                    }
                    if(this.bottomArcherArea[i].x == this.rightTroopLocation.x && this.bottomArcherArea[i].y == this.rightTroopLocation.y){
                        cc.find(`Canvas/background/BottomCity/archer/fightRegion/region${index + 1}`).active = false
                        cc.find(`Canvas/background/BottomCity/archer/anamyRegion/anamy${index+1}`).active = true
                        this.ArcherBottom.nearHaveBndit = true
                        this.ArcherBottom.targetBandit.push(this.rightTroop)
                    }
        
                }
                break
            case 'troop':
                this.TroopBottom.targetBandit =[]
                for (let i in this.bottomTroopArea) {
                    let index = parseInt(i)
                    for (let j in this.bottomCityArea) {
                        if (this.bottomTroopArea[i].x == this.bottomCityArea[j].x && this.bottomTroopArea[i].y == this.bottomCityArea[j].y) {
                            cc.find(`Canvas/background/BottomCity/troop/fightRegion/region${index + 1}`).active = false
                        }
                    }
                    //judge self solider
                    if (this.bottomTroopArea[i].x == this.bottomKnightLocation.x && this.bottomTroopArea[i].y == this.bottomKnightLocation.y) {
                        cc.find(`Canvas/background/BottomCity/troop/fightRegion/region${index + 1}`).active = false
                    }
                    if (this.bottomTroopArea[i].x == this.bottomArcherLocation.x && this.bottomTroopArea[i].y == this.bottomArcherLocation.y) {
                        cc.find(`Canvas/background/BottomCity/troop/fightRegion/region${index + 1}`).active = false
                    }
        
                    //judge left city
                    for(let left in this.leftCityArea){
                        if(this.bottomTroopArea[i].x == this.leftCityArea[left].x && this.bottomTroopArea[i].y == this.leftCityArea[left].y){
                            cc.find(`Canvas/background/BottomCity/troop/fightRegion/region${index + 1}`).active = false
                            cc.find(`Canvas/background/BottomCity/troop/anamyRegion/anamy${index+1}`).active = true
                            this.TroopBottom.nearHaveBndit = true
                            this.TroopBottom.targetBandit.push(this.leftCity)
                        }
                    }
                    if(this.bottomTroopArea[i].x == this.leftKnightLocation.x && this.bottomTroopArea[i].y == this.leftKnightLocation.y){
                        cc.find(`Canvas/background/BottomCity/troop/fightRegion/region${index + 1}`).active = false
                        cc.find(`Canvas/background/BottomCity/troop/anamyRegion/anamy${index+1}`).active = true
                        this.TroopBottom.nearHaveBndit = true
                        this.TroopBottom.targetBandit.push(this.leftKnight)
                    }
                    if(this.bottomTroopArea[i].x == this.leftArcherLocation.x && this.bottomTroopArea[i].y == this.leftArcherLocation.y){
                        cc.find(`Canvas/background/BottomCity/troop/fightRegion/region${index + 1}`).active = false
                        cc.find(`Canvas/background/BottomCity/troop/anamyRegion/anamy${index+1}`).active = true
                        this.TroopBottom.nearHaveBndit = true
                        this.TroopBottom.targetBandit.push(this.leftArcher)
                    }
                    if(this.bottomTroopArea[i].x == this.leftTroopLocation.x  && this.bottomTroopArea[i].y == this.leftTroopLocation.y){
                        cc.find(`Canvas/background/BottomCity/troop/fightRegion/region${index + 1}`).active = false
                        cc.find(`Canvas/background/BottomCity/troop/anamyRegion/anamy${index+1}`).active = true
                        this.TroopBottom.nearHaveBndit = true
                        this.TroopBottom.targetBandit.push(this.leftTroop)
                    }
        
        
                    //judge right city
                    for(let right in this.rightCityArea){
                        if(this.bottomTroopArea[i].x == this.rightCityArea[right].x && this.bottomTroopArea[i].y == this.rightCityArea[right].y){
                            cc.find(`Canvas/background/BottomCity/troop/fightRegion/region${index + 1}`).active = false
                            cc.find(`Canvas/background/BottomCity/troop/anamyRegion/anamy${index+1}`).active = true
                            this.TroopBottom.nearHaveBndit = true
                            this.TroopBottom.targetBandit.push(this.rightCity)
                        }
                    }
                    if(this.bottomTroopArea[i].x == this.rightKnightLocation.x && this.bottomTroopArea[i].y == this.rightKnightLocation.y){
                        cc.find(`Canvas/background/BottomCity/troop/fightRegion/region${index + 1}`).active = false
                        cc.find(`Canvas/background/BottomCity/troop/anamyRegion/anamy${index+1}`).active = true
                        this.TroopBottom.nearHaveBndit = true
                        this.TroopBottom.targetBandit.push(this.rightKnight)
                    }
                    if(this.bottomTroopArea[i].x == this.rightArcherLocation.x && this.bottomTroopArea[i].y == this.rightArcherLocation.y){
                        cc.find(`Canvas/background/BottomCity/troop/fightRegion/region${index + 1}`).active = false
                        cc.find(`Canvas/background/BottomCity/troop/anamyRegion/anamy${index+1}`).active = true
                        this.TroopBottom.nearHaveBndit = true
                        this.TroopBottom.targetBandit.push(this.rightArcher)
                    }
                    if(this.bottomTroopArea[i].x == this.rightTroopLocation.x && this.bottomTroopArea[i].y == this.rightTroopLocation.y){
                        cc.find(`Canvas/background/BottomCity/troop/fightRegion/region${index + 1}`).active = false
                        cc.find(`Canvas/background/BottomCity/troop/anamyRegion/anamy${index+1}`).active = true
                        this.TroopBottom.nearHaveBndit = true
                        this.TroopBottom.targetBandit.push(this.rightTroop)
                    }
        
                }
                break
            case 'knight':
                this.KnightBottom.targetBandit =[]
                for (let i in this.bottomKnightArea) {
                    let index = parseInt(i)
                    for (let j in this.bottomCityArea) {
                        if (this.bottomKnightArea[i].x == this.bottomCityArea[j].x && this.bottomKnightArea[i].y == this.bottomCityArea[j].y) {
                            cc.find(`Canvas/background/BottomCity/knight/fightRegion/region${index + 1}`).active = false
                        }
                    }
                    //judge self solider
                    if (this.bottomKnightArea[i].x == this.bottomTroopLocation.x && this.bottomKnightArea[i].y == this.bottomTroopLocation.y) {
                        cc.find(`Canvas/background/BottomCity/knight/fightRegion/region${index + 1}`).active = false
                    }
                    if (this.bottomKnightArea[i].x == this.bottomArcherLocation.x && this.bottomKnightArea[i].y == this.bottomArcherLocation.y) {
                        cc.find(`Canvas/background/BottomCity/knight/fightRegion/region${index + 1}`).active = false
                    }
        
                    //judge left city
                    for(let left in this.leftCityArea){
                        if(this.bottomKnightArea[i].x == this.leftCityArea[left].x && this.bottomKnightArea[i].y == this.leftCityArea[left].y){
                            cc.find(`Canvas/background/BottomCity/knight/fightRegion/region${index + 1}`).active = false
                            cc.find(`Canvas/background/BottomCity/knight/anamyRegion/anamy${index+1}`).active = true
                            this.KnightBottom.nearHaveBndit = true
                            this.KnightBottom.targetBandit.push(this.leftCity)
                        }
                    }
                    if(this.bottomKnightArea[i].x == this.leftKnightLocation.x && this.bottomKnightArea[i].y == this.leftKnightLocation.y){
                        cc.find(`Canvas/background/BottomCity/knight/fightRegion/region${index + 1}`).active = false
                        cc.find(`Canvas/background/BottomCity/knight/anamyRegion/anamy${index+1}`).active = true
                        this.KnightBottom.nearHaveBndit = true
                            this.KnightBottom.targetBandit.push(this.leftKnight)
                    }
                    if(this.bottomKnightArea[i].x == this.leftArcherLocation.x && this.bottomKnightArea[i].y == this.leftArcherLocation.y){
                        cc.find(`Canvas/background/BottomCity/knight/fightRegion/region${index + 1}`).active = false
                        cc.find(`Canvas/background/BottomCity/knight/anamyRegion/anamy${index+1}`).active = true
                        this.KnightBottom.nearHaveBndit = true
                        this.KnightBottom.targetBandit.push(this.leftArcher)
                    }
                    if(this.bottomKnightArea[i].x == this.leftTroopLocation.x  && this.bottomKnightArea[i].y == this.leftTroopLocation.y){
                        cc.find(`Canvas/background/BottomCity/knight/fightRegion/region${index + 1}`).active = false
                        cc.find(`Canvas/background/BottomCity/knight/anamyRegion/anamy${index+1}`).active = true
                        this.KnightBottom.nearHaveBndit = true
                            this.KnightBottom.targetBandit.push(this.leftTroop)
                    }
        
        
                    //judge right city
                    for(let right in this.rightCityArea){
                        if(this.bottomKnightArea[i].x == this.rightCityArea[right].x && this.bottomKnightArea[i].y == this.rightCityArea[right].y){
                            cc.find(`Canvas/background/BottomCity/knight/fightRegion/region${index + 1}`).active = false
                            cc.find(`Canvas/background/BottomCity/knight/anamyRegion/anamy${index+1}`).active = true
                            this.KnightBottom.nearHaveBndit = true
                            this.KnightBottom.targetBandit.push(this.rightCity)
                        }
                    }
                    if(this.bottomKnightArea[i].x == this.rightKnightLocation.x && this.bottomKnightArea[i].y == this.rightKnightLocation.y){
                        cc.find(`Canvas/background/BottomCity/knight/fightRegion/region${index + 1}`).active = false
                        cc.find(`Canvas/background/BottomCity/knight/anamyRegion/anamy${index+1}`).active = true
                        this.KnightBottom.nearHaveBndit = true
                        this.KnightBottom.targetBandit.push(this.rightKnight)
                    }
                    if(this.bottomKnightArea[i].x == this.rightArcherLocation.x && this.bottomKnightArea[i].y == this.rightArcherLocation.y){
                        cc.find(`Canvas/background/BottomCity/knight/fightRegion/region${index + 1}`).active = false
                        cc.find(`Canvas/background/BottomCity/knight/anamyRegion/anamy${index+1}`).active = true
                        this.KnightBottom.nearHaveBndit = true
                        this.KnightBottom.targetBandit.push(this.rightArcher)
                    }
                    if(this.bottomKnightArea[i].x == this.rightTroopLocation.x && this.bottomKnightArea[i].y == this.rightTroopLocation.y){
                        cc.find(`Canvas/background/BottomCity/knight/fightRegion/region${index + 1}`).active = false
                        cc.find(`Canvas/background/BottomCity/knight/anamyRegion/anamy${index+1}`).active = true
                        this.KnightBottom.nearHaveBndit = true
                        this.KnightBottom.targetBandit.push(this.rightTroop)
                    }
        
                }
                break
        }   
    },

    leftCityJudgeOthercity(solidertype){
        switch(solidertype){
            case 'archer':
                for (let i in this.leftArcherArea) {
                    let index = parseInt(i)
                    for (let j in this.leftCityArea) {
                        if (this.leftArcherArea[i].x == this.leftCityArea[j].x && this.leftArcherArea[i].y == this.leftCityArea[j].y) {
                            cc.find(`Canvas/background/LeftCity/archer/fightRegion/region${index + 1}`).active = false
                        }
                    }
                    //judge self solider
                    if (this.leftArcherArea[i].x == this.leftKnightLocation.x && this.leftArcherArea[i].y == this.leftKnightLocation.y) {
                        cc.find(`Canvas/background/LeftCity/archer/fightRegion/region${index + 1}`).active = false
                    }
                    if (this.leftArcherArea[i].x == this.leftTroopLocation.x && this.leftArcherArea[i].y == this.leftTroopLocation.y) {
                        cc.find(`Canvas/background/LeftCity/archer/fightRegion/region${index + 1}`).active = false
                    }

                    //judge bottom city

                    for(let bot in this.bottomCityArea){
                        if(this.leftArcherArea[i].x == this.bottomCityArea[bot].x && this.leftArcherArea[i].y == this.bottomCityArea[bot].y){
                            cc.find(`Canvas/background/LeftCity/archer/fightRegion/region${index + 1}`).active = false
                        }
                    }
                    if(this.leftArcherArea[i].x == this.bottomArcherLocation.x && this.leftArcherArea[i].y == this.bottomArcherLocation.y){
                        cc.find(`Canvas/background/LeftCity/archer/fightRegion/region${index + 1}`).active = false
                    }
                    if(this.leftArcherArea[i].x == this.bottomKnightLocation.x && this.leftArcherArea[i].y == this.bottomKnightLocation.y){
                        cc.find(`Canvas/background/LeftCity/archer/fightRegion/region${index + 1}`).active = false
                    }
                    if(this.leftArcherArea[i].x == this.bottomTroopLocation.x && this.leftArcherArea[i].y == this.bottomTroopLocation.y){
                        cc.find(`Canvas/background/LeftCity/archer/fightRegion/region${index + 1}`).active = false
                    }

                    //judge right city
                    for(let right in this.rightCityArea){
                        if(this.leftArcherArea[i].x == this.rightCityArea[right].x && this.leftArcherArea[i].y == this.rightCityArea[right].y){
                            cc.find(`Canvas/background/LeftCity/archer/fightRegion/region${index + 1}`).active = false
                        }
                    }
                    if(this.leftArcherArea[i].x == this.rightKnightLocation.x && this.leftArcherArea[i].y == this.rightKnightLocation.y){
                        cc.find(`Canvas/background/LeftCity/archer/fightRegion/region${index + 1}`).active = false
                    }
                    if(this.leftArcherArea[i].x == this.rightArcherLocation.x && this.leftArcherArea[i].y == this.rightArcherLocation.y){
                        cc.find(`Canvas/background/LeftCity/archer/fightRegion/region${index + 1}`).active = false
                    }
                    if(this.leftArcherArea[i].x == this.rightTroopLocation.x && this.leftArcherArea[i].y == this.rightTroopLocation.y){
                        cc.find(`Canvas/background/LeftCity/archer/fightRegion/region${index + 1}`).active = false
                    }

                }
                break
            case 'troop':
                for (let i in this.leftTroopArea) {
                    let index = parseInt(i)
                    for (let j in this.leftCityArea) {
                        if (this.leftTroopArea[i].x == this.leftCityArea[j].x && this.leftTroopArea[i].y == this.leftCityArea[j].y) {
                            cc.find(`Canvas/background/LeftCity/troop/fightRegion/region${index + 1}`).active = false
                        }
                    }
                    //judge self solider
                    if (this.leftTroopArea[i].x == this.leftKnightLocation.x && this.leftTroopArea[i].y == this.leftKnightLocation.y) {
                        cc.find(`Canvas/background/LeftCity/troop/fightRegion/region${index + 1}`).active = false
                    }
                    if (this.leftTroopArea[i].x == this.leftArcherLocation.x && this.leftTroopArea[i].y == this.leftArcherLocation.y) {
                        cc.find(`Canvas/background/LeftCity/troop/fightRegion/region${index + 1}`).active = false
                    }

                    //judge bottom city

                    for(let bot in this.bottomCityArea){
                        if(this.leftTroopArea[i].x == this.bottomCityArea[bot].x && this.leftTroopArea[i].y == this.bottomCityArea[bot].y){
                            cc.find(`Canvas/background/LeftCity/troop/fightRegion/region${index + 1}`).active = false
                        }
                    }
                    if(this.leftTroopArea[i].x == this.bottomArcherLocation.x && this.leftTroopArea[i].y == this.bottomArcherLocation.y){
                        cc.find(`Canvas/background/LeftCity/troop/fightRegion/region${index + 1}`).active = false
                    }
                    if(this.leftTroopArea[i].x == this.bottomKnightLocation.x && this.leftTroopArea[i].y == this.bottomKnightLocation.y){
                        cc.find(`Canvas/background/LeftCity/troop/fightRegion/region${index + 1}`).active = false
                    }
                    if(this.leftTroopArea[i].x == this.bottomTroopLocation.x && this.leftTroopArea[i].y == this.bottomTroopLocation.y){
                        cc.find(`Canvas/background/LeftCity/troop/fightRegion/region${index + 1}`).active = false
                    }
                    
                    //judge right city
                    for(let right in this.rightCityArea){
                        if(this.leftTroopArea[i].x == this.rightCityArea[right].x && this.leftTroopArea[i].y == this.rightCityArea[right].y){
                            cc.find(`Canvas/background/LeftCity/troop/fightRegion/region${index + 1}`).active = false
                        }
                    }
                    if(this.leftTroopArea[i].x == this.rightKnightLocation.x && this.leftTroopArea[i].y == this.rightKnightLocation.y){
                        cc.find(`Canvas/background/LeftCity/troop/fightRegion/region${index + 1}`).active = false
                    }
                    if(this.leftTroopArea[i].x == this.rightArcherLocation.x && this.leftTroopArea[i].y == this.rightArcherLocation.y){
                        cc.find(`Canvas/background/LeftCity/troop/fightRegion/region${index + 1}`).active = false
                    }
                    if(this.leftTroopArea[i].x == this.rightTroopLocation.x && this.leftTroopArea[i].y == this.rightTroopLocation.y){
                        cc.find(`Canvas/background/LeftCity/troop/fightRegion/region${index + 1}`).active = false
                    }

                }
                break
            case 'knight':
                    for (let i in this.leftKnightArea) {
                        let index = parseInt(i)
                        for (let j in this.leftCityArea) {
                            if (this.leftKnightArea[i].x == this.leftCityArea[j].x && this.leftKnightArea[i].y == this.leftCityArea[j].y) {
                                cc.find(`Canvas/background/LeftCity/knight/fightRegion/region${index + 1}`).active = false
                            }
                        }
                        //judge self solider
                        if (this.leftKnightArea[i].x == this.leftArcherLocation.x && this.leftKnightArea[i].y == this.leftArcherLocation.y) {
                            cc.find(`Canvas/background/LeftCity/knight/fightRegion/region${index + 1}`).active = false
                        }
                        if (this.leftKnightArea[i].x == this.leftTroopLocation.x && this.leftKnightArea[i].y == this.leftTroopLocation.y) {
                            cc.find(`Canvas/background/LeftCity/knight/fightRegion/region${index + 1}`).active = false
                        }
    
                        //judge bottom city
    
                        for(let bot in this.bottomCityArea){
                            if(this.leftKnightArea[i].x == this.bottomCityArea[bot].x && this.leftKnightArea[i].y == this.bottomCityArea[bot].y){
                                cc.find(`Canvas/background/LeftCity/knight/fightRegion/region${index + 1}`).active = false
                            }
                        }
                        if(this.leftKnightArea[i].x == this.bottomArcherLocation.x && this.leftKnightArea[i].y == this.bottomArcherLocation.y){
                            cc.find(`Canvas/background/LeftCity/knight/fightRegion/region${index + 1}`).active = false
                        }
                        if(this.leftKnightArea[i].x == this.bottomKnightLocation.x && this.leftKnightArea[i].y == this.bottomKnightLocation.y){
                            cc.find(`Canvas/background/LeftCity/knight/fightRegion/region${index + 1}`).active = false
                        }
                        if(this.leftKnightArea[i].x == this.bottomTroopLocation.x && this.leftKnightArea[i].y == this.bottomTroopLocation.y){
                            cc.find(`Canvas/background/LeftCity/knight/fightRegion/region${index + 1}`).active = false
                        }
                        
                        //judge right city
                        for(let right in this.rightCityArea){
                            if(this.leftKnightArea[i].x == this.rightCityArea[right].x && this.leftKnightArea[i].y == this.rightCityArea[right].y){
                                cc.find(`Canvas/background/LeftCity/knight/fightRegion/region${index + 1}`).active = false
                            }
                        }
                        if(this.leftKnightArea[i].x == this.rightKnightLocation.x && this.leftKnightArea[i].y == this.rightKnightLocation.y){
                            cc.find(`Canvas/background/LeftCity/knight/fightRegion/region${index + 1}`).active = false
                        }
                        if(this.leftKnightArea[i].x == this.rightArcherLocation.x && this.leftKnightArea[i].y == this.rightArcherLocation.y){
                            cc.find(`Canvas/background/LeftCity/knight/fightRegion/region${index + 1}`).active = false
                        }
                        if(this.leftKnightArea[i].x == this.rightTroopLocation.x && this.leftKnightArea[i].y == this.rightTroopLocation.y){
                            cc.find(`Canvas/background/LeftCity/knight/fightRegion/region${index + 1}`).active = false
                        }
    
                    }
                break
        
        }
    },

    rightCityJudgeOthercity(solidertype){
        switch(solidertype){
            case 'archer':
                for (let i in this.rightArcherArea) {
                    let index = parseInt(i)
                    for (let j in this.rightCityArea) {
                        if (this.rightArcherArea[i].x == this.rightCityArea[j].x && this.rightArcherArea[i].y == this.rightCityArea[j].y) {
                            cc.find(`Canvas/background/RightCity/archer/fightRegion/region${index + 1}`).active = false
                        }
                    }
                    //judge self solider
                    if (this.rightArcherArea[i].x == this.rightKnightLocation.x && this.rightArcherArea[i].y == this.rightKnightLocation.y) {
                        cc.find(`Canvas/background/RightCity/archer/fightRegion/region${index + 1}`).active = false
                    }
                    if (this.rightArcherArea[i].x == this.rightTroopLocation.x && this.rightArcherArea[i].y == this.rightTroopLocation.y) {
                        cc.find(`Canvas/background/RightCity/archer/fightRegion/region${index + 1}`).active = false
                    }

                    //bottom city
                    for(let bot in this.bottomCityArea){
                        if(this.rightArcherArea[i].x == this.bottomCityArea[bot].x && this.rightArcherArea[i].y == this.bottomCityArea[bot].y){
                            cc.find(`Canvas/background/RightCity/archer/fightRegion/region${index + 1}`).active = false
                        }
                    }
                    if(this.rightArcherArea[i].x == this.bottomArcherLocation.x && this.rightArcherArea[i].y == this.bottomArcherLocation.y){
                        cc.find(`Canvas/background/RightCity/archer/fightRegion/region${index + 1}`).active = false
                    }
                    if(this.rightArcherArea[i].x == this.bottomKnightLocation.x && this.rightArcherArea[i].y == this.bottomKnightLocation.y){
                        cc.find(`Canvas/background/RightCity/archer/fightRegion/region${index + 1}`).active = false
                    }
                    if(this.rightArcherArea[i].x == this.bottomTroopLocation.x && this.rightArcherArea[i].y == this.bottomTroopLocation.y){
                        cc.find(`Canvas/background/RightCity/archer/fightRegion/region${index + 1}`).active = false
                    }

                    //left city
                    for(let left in this.leftCityArea){
                        if(this.bottomKnightArea[i].x == this.leftCityArea[left].x && this.bottomKnightArea[i].y == this.leftCityArea[left].y){
                            cc.find(`Canvas/background/RightCity/archer/fightRegion/region${index + 1}`).active = false
                        }
                    }
                    if(this.bottomKnightArea[i].x == this.leftKnightLocation.x && this.bottomKnightArea[i].y == this.leftKnightLocation.y){
                        cc.find(`Canvas/background/RightCity/archer/fightRegion/region${index + 1}`).active = false
                    }
                    if(this.bottomKnightArea[i].x == this.leftArcherLocation.x && this.bottomKnightArea[i].y == this.leftArcherLocation.y){
                        cc.find(`Canvas/background/RightCity/archer/fightRegion/region${index + 1}`).active = false
                    }
                    if(this.bottomKnightArea[i].x == this.leftTroopLocation.x  && this.bottomKnightArea[i].y == this.leftTroopLocation.y){
                        cc.find(`Canvas/background/RightCity/archer/fightRegion/region${index + 1}`).active = false
                    }

                }
                break
            case 'knight':
                for (let i in this.rightKnightArea) {
                    let index = parseInt(i)
                    for (let j in this.rightCityArea) {
                        if (this.rightKnightArea[i].x == this.rightCityArea[j].x && this.rightKnightArea[i].y == this.rightCityArea[j].y) {
                            cc.find(`Canvas/background/RightCity/knight/fightRegion/region${index + 1}`).active = false
                        }
                    }
                    //judge self solider
                    if (this.rightKnightArea[i].x == this.rightArcherLocation.x && this.rightKnightArea[i].y == this.rightArcherLocation.y) {
                        cc.find(`Canvas/background/RightCity/knight/fightRegion/region${index + 1}`).active = false
                    }
                    if (this.rightKnightArea[i].x == this.rightTroopLocation.x && this.rightKnightArea[i].y == this.rightTroopLocation.y) {
                        cc.find(`Canvas/background/RightCity/knight/fightRegion/region${index + 1}`).active = false
                    }

                    //bottom city
                    for(let bot in this.bottomCityArea){
                        if(this.rightKnightArea[i].x == this.bottomCityArea[bot].x && this.rightKnightArea[i].y == this.bottomCityArea[bot].y){
                            cc.find(`Canvas/background/RightCity/knight/fightRegion/region${index + 1}`).active = false
                        }
                    }
                    if(this.rightKnightArea[i].x == this.bottomArcherLocation.x && this.rightKnightArea[i].y == this.bottomArcherLocation.y){
                        cc.find(`Canvas/background/RightCity/knight/fightRegion/region${index + 1}`).active = false
                    }
                    if(this.rightKnightArea[i].x == this.bottomKnightLocation.x && this.rightKnightArea[i].y == this.bottomKnightLocation.y){
                        cc.find(`Canvas/background/RightCity/knight/fightRegion/region${index + 1}`).active = false
                    }
                    if(this.rightKnightArea[i].x == this.bottomTroopLocation.x && this.rightKnightArea[i].y == this.bottomTroopLocation.y){
                        cc.find(`Canvas/background/RightCity/knight/fightRegion/region${index + 1}`).active = false
                    }

                    //left city
                    for(let left in this.leftCityArea){
                        if(this.rightKnightArea[i].x == this.leftCityArea[left].x && this.rightKnightArea[i].y == this.leftCityArea[left].y){
                            cc.find(`Canvas/background/RightCity/knight/fightRegion/region${index + 1}`).active = false
                        }
                    }
                    if(this.rightKnightArea[i].x == this.leftKnightLocation.x && this.rightKnightArea[i].y == this.leftKnightLocation.y){
                        cc.find(`Canvas/background/RightCity/knight/fightRegion/region${index + 1}`).active = false
                    }
                    if(this.rightKnightArea[i].x == this.leftArcherLocation.x && this.rightKnightArea[i].y == this.leftArcherLocation.y){
                        cc.find(`Canvas/background/RightCity/knight/fightRegion/region${index + 1}`).active = false
                    }
                    if(this.rightKnightArea[i].x == this.leftTroopLocation.x  && this.rightKnightArea[i].y == this.leftTroopLocation.y){
                        cc.find(`Canvas/background/RightCity/knight/fightRegion/region${index + 1}`).active = false
                    }

                }
                break
            case 'troop':
                for (let i in this.rightTroopArea) {
                    let index = parseInt(i)
                    for (let j in this.rightCityArea) {
                        if (this.rightTroopArea[i].x == this.rightCityArea[j].x && this.rightTroopArea[i].y == this.rightCityArea[j].y) {
                            cc.find(`Canvas/background/RightCity/troop/fightRegion/region${index + 1}`).active = false
                        }
                    }
                    //judge self solider
                    if (this.rightTroopArea[i].x == this.rightArcherLocation.x && this.rightTroopArea[i].y == this.rightArcherLocation.y) {
                        cc.find(`Canvas/background/RightCity/troop/fightRegion/region${index + 1}`).active = false
                    }
                    if (this.rightTroopArea[i].x == this.rightKnightLocation.x && this.rightTroopArea[i].y == this.rightKnightLocation.y) {
                        cc.find(`Canvas/background/RightCity/troop/fightRegion/region${index + 1}`).active = false
                    }

                    //bottom city
                    for(let bot in this.bottomCityArea){
                        if(this.rightTroopArea[i].x == this.bottomCityArea[bot].x && this.rightTroopArea[i].y == this.bottomCityArea[bot].y){
                            cc.find(`Canvas/background/RightCity/troop/fightRegion/region${index + 1}`).active = false
                        }
                    }
                    if(this.rightTroopArea[i].x == this.bottomArcherLocation.x && this.rightTroopArea[i].y == this.bottomArcherLocation.y){
                        cc.find(`Canvas/background/RightCity/troop/fightRegion/region${index + 1}`).active = false
                    }
                    if(this.rightTroopArea[i].x == this.bottomKnightLocation.x && this.rightTroopArea[i].y == this.bottomKnightLocation.y){
                        cc.find(`Canvas/background/RightCity/troop/fightRegion/region${index + 1}`).active = false
                    }
                    if(this.rightTroopArea[i].x == this.bottomTroopLocation.x && this.rightTroopArea[i].y == this.bottomTroopLocation.y){
                        cc.find(`Canvas/background/RightCity/troop/fightRegion/region${index + 1}`).active = false
                    }

                    //left city
                    for(let left in this.leftCityArea){
                        if(this.rightTroopArea[i].x == this.leftCityArea[left].x && this.rightTroopArea[i].y == this.leftCityArea[left].y){
                            cc.find(`Canvas/background/RightCity/troop/fightRegion/region${index + 1}`).active = false
                        }
                    }
                    if(this.rightTroopArea[i].x == this.leftKnightLocation.x && this.rightTroopArea[i].y == this.leftKnightLocation.y){
                        cc.find(`Canvas/background/RightCity/troop/fightRegion/region${index + 1}`).active = false
                    }
                    if(this.rightTroopArea[i].x == this.leftArcherLocation.x && this.rightTroopArea[i].y == this.leftArcherLocation.y){
                        cc.find(`Canvas/background/RightCity/troop/fightRegion/region${index + 1}`).active = false
                    }
                    if(this.rightTroopArea[i].x == this.leftTroopLocation.x  && this.rightTroopArea[i].y == this.leftTroopLocation.y){
                        cc.find(`Canvas/background/RightCity/troop/fightRegion/region${index + 1}`).active = false
                    }

                }
                break
        }
    },
    

    start () {

    },

    // update (dt) {},
});
