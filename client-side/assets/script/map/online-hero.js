const EventType = require('EventType')
cc.Class({
    extends: cc.Component,

    properties: {
        heroSprite:{
            default:null,
            type:cc.Sprite
        }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.heroSprite.node.on(cc.Node.EventType.MOUSE_DOWN, this.mouseClick, this)
    },

    start () {

    },

    mouseClick(event) {
        if (event.getButton() == cc.Event.EventMouse.BUTTON_LEFT) {
            this.mouseLeftClick()
        }

        if (event.getButton() == cc.Event.EventMouse.BUTTON_RIGHT) {
            this.mouseRightClick()
        }
    },

    mouseLeftClick:function(){
        console.log('left click')
    },
    mouseRightClick:function(){
        console.log('right click');
    },

    // update (dt) {},
    initConfig:function(){        
        this.blocksManager = cc.Canvas.instance.node.getComponent('blocks-manager')
    },
    initOriginData:function(troop){
        this.initConfig()
        this.heroID  = troop.hero_id
        this.troopID = troop._id
        this.tile_from = parseInt(troop.tile_from)
        this.tile_to   = parseInt(troop.tile_to)

        this.setHeroLocation()
        this.setTroopType(troop.troop_type)
        this.setTroopHP(troop.troop_hp)
        this.setTroopMaster(troop.master_troop)
    },
    setTroopType:function(troop_type){
        this.troopType = parseInt(troop_type)
        let color = null
        let selfHeroID = cc.zz.LoginData.getHeroID()
        if(this.heroID === selfHeroID){
            color = "e"
        }
        if(this.heroID !== selfHeroID){
            color = "c"
        }
        let path = "atalasElements/unit"
        let url  = `unit_${color}0${this.troopType}`
        cc.zz.fire.fire(EventType.LOAD_ATLAS_RESOURCE,path,url,(function(sprite){
            this.heroSprite.spriteFrame = sprite
        }).bind(this))
    },
    setTroopHP:function(troop_hp){
        this.troopHP = parseInt(troop_hp)
    },
    setTroopMaster:function(troop_master){
        this.troopMaster = troop_master
    },
    setHeroLocation:function(){
        let pos = this.blocksManager.getBlockPositionByID(this.tile_from)
        this.node.x = pos.x
        this.node.y = pos.y
    }
});
