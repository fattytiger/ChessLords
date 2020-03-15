const EventType = require("EventType")
cc.Class({
    extends: cc.Component,

    properties: {
        HPPro:{
            default:null,
            type:cc.ProgressBar
        },
        animDuration:{
            default:0.5,
            type:cc.Float
        }
    },
    onLoad:function(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.mouseClick, this)
    },

    mouseClick: function () {
        if (this.continueTime === -1) {
            this.continueTime = new Date().getTime()
            this.clickMouse()
            return
        }
        let now = new Date().getTime()
        if (now - this.continueTime < this.safeTime) {
            return
        } else {
            this.continueTime = now
            this.clickMouse()
        }
    },

    clickMouse: function () {
        console.log('fight base')
        let selfHeroID = cc.zz.LoginData.getHeroID()
        if(this.hero_id === selfHeroID){
            console.warn('you can not fight yourslef')
            return
        }
        cc.zz.fire.fire(EventType.REQUEST_FIGHT_BASE,this.id)
    },


    onClickBase:function(){
        console.log('fight base')
        let selfHeroID = cc.zz.LoginData.getHeroID()
        if(this.hero_id === selfHeroID){
            console.warn('you can not fight yourslef')
            return
        }
        cc.zz.fire.fire(EventType.REQUEST_FIGHT_BASE,this.id)
    },

    initConfig:function(){
        this.blocksManager = cc.Canvas.instance.node.getComponent('blocks-manager')
    },

    init:function(base){
        this.initConfig()

        this.id = base._id
        this.tile_id = base.tile_id
        this.base_hp = base.base_hp
        this.hero_id = base.hero_id

        this.maxHP = 200
        this.fightProtect = false

        this.setBaseLocation()
        this.setBaseHP(this.base_hp)
    },

    setBaseLocation:function(){
        let position =  this.blocksManager.getBlockPositionByID(this.tile_id)
        this.node.x = position.x + 100
        this.node.y = position.y + 150
    },


    setBaseHP:function(hp){
        if(this.base_hp <= 0){
            
        }
        this.base_hp = parseInt(hp)
        this.HPPro.progress = this.base_hp / this.maxHP
    },

    getBaseHP:function(){
        return this.base_hp
    },

    getTileID:function(){
        return this.tile_id
    },

    setFightProtect:function(){
        this.fightProtect = !this.fightProtect
    },

    getFightProtect:function(){
        return this.fightProtect
    },




    defendAnimation:function(dirc,hp){
        //set move distance of defend
        let moveDistance = 10
        //set the fightProtect as true
        this.setFightProtect()
        let moveAnim = cc.sequence(
            cc.moveBy(this.animDuration, cc.v2(-moveDistance, 0)),
            cc.moveBy(this.animDuration, cc.v2(moveDistance, 0)),
            cc.moveBy(this.animDuration, cc.v2(moveDistance, 0)),
            cc.moveBy(this.animDuration, cc.v2(-moveDistance, 0)))
        let colorAnim = cc.sequence(
            cc.tintBy(this.animDuration, 255, 125, 125),
            cc.tintBy(this.animDuration, 255, 0, 0),
            cc.tintBy(this.animDuration, 255, 125, 125),
            cc.tintBy(this.animDuration, 255, 255, 255), cc.callFunc(function () {
                //set the fightProtect as false
                this.setFightProtect()
                //change the hp
                this.setBaseHP(hp)
            }, this))
        this.node.runAction(cc.spawn(moveAnim, colorAnim))
    },
    
});
