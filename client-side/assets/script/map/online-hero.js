const EventType = require('EventType')
cc.Class({
    extends: cc.Component,

    properties: {
        heroSprite:{
            default:null,
            type:cc.Sprite
        },
        troopHPPro:{
            default:null,
            type:cc.ProgressBar
        },
        troopStamina:{
            default:null,
            type:cc.ProgressBar
        },
        chooseFlag:{
            default:null,
            type:cc.Node
        }
    },
    ///////////////////////////////////////////////////////////////////////////////
    // Life cycle Methods
    ///////////////////////////////////////////////////////////////////////////////
    onLoad:function(){
        this.continueTime  = -1
        this.continueClick = false
        this.safeTime = 1000

        this.node.on(cc.Node.EventType.MOUSE_DOWN,this.mouseClick,this)
    },

    ///////////////////////////////////////////////////////////////////////////////
    // Click method
    ///////////////////////////////////////////////////////////////////////////////
    mouseClick:function(){
        if(this.continueTime === -1){
            this.continueTime = new Date().getTime()
            this.clickMouse()
            return
        }
        let now = new Date().getTime()
        if(now - this.continueTime < this.safeTime){
            return
        }else{
            this.continueTime = now
            this.clickMouse()
        }  
    },
    clickMouse:function(){
        let selfHeroID = cc.zz.LoginData.getHeroID()
        console.log('click troop')
        if(selfHeroID !==  this.heroID){
            return
        }
        if(selfHeroID === this.heroID){
            cc.zz.fire.fire(EventType.CHOOSE_TROOP_FLAG,this.troopID)
        }
    },
    ///////////////////////////////////////////////////////////////////////////////
    // Private Method
    ///////////////////////////////////////////////////////////////////////////////
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
        let selfHeroID = cc.zz.LoginData.getHeroID()
        this.troopMaster = troop_master
        if(this.troopMaster === true && selfHeroID === this.heroID){
            cc.zz.fire.fire(EventType.CHOOSE_TROOP_FLAG,this.troopID)
        }
    },
    setHeroLocation:function(){
        let pos = this.blocksManager.getBlockPositionByID(this.tile_from)
        this.node.x = pos.x + 100
        this.node.y = pos.y + 150
    },

    getTroopTileTO:function(){
        return this.tile_to
    },
    onChooseFlag:function(){
        this.master_troop = true
        this.chooseFlag.active = true
    },
    cancleChooseFlag:function(){
        this.master_troop = false
        this.chooseFlag.active = false
    },
    ///////////////////////////////////////////////////////////////////////////////
    // Movement
    ///////////////////////////////////////////////////////////////////////////////
    
});
