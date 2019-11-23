

cc.Class({
    start(){
        this.dictSharedPanel = {}
        this.dictLoading = {}

        this.arrPopupDialog = []
    },

    loadRes:function(url,type,cb){
        cc.loader.loadRes(url,type,function(err,res){
            if(err){
                cc.error(err.message || err)
                return
            }
            cb(err,res)
        })
    },

    createUI:function(path,cb,parent){
        this.loadRes('prefabs/ui' + path, cc.Prefab ,function(err,prefab){
            if(err) {
                return
            }
            let node = cc.instantiate(prefab)
            node.setPosition(cc.v2(0,0))
            if(!parent){
                parent = cc.find('Canvas')
            }
            parent.addChild(node)
            cb(null,node)
        })
    },

    showSharedDialog:function (panelPath,scriptName,args){


    }
})