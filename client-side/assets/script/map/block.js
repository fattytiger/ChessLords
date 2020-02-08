
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
        let moving = parseInt(this.move)
        if(moving == 0){
            return 
        }
        // cc.zz.fire.fire(EventType.SEND_HERO_MOVE,this.id)
    },
    mouseRightClick() {
        cc.log(this.id,this.move)
        // cc.zz.net.send(6015, [this.id, 1])
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
    
    moveHighLight() {
        this.rangeFlag = true
        this.canMove   = true
        if(this.move === "0"){
            return
        }

        
        //hilight the movement block
        cc.zz.fire.fire(EventType.CHANGE_BLOCK_LIGHT, this.blockPic, this.movementBlock)

        //flag the edge of the block
        cc.zz.fire.fire(EventType.SHOW_MOVE_BLOCK_HIGHLIGHT,this.id)

        //set the node as active
        this.movementBlock.node.active = true

        //show the movement block animation
        this.movementBlock.node.runAction(cc.fadeIn(1))
        
    },

    leaveHighLight() {
        this.rangeFlag = false
        this.canMove   = false

        if(this.move === "0"){
            return
        }

        //reback the movement block
        cc.zz.fire.fire(EventType.CHANGE_BLOCK_SPRITE, this.blockPic, this.movementBlock)

        //reback the edge of the block
        cc.zz.fire.fire(EventType.HIDE_MOVE_BLOCK_HIGHLIGHT,this.id)

        //hide the movement block animation
        this.movementBlock.node.runAction(cc.fadeOut(1))
        
    },

    getRangeFlag:function(){
        return this.rangeFlag
    },

    setMoveDirectionLight:function(direction){
        if(direction === "UP"){
            this.rangeHighlight[this.HIGHLIGHT_DIRECTION.UP].node.active = true
        }

        if(direction === "DOWN"){
            this.rangeHighlight[this.HIGHLIGHT_DIRECTION.DOWN].node.active = true
        }

        if(direction === "RIGHT"){
            this.rangeHighlight[this.HIGHLIGHT_DIRECTION.RIGHT].node.active = true
        }

        if(direction === "LEFT"){
            this.rangeHighlight[this.HIGHLIGHT_DIRECTION.LEFT].node.active = true
        }
    },




    setDirectionHighlight:function(wallet_address,direction){
        let selfWallet = cc.zz.LoginData.getWallet()

        //set self direction highlight
        if(wallet_address === selfWallet){

            if(direction === "UP"){
                this.selfHighLight[this.HIGHLIGHT_DIRECTION.UP].node.active = true
            }

            if(direction === "DOWN"){
                this.selfHighLight[this.HIGHLIGHT_DIRECTION.DOWN].node.active = true
            }

            if(direction === "RIGHT"){
                this.selfHighLight[this.HIGHLIGHT_DIRECTION.RIGHT].node.active = true
            }

            if(direction === "LEFT"){
                this.selfHighLight[this.HIGHLIGHT_DIRECTION.LEFT].node.active = true
            }
        }

        if(wallet_address !== selfWallet){
            if(direction === "UP"){
                this.otherHighLight[this.HIGHLIGHT_DIRECTION.UP].node.active = true
            }

            if(direction === "DOWN"){
                this.otherHighLight[this.HIGHLIGHT_DIRECTION.DOWN].node.active = true
            }

            if(direction === "RIGHT"){
                this.otherHighLight[this.HIGHLIGHT_DIRECTION.RIGHT].node.active = true
            }

            if(direction === "LEFT"){
                this.otherHighLight[this.HIGHLIGHT_DIRECTION.LEFT].node.active = true
            }
        }
    },

    conqueredHighLight: function (wallet_address) {

        let walletAddress = wallet_address
        let selfWallet = cc.zz.LoginData.getWallet()

        

        if (walletAddress == null) {
            console.warn(`please give the wallet parameter`);
            return 
        }

        //flag the owner of this block
        this.conqueredWallet = walletAddress

        //set as your occupied block
        if (walletAddress === selfWallet) {
            cc.zz.fire.fire(EventType.CHANGE_BLOCK_LIGHT, this.blockPic, this.masterBlock)
        }
        //set as other occupied block
        if (walletAddress !== selfWallet) {
            cc.zz.fire.fire(EventType.CHANGE_BLOCK_LIGHT, this.blockPic, this.masterBlock)
        }

        //set build block highlight
        cc.zz.fire.fire(EventType.SHOW_BUILD_BLOCK_HIGHLIGHT,walletAddress,this.id)
    },

    

    getConquerInfo:function(){
        return this.conqueredWallet
    },

    onHighlightSelfHeroBlock:function(){
        for (let index = 0; index < this.selfHighLight.length; index++) {
            this.selfHighLight[index].node.active =  true
        }
    },
    unHighlightSelfHeroBlock:function(){
        for (let index = 0; index < this.selfHighLight.length; index++) {
            this.selfHighLight[index].node.active =  false
        }
    },
    onHighlightOtherHeroBlock:function(){
        for (let index = 0; index < this.otherHighLight.length; index++) {
            this.otherHighLight[index].node.active = true
        }
    },

    unHighlightOtherHeroBlock:function(){
        for (let index = 0; index < this.otherHighLight.length; index++) {
            this.otherHighLight[index].node.active = false
        }
    },
    onHighLightMoveBlock:function(){
        for (let index = 0; index < this.rangeHighlight.length; index++) {
            this.rangeHighlight[index].node.active = true
        }
    },
    unHighLightMoveBlock:function(){
        for (let index = 0; index < this.rangeHighlight.length; index++) {
            this.rangeHighlight[index].node.active = false
        }
    },

    reverseBuildingArround:function(){
        this.buildingAround = false
    },
    setBuildingArround:function(){
        this.buildingAround = true
    },
    getBuildingArround:function(){
        return this.buildingAround
    },

    setStandHero:function(){
        this._standHero = !this._standHero
    },
    getStandHero:function(){
        return this._standHero
    },


});

