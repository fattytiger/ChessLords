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
        /**
         * !#en Prefab of the hero.
         *      IMPORTANT! This prefab is not used to show the heroes of the player who plays the game.
         *      They are managed by another script. 
         * !#zh 
         * @property onlineHero
         * @type {cc.Prefab}
         */
        onlineHero: {
            default: null,
            type: cc.Prefab
        },

        mainCamera:{
            default:null,
            type:cc.Camera
        },
        /**
         * !#en Map view in the scene, where heroes will be inserted in.
         *      Simply, this map node is a parent of sprites of online heroes
         * !#zh 
         * @property map
         * @type {cc.Node}
         */
        map: {
            default: null,
            type: cc.Node
        },
    }),

    ///////////////////////////////////////////////////////////////////////////////
    // LIFE-CYCLE CALLBACKS
    ///////////////////////////////////////////////////////////////////////////////

    ctor: function() {
        
    },
    start: function() { 
        this.blocksManager = cc.Canvas.instance.node.getComponent('blocks-manager')
        this.onlineTroops = [];
        this.troopMappings = {};
    },

    onEnable: function() {
        cc.zz.net.addHandler(cc.zz.net.constants.MAP_DATA, this.onMapData.bind(this), true);
        cc.zz.fire.on(EventType.CHOOSE_TROOP_FLAG,this.chooseTroopFlag.bind(this))
    },

    onDisable: function() {
        cc.zz.net.removeHandler(cc.zz.net.constants.MAP_DATA, this.onMapData.bind(this), true)
        cc.zz.fire.un(EventType.CHOOSE_TROOP_FLAG,this.chooseTroopFlag.bind(this))
    },

    cancleAllChooseFlag:function(){
        for (let i = 0; i < this.onlineTroops.length; i++) {
            const troop = this.onlineTroops[i];
            let troopScript = troop.getComponent('online-hero')
            troopScript.cancleChooseFlag()
        }
    },

    chooseTroopFlag:function(troop_id){
        this.cancleAllChooseFlag()
        let troop = this.getTroopScriptByTroopID(troop_id)
        let tileTo = troop.getTroopTileTO()
        let posX = this.blocksManager.getBlockPositionByID(tileTo).x - this.mainCamera.node.x 
        let posY = this.blocksManager.getBlockPositionByID(tileTo).y - this.mainCamera.node.y 
        this.mainCamera.node.runAction( cc.moveBy(0.5,cc.v2(posX,posY)))
        troop.onChooseFlag()
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
        console.log(data)
        if(data && data.troops){
            this.showOnlineTroops(data.troops)
        }
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

});
