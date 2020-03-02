/****************************************************************************
 Copyright (c) 2019.    Arctic Seascape
 Author                 Tiger Yang (front-end@blocklords.io)

 https://www.blocklords.io/

 the move logic of your hero ,in terms of hero stamina & solider type to caculate the solider move range on the map 
****************************************************************************/



cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad:function(){
        this.blocksManager = cc.Canvas.instance.node.getComponent('blocks-manager')
    },
    

    /**
     * @method isLegalTile judge the tile is legal or not
     * @method tile_id the tile id on the map
     * @returns {Boolean} if the return data is true ,illustrate the tile id is legal,otherwise not
     * **/
    isLegalTile(tile_id){
        let _tile = tile_id

        if( _tile < 1000 && _tile > 0){
            return true
        }

        return false
    },
    /**
     * @method isExistElemInArr judge the element is existed on the array or not
     * @param elem the elemnt the the checked array
     * @param check_arr which will need to check array
     * @returns {Boolean} if the return data is true ,illustrate it is exsited in the checked array,otherwise not
     * **/
    isExistElemInArr:function (elem,check_arr) {
        for (let index = 0; index < check_arr.length; index++) {
            if(check_arr[index].id == elem.id){
                return true
            }
        }
        return false
    },

    /**
     * @method initOriginData init the origin node by tile id
     * @param tile_id the tile id on the map
     * @return {Object} the changed node 
     * **/
    initOriginData(tile_id){
        let _pushId = parseInt(tile_id)
        let node = {}
        node.f = 0
        node.g = 0
        node.h = 0
        node.id = _pushId
        node.x      = this.blocksManager.getBlockPositionByID(_pushId).x
        node.y      = this.blocksManager.getBlockPositionByID(_pushId).y
        node.wall   = this.blocksManager.getBlockScriptByID(_pushId).move === 0 ? true : false
        node.parent = null
        return node
    },

    /**
     * @method neghborList based on the origion node to calculate the neighbors 
     * @param origion_node the origion node
     * @returns {Array} the neighbors array
     * **/
    neghborList(origion_node){
        let _tile = parseInt(origion_node.id)
   
        let ret = [];

        //west
        if(  this.isLegalTile(_tile) && this.isLegalTile(_tile -1)){
            let _pushId = _tile -1

            let node = {}
            node.f = 0
            node.g = 0
            node.h = 0
            node.id     = _pushId
            node.x      = this.blocksManager.getBlockPositionByID(_pushId).x
            node.y      = this.blocksManager.getBlockPositionByID(_pushId).y
            node.wall   = this.blocksManager.getBlockScriptByID(_pushId).move === 0 ? true : false
            node.parent = null
            ret.push(node)
            
        }

        //east
        if(this.isLegalTile(_tile) && this.isLegalTile(_tile + 1)){
            let _pushId = _tile + 1

            let node = {}
            node.id  = _pushId
            node.f = 0
            node.g = 0
            node.h = 0
            node.x      = this.blocksManager.getBlockPositionByID(_pushId).x
            node.y      = this.blocksManager.getBlockPositionByID(_pushId).y
            node.wall   = this.blocksManager.getBlockScriptByID(_pushId).move === 0 ? true : false
            node.parent = null
            ret.push(node)

        }

        //north
        if(this.isLegalTile(_tile) && this.isLegalTile(_tile - 20)){

            let _pushId = _tile - 20

            let node = {}
            
            node.f = 0
            node.g = 0
            node.h = 0
            node.id  = _pushId
            node.x      = this.blocksManager.getBlockPositionByID(_pushId).x
            node.y      = this.blocksManager.getBlockPositionByID(_pushId).y
            node.wall   = this.blocksManager.getBlockScriptByID(_pushId).move === 0 ? true : false
            node.parent = null
            ret.push(node)

        }

        //sourth
        if(this.isLegalTile(_tile) && this.isLegalTile(_tile + 20)){

            let _pushId = _tile + 20

            let node = {}
            
            node.f = 0
            node.g = 0
            node.h = 0
            node.id  = _pushId
            node.x      = this.blocksManager.getBlockPositionByID(_pushId).x
            node.y      = this.blocksManager.getBlockPositionByID(_pushId).y
            node.wall   = this.blocksManager.getBlockScriptByID(_pushId).move === 0 ? true : false
            node.parent = null
            ret.push(node)

        }

        //sourthwest
        if(this.isLegalTile(_tile - 1) && this.isLegalTile(_tile + 20)){

            let _pushId = _tile + 20 -1

            let node = {}
            node.f = 0
            node.g = 0
            node.h = 0
            node.id  = _pushId
            node.x      = this.blocksManager.getBlockPositionByID(_pushId).x
            node.y      = this.blocksManager.getBlockPositionByID(_pushId).y
            node.wall   = this.blocksManager.getBlockScriptByID(_pushId).move === 0 ? true : false
            node.parent =   null
            ret.push(node)

        }

        //sourtheast
        if(this.isLegalTile(_tile + 1) && this.isLegalTile(_tile + 20)){

            let _pushId = _tile + 20 + 1

            let node = {}
            node.f = 0
            node.g = 0
            node.h = 0
            node.id  = _pushId
            node.x      = this.blocksManager.getBlockPositionByID(_pushId).x
            node.y      = this.blocksManager.getBlockPositionByID(_pushId).y
            node.wall   = this.blocksManager.getBlockScriptByID(_pushId).move === 0 ? true : false
            node.parent = null
            ret.push(node)

        }

        //northwest
        if(this.isLegalTile(_tile - 1) && this.isLegalTile(_tile - 20)){

            let _pushId = _tile - 20 -1

            let node = {}
            node.f = 0
            node.g = 0
            node.h = 0
            node.id  = _pushId
            node.x      = this.blocksManager.getBlockPositionByID(_pushId).x
            node.y      = this.blocksManager.getBlockPositionByID(_pushId).y
            node.wall   = this.blocksManager.getBlockScriptByID(_pushId).move === 0 ? true : false
            node.parent = null
            ret.push(node)
        }

        //northeast
        if(this.isLegalTile(_tile + 1) && this.isLegalTile(_tile - 20)){

            let _pushId = _tile - 20 + 1

            let node = {}
            node.f = 0
            node.g = 0
            node.h = 0
            node.id  = _pushId
            node.x      = this.blocksManager.getBlockPositionByID(_pushId).x
            node.y      = this.blocksManager.getBlockPositionByID(_pushId).y
            node.wall   = this.blocksManager.getBlockScriptByID(_pushId).move === 0 ? true : false
            node.parent = null
            ret.push(node)

        }
        return ret
    },

    /**
     * @method researchPath the algorithm of for finding move path
     * @param start the stard node
     * @param end the end node
     * @returns {Array} the finded path
     * **/
    researchPath(start,end){
        let _startNode = this.initOriginData(start)
        let _endNode   = this.initOriginData(end)

        let openList   = []
        let closeList  = []

        openList.push(_startNode)


        while(openList.length > 0){

            let lowInd = 0
            for (let index = 0; index < openList.length; index++) {
                
                if(openList[index].f < openList[lowInd].f){ lowInd = index }

            }
            let _currentNode = openList[lowInd]

            if(_currentNode.id === _endNode.id){
                let curr = _currentNode
                let ret = []
                while(curr.parent){
                    ret.push(curr)
                    curr = curr.parent
                }
                return ret.reverse()
            }

            for (let index = 0; index < openList.length; index++) {
                if(openList[index].id == _currentNode.id){
                    openList.splice( index , 1 )
                }
            }
            closeList.push(_currentNode)
            
            let neighbors = this.neghborList(_currentNode,_endNode)

            for (let index = 0; index < neighbors.length; index++) {
                
                let neighbor = neighbors[index]

                if(neighbor.wall || this.isExistElemInArr(neighbor,closeList)){
                    continue
                }

                let _gScore = _currentNode.g + 10
                let _gScoreBest = false

                if(!this.isExistElemInArr(neighbor,openList)){
                    _gScoreBest = true
                    neighbor.h  = this.calcHcost(neighbor,_endNode)
                    openList.push(neighbor)
                }

                if(_gScore < neighbor.g){
                    
                    _gScoreBest = true
                }

                if(_gScoreBest){
                    neighbor.parent = _currentNode
                    neighbor.g      = _gScore
                    neighbor.f      = neighbor.g + neighbor.h

                }
            }
        }

        return []
    },

    /**
     * @method calcHcost calculate the H cost
     * @returns {Number} the H cost value
     * **/
    calcHcost:function(current_node,end_node){
        let _startPos = this.blocksManager.getBlockPositionByID(current_node.id)
        let _endPos   = this.blocksManager.getBlockPositionByID(end_node.id)
        let rowStep     = (Math.abs(_startPos.x - _endPos.x) / 200) * 10
        let columnStep  = (Math.abs(_startPos.y - _endPos.y) / 200) * 10
        return rowStep + columnStep
    },

    /**
     * @method calcGcost calculate the G cost
     * @returns {Number} the G cost value
     * **/
    calcGcost:function(current_node,next_node){
        let _startPos  = this.blocksManager.getBlockPositionByID(current_node.id)
        let _endPos    = this.blocksManager.getBlockPositionByID(next_node.id)
        if(Math.abs(_startPos.x - _endPos.x) < 1){
            if(current_node.parent !== null){
                return 10 + current_node.parent.g
            }
            return 10
        } 

        if(Math.abs(_startPos.y - _endPos.y < 1)){
            if(current_node.parent !== null){
                return 10 + current_node.parent.g
            }
            return 10
        }
        if(Math.abs(_startPos.x - _endPos.x) > 1 && Math.abs(_startPos.y - _endPos.y) > 1){
            if(current_node.parent !== null){
                return  14 + current_node.parent.g
            }
            return 14
        }
    }
});
