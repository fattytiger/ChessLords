
/****************************************************************************
 Copyright (c) 2019.    Arctic Seascape
 Author                 Tiger Yang (front-end@blocklords.io)

 https://www.blocklords.io/

block is a block information bind with block prefab 

 ****************************************************************************/
const EventType = require("EventType");
cc.Class({
    extends: cc.Component,

    properties: {
        /**
         * !#en 
         * the master sprite
         * @property masterBlock
         * @type cc.SpriteFrame
         */
        masterBlock: {
            default: null,
            type: cc.Sprite
        },

        movementBlock:{
            default:null,
            type:cc.Sprite
        },
        attackmentBlock:{
            default:null,
            type:cc.Sprite
        },

        animDuration: {
            default: 0.5,
            type: cc.Float
        }
    },
    ///////////////////////////////////////////////////////////////////////////////
    // LIFE-CYCLE CALLBACKS
    ///////////////////////////////////////////////////////////////////////////////
    ctor(){
        this.HIGHLIGHT_DIRECTION = {
            "UP":0,
            "DOWN":1,
            "RIGHT":2,
            "LEFT":3
        }
    },

    onLoad() {
        this.continueTime  = -1
        this.continueClick = false
        this.safeTime = 1000
        this.node.on(cc.Node.EventType.MOUSE_DOWN,this.mouseClick,this)
    },


    ///////////////////////////////////////////////////////////////////////////////
    // Private Methods
    ///////////////////////////////////////////////////////////////////////////////
    mouseClick(event) {
        console.log(this.id)
        if(this.continueTime === -1){
            this.continueTime = new Date().getTime()
            if(event.getButton() == cc.Event.EventMouse.BUTTON_LEFT){
                this.leftMouseClick()
            }
            if(event.getButton() == cc.Event.EventMouse.BUTTON_RIGHT){
                this.rightMouseClick()
            }
            return
        }
        let now = new Date().getTime()
        if(now - this.continueTime < this.safeTime){
            return
        }else{
            this.continueTime = now
            if(event.getButton() == cc.Event.EventMouse.BUTTON_LEFT){
                this.leftMouseClick()
            }
            if(event.getButton() == cc.Event.EventMouse.BUTTON_RIGHT){
                this.rightMouseClick()
            }
        }  
    },
    leftMouseClick:function(){
        console.log(this.move)
        if(this.move === 0){
            return
        }
        if(this.move === 1){
            cc.zz.fire.fire(EventType.REQUEST_TROOP_MOVE,this.id)
        }
    },
    rightMouseClick:function(){
        console.log(this.move)
    },

    getCanmove(){
        return this.canmove
    },

    initOriginData(table_info) {

        if (table_info == null) {
            console.warn(`the table info is invalid`);
            return
        }
        //init origin data
        this.id = table_info.id
        this.node.name = `block${table_info.id}`
        this.level = table_info.level
        this.type = table_info.type
        this.produce = table_info.produce
        this.move = table_info.move
        this.blockPic = table_info.block_pic

        this.canmove = false
        this.attackarea = false

        this.initBlockSprite()  
    },

    initBlockSprite:function(){
        let atalasPath = `atalasElements/map`
        let lightUrl = `${this.blockPic}h`
        let attackLightUrl = `${this.blockPic}blue`
        cc.zz.fire.fire(EventType.LOAD_ATLAS_RESOURCE,atalasPath,this.blockPic,(function(sprite){
            this.masterBlock.spriteFrame = sprite
        }).bind(this))
        cc.zz.fire.fire(EventType.LOAD_ATLAS_RESOURCE,atalasPath,lightUrl,(function(sprite){
            this.movementBlock.spriteFrame = sprite
        }).bind(this))
        cc.zz.fire.fire(Event.LOAD_ATLAS_RESOURCE,atalasPath,attackLightUrl,(function(sprite){
            this.attackmentBlock.spriteFrame = sprite
        }).bind(this))
    },


    ///////////////////////////////////////////////////////////////////////////////
    // Public Methods
    ///////////////////////////////////////////////////////////////////////////////

    moveHighLight:function(){
        this.canmove = true
        this.movementBlock.node.runAction(cc.fadeIn(this.animDuration))
    },
    leaveHighLight:function(){
        this.canmove = false
        this.movementBlock.node.runAction(cc.fadeOut(this.animDuration))
    },

    attackHighlight:function(){
        this.attackarea = true
        this.attackmentBlock.node.runAction(cc.fadeIn(this.animDuration))
    },
    unattackHighlight:function(){
        this.attackarea = false
        this.attackmentBlock.node.runAction(cc.fadeOut(this.animDuration))
    }


});

