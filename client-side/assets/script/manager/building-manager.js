const EventType = require("EventType")
cc.Class({
    extends: cc.Component,

    properties: {
        basePrefab:{
            default:null,
            type:cc.Prefab
        },
        map:{
            default:null,
            type:cc.Node
        }
    },

    ///////////////////////////////////////////////////////////////////////////////
    // LIFE-CYCLE CALLBACKS
    ///////////////////////////////////////////////////////////////////////////////

    onEnable:function(){
        cc.zz.net.addHandler(cc.zz.net.constants.MAP_DATA, this.onMapData.bind(this),true);

        cc.zz.fire.on(EventType.RENDER_CONNECTION_BASE,this.renderBase.bind(this))
    },
    onDisable:function(){
        cc.zz.net.removeHandler(cc.zz.net.constants.MAP_DATA, this.onMapData.bind(this),true);

        cc.zz.fire.un(EventType.RENDER_CONNECTION_BASE,this.renderBase.bind(this))
    },

    onLoad:function(){
        this.blocksManager = this.node.getComponent('blocks-manager')
        this.baseMappings = {}
        this.bases = []
    },
    

    ///////////////////////////////////////////////////////////////////////////////
    // COMMON FUNCTIONS
    ///////////////////////////////////////////////////////////////////////////////
    renderBase:function(){
        let heroData = cc.zz.MapData.connectData
        let selfBase = heroData.self.base
        let anamyBase = heroData.anamy.base
        this.showBaseOnmap(selfBase)
        this.showBaseOnmap(anamyBase)
    },
    onMapData:function(data){
        cc.zz.MapData.pushMapElement(data)

        if(cc.zz.MapData.isEnoughHero() === true){
            console.log(cc.zz.MapData.mapData)
            for (let i = 0; i < cc.zz.MapData.mapData.length; i++) {
                let mapData = cc.zz.MapData.mapData[i]
                this.showBaseOnmap(mapData.base)
            }
        }
    },

    showBaseOnmap:function(base){
        //get base id
        let baseID = base._id
        //instantiate the prefab resource
        let instance = cc.instantiate(this.basePrefab)
        //init the building data
        instance.getComponent('base').init(base)
        //add the base to the map
        this.map.addChild(instance)
        //push the base into base arr
        this.bases.push(instance)
        //map the base 
        this.baseMappings[baseID] = this.bases.length - 1
    },

    findBaseByBaseID:function(id){
        console.log(id)
        console.log(this.baseMappings)
        let index = this.baseMappings[id]
        console.log(index)
        if(this.baseMappings === undefined){
            console.warn("base mapping was undefined");
            return
        }
        if(this.baseMappings[id] === undefined){
            console.warn("can not find base mapping");
            return
        }
        if(this.bases[index] === undefined){
            console.warn("can not find the base");
            return
        }
        return this.bases[index].getComponent("base")
    }


    ///////////////////////////////////////////////////////////////////////////////
    // PRIVATE METHODS
    ///////////////////////////////////////////////////////////////////////////////
});
