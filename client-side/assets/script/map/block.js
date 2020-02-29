
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
        /**
         * !#en 
         * self high light sprite
         * @property selfHighLight
         * @type cc.SpriteFrame
         */
        selfHighLight:{
            default:[],
            type:cc.Sprite
        },

        rangeHighlight:{
            default:[],
            type:cc.Sprite
        },
        

        /**
         * !#en 
         * other high light sprite
         * @property otherHighLight
         * @type cc.SpriteFrame
         */
        otherHighLight:{
            default:[],
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
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.mouseClick, this)
    },


    ///////////////////////////////////////////////////////////////////////////////
    // Private Methods
    ///////////////////////////////////////////////////////////////////////////////

    mouseClick(event) {
        if (event.getButton() == cc.Event.EventMouse.BUTTON_LEFT) {
            this.mouseLeftClick()
        }

        if (event.getButton() == cc.Event.EventMouse.BUTTON_RIGHT) {
            this.mouseRightClick()
        }
    },
    mouseLeftClick() {
        //get the can move information 
        let moving = parseInt(this.move)

        if(moving == 0){
            return 
        }
        // cc.zz.fire.fire(EventType.SEND_HERO_MOVE,this.id)
    },
    mouseRightClick() {
        cc.log(this.id,this.move)
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

        this.canMove = false
        this.buildingAround = false
        this.conqueredWallet = null
        this._standHero =false
        this.rangeFlag = false
        
        this.initBlockSprite()
        
    },

    initBlockSprite:function(){
        let atalasPath = `atalasElements/map`
        cc.zz.fire.fire(EventType.LOAD_ATLAS_RESOURCE,atalasPath,this.blockPic,(function(sprite){
            this.masterBlock.spriteFrame = sprite
        }).bind(this))
    },



});

