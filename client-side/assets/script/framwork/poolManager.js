
//object manager pool
let PoolManager = cc.Class({
    extends: cc.Component,

    onLoad () {},

    start () {
        this.dictPool = {}
    },
    getNode(prefab,parent){
        let name = prefab.name
        let node = null
        if(this.dictPool.hasOwnProperty(name)){
            let pool = this.dictPool[name]
            if(pool.size() > 0) {
                node = pool.get()
            }else{
                node = cc.instantiate(prefab)
            }
        }else{
            let pool = new cc.NodePool()
            this.dictPool[name] =pool
            node = cc.instantiate(prefab) 
        }

        node.parent = parent
        return node
    },
    putNode(node){
        let name = node.name
        let pool = null
        if(this.dictPool.hasOwnProperty(name)){
            pool = this.dictPool[name]
        }else{
            pool  = new cc.NodePool();
            this.dictPool[name] = pool
        }
        pool.put(node)
    },

    clearPool(name){
        if(this.dictPool.hasOwnProperty(name)){
            let pool = this.dictPool[name]
            pool.clear()        }
    }

    // update (dt) {},
});
let poolManager = new PoolManager()
poolManager.start()
module.exports = poolManager

