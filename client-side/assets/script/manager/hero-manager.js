/****************************************************************************
 Copyright (c) 2019.    Arctic Seascape
 Author                 Medet Ahmetson (admin@blocklords.io)

 https://www.blocklords.io/

 Manages heroes on the map

 ****************************************************************************/

const EventType = require("EventType");


cc.Class({
    extends: cc.Component,

    properties: () => ({
    
        onlineHero: {
            default: null,
            type: cc.Prefab
        },

        mainCamera:{
            default:null,
            type:cc.Camera
        },
        map: {
            default: null,
            type: cc.Node
        },
    }),

    ///////////////////////////////////////////////////////////////////////////////
    // LIFE-CYCLE CALLBACKS
    ///////////////////////////////////////////////////////////////////////////////

    ctor: function() {
        this.LIGHT_ACTION = {
            HIGH_LIGHT:"HIGH_LIGHT",
            UNHIGH_LIGHT:"UNHIGH_LIGHT"
        }
    },
    start: function() { 
        this.blocksManager  = this.node.getComponent('blocks-manager')
        this.staminaManager = this.node.getComponent('stamina-manager')
        this.onlineTroops = [];
        this.troopMappings = {};
        this.masterTrooID = null
    },

    onEnable: function() {
        cc.zz.net.addHandler(cc.zz.net.constants.MAP_DATA, this.onMapData.bind(this),true);
        cc.zz.net.addHandler(cc.zz.net.constants.RECEIVE_TROOP_MOVE,this.receiveTroopMove.bind(this),true)
        cc.zz.net.addHandler(cc.zz.net.constants.CLOSE_CONNECTION,this.closeConnection.bind(this),true)

        cc.zz.fire.on(EventType.CHOOSE_TROOP_FLAG,this.chooseTroopFlag.bind(this))
        cc.zz.fire.on(EventType.REQUEST_TROOP_MOVE,this.requestTroopMove.bind(this))
        cc.zz.fire.on(EventType.SHOW_ATTACK_AREA,this.showAttackArea.bind(this))
        cc.zz.fire.on(EventType.HIDE_ATTACK_AREA,this.hideAttackArea.bind(this))
        cc.zz.fire.on(EventType.RENDER_CONNECTION_HERO,this.renderConnectionHero.bind(this))
    },

    onDisable: function() {
        cc.zz.net.removeHandler(cc.zz.net.constants.MAP_DATA, this.onMapData.bind(this),true)
        cc.zz.net.removeHandler(cc.zz.net.constants.RECEIVE_TROOP_MOVE,this.receiveTroopMove.bind(this),true)
        cc.zz.net.removeHandler(cc.zz.net.constants.CLOSE_CONNECTION,this.closeConnection.bind(this),true)

        cc.zz.fire.un(EventType.CHOOSE_TROOP_FLAG,this.chooseTroopFlag.bind(this))
        cc.zz.fire.un(EventType.REQUEST_TROOP_MOVE,this.requestTroopMove.bind(this))
        cc.zz.fire.un(EventType.SHOW_ATTACK_AREA,this.showAttackArea.bind(this))
        cc.zz.fire.un(EventType.HIDE_ATTACK_AREA,this.hideAttackArea.bind(this))
        cc.zz.fire.un(EventType.RENDER_CONNECTION_HERO,this.renderConnectionHero.bind(this))
    },

    ///////////////////////////////////////////////////////////////////////////////
    // COMMON FUNCTIONS
    ///////////////////////////////////////////////////////////////////////////////

    showAttackArea:function(){
        let troop = this.getTroopScriptByTroopID(this.masterTrooID)
        troop.showAttackArea(this.LIGHT_ACTION.HIGH_LIGHT)
    },
    hideAttackArea:function(){
        let troop = this.getTroopScriptByTroopID(this.masterTrooID)
        troop.showAttackArea(THIS.LIGHT_ACTION.UNHIGH_LIGHT)
    },
    requestTroopMove:function(block_id){
        let troop = this.getTroopScriptByTroopID(this.masterTrooID)

        let tileFrom = troop.getTroopTileTO()
        let tileTo = parseInt(block_id)
        if(tileFrom === tileTo){
            return 
        }

        let moveProtect = troop.getTroopMoveProtect()
        if(moveProtect === true){
            return
        }

        let fightProtect = troop.getFightProtect()
        if(fightProtect === true){
            return
        }

        let block = this.blocksManager.getBlockScriptByID(block_id)
        let canmove = block.getCanmove()
        if(canmove === false){
            console.warn(`out of the hero range`);
            return
        }

        let changedstamina = this.staminaManager.beChangedStamina(this.masterTrooID,block_id)
        if(changedstamina < 0){
            console.warn('does not have enough stamina')
            return
        }

        cc.zz.net.send(cc.zz.net.constants.SEND_TROOP_MOVE,[this.masterTrooID,changedstamina,tileFrom,tileTo])
    },
    receiveTroopMove:function(data){

        console.log(data)
        let troopID = data._id
        let tileFrom = parseInt(data.tile_from)
        let tileTo   = parseInt(data.tile_to)
        let troop =  this.getTroopScriptByTroopID(troopID)
        let stamina = parseInt(data.troop_stamina)
        
        troop.setTroopStamina(stamina)
        troop.setTroopTileFrom(tileFrom)
        troop.setTroopTileTo(tileTo)
        troop.heroMove(tileFrom,tileTo)
        
    },
    cancleAllChooseFlag:function(){
        for (let i = 0; i < this.onlineTroops.length; i++) {
            const troop = this.onlineTroops[i];
            let troopScript = troop.getComponent('online-hero')
            troopScript.cancleChooseFlag()
        }
    },

    chooseTroopFlag:function(troop_id){
        this.masterTrooID = troop_id
        this.cancleAllChooseFlag()
        let troop = this.getTroopScriptByTroopID(troop_id)
        let tileTo = troop.getTroopTileTO()
        let posX = this.blocksManager.getBlockPositionByID(tileTo).x - this.mainCamera.node.x 
        let posY = this.blocksManager.getBlockPositionByID(tileTo).y - this.mainCamera.node.y 
        this.mainCamera.node.runAction( cc.moveBy(0.5,cc.v2(posX,posY)))
        troop.onChooseFlag()
    },

    closeConnection:function(hero_id){
        if(hero_id === cc.zz.LoginData.getHeroAnamy()){
            cc.zz.fire.fire(EventType.POP_UP, cc.zz.Popup.TYPE.WAITTING_ANAMY_RECONNECTION.id, {});
        }
    },


    ///////////////////////////////////////////////////////////////////////////////
    // PRIVATE METHODS
    ///////////////////////////////////////////////////////////////////////////////
    /**
     * !#en Recieved players, buildings and occupied tiles list from server
     * !#zh 
     * @method onMapData
     * @param  {data} data
     */
    onMapData (data) {
        //push data to the MapData 
        cc.zz.MapData.pushMapElement(data)

        if(cc.zz.MapData.isEnoughHero() === true){
            console.log(cc.zz.MapData.mapData)
            for (let i = 0; i < cc.zz.MapData.mapData.length; i++) {
                let mapData = cc.zz.MapData.mapData[i]
                this.showOnlineTroops(mapData.hero.troops)
            }
        }
    },

    renderConnectionHero:function(){
        let heroData = cc.zz.MapData.connectData
        let selfTroops = heroData.self.troops
        let anamyTroops = heroData.anamy.troops
        this.showOnlineTroops(selfTroops)
        this.showOnlineTroops(anamyTroops)
    },
    showOnlineTroops (troops) {

        for (let i = 0; i < troops.length; i++) {

            let troopID = troops[i]._id;
            
            let troop = cc.instantiate(this.onlineHero)

            let troopScript = troop.getComponent('online-hero');

            // TODO pass troop type (Sprite of Hero) and color
            troopScript.initOriginData (troops[i])

            // List of references to the hero nodes on the map
            this.onlineTroops.push(troop);

            // Mapping to find hero on the map by hero ID
            this.troopMappings[troopID] = this.onlineTroops.length - 1;

            // Show hero on the map
            this.map.addChild(troop)
        }
    },

    ///////////////////////////////////////////////////////////////////////////////
    // GETTING METHOD
    ///////////////////////////////////////////////////////////////////////////////

    getTroopScriptByTroopID :function(troop_id){
        if(!this.troopMappings){
            console.log('this.heroMappings')
            return null
        }
        if(this.troopMappings[troop_id] === undefined){
            console.log('this.heroMappings[heroId]'+this.heroMappings[heroId])
            return null
        }
        let index = this.troopMappings[troop_id]
        if(this.onlineTroops[index] === undefined){
            console.log('this.onlineHero[index]'+this.onlineTroops[index])
            return null
        }
        return this.onlineTroops[index].getComponent('online-hero')
    },

    getMasterTroopID:function(){
        return this.masterTrooID
    },

    

});
