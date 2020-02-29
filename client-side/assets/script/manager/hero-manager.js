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
    },

    onDisable: function() {
        cc.zz.net.removeHandler(cc.zz.net.constants.MAP_DATA, this.onMapData.bind(this), true)
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
    /**
     * !#en Show heroes on the map 
     * !#zh 
     * @method showOnlineHeroes
     * @param  {Array} heroes
     */
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


    lockCameraAtHero:function(){
        let selfWallet = cc.zz.LoginData.getWallet()

        let tileID = this.getHeroLocationByWallet(selfWallet)

        let posX = this.blocksManager.getBlockPositionByID(tileID).x - this.mainCamera.node.x 
        let posY = this.blocksManager.getBlockPositionByID(tileID).y - this.mainCamera.node.y 

        this.mainCamera.node.runAction( cc.moveBy(0.5,cc.v2(posX,posY)))
    },



    /**
     * !#en Get the hero node on the map by hero id
     * !#zh 
     * @method getHeroNode
     * @param {number} heroId 
     * @return {cc.Node|null}
     */
    getHeroNode (heroId) {
        if (!this.heroMappings) {
            return null;
        }

        if (this.heroMappings[heroId] == undefined) {
            return null;
        }

        // index of node on a nodes list
        let i = this.heroMappings[heroId];
    
        if (this.onlineTroops[i] == undefined) {
            return null;
        }

        return this.onlineTroops[i];
    },

});
