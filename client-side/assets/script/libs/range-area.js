/****************************************************************************
 Copyright (c) 2019.    Arctic Seascape
 Author                 Tiger Yang (front-end@blocklords.io)

 https://www.blocklords.io/

range-area is to get the range of his bind nodes

 ****************************************************************************/
cc.Class({
    extends: cc.Component,

    properties: {
    },
    ///////////////////////////////////////////////////////////////////////////////
    // LIFE-CYCLE CALLBACKS
    ///////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////
    // Private Methods
    ///////////////////////////////////////////////////////////////////////////////

    /**
     * @method initOriginNode init the tile as Object instance at beginning
     * @param tile_id the tile id on the map
     * **/
    initOriginNode(tile_id) {
        let _pushId = parseInt(tile_id)
        let node = {}
        node.id = _pushId
        node.visit = true
        return node
    },

    /**
     * @method calcRange calculate the move range based on the tile_id and circle
     * @param {String} tile_id the tile id on the map
     * @param {Number} circle the circle based on the troop type
     * 
     * **/
    calcRange(tile_id, circle) {
        //init the start node
        let _startNode = this.initOriginNode(tile_id)

        //the circle value 1 ,illustrate the troop type is archer
        if (circle == 1) {
            let _first_arr = []
            let neighbors = this.neighborList(_startNode.id)
            for (let index = 0; index < neighbors.length; index++) {
                let neighbor = neighbors[index]
                if (neighbor.visit == false) {
                    neighbor.visit = true
                    _first_arr.push(neighbor)
                }

            }
            _first_arr.push(_startNode)
            return _first_arr
        }

        //the circle values 2,illustrate the troop type is soldier
        if(circle == 2){
            let _first_arr  = []
            let _second_arr = []
            let neighbors = this.neighborList(_startNode.id)
            for (let index = 0; index < neighbors.length; index++) {
                let neighbor = neighbors[index]

                if (neighbor.visit == false) {  
                    neighbor.visit = true
                    _first_arr.push(neighbor)
                }

            }
            for (let index = 0; index < _first_arr.length; index++) {
                let _second_neighbors = this.neighborList(_first_arr[index].id)
                for (let i = 0; i < _second_neighbors.length; i++) {
                    let neighbor = _second_neighbors[i]

                    if(this.isElementExist(neighbor,_first_arr) === false){
                        neighbor.visit = true
                        _second_arr.push(neighbor)
                    }
                }
            }
            return  _first_arr.concat(this.removeRepeatElement(_second_arr))

        }

        //circle values 3,the troop type is cavalry
        if(circle == 3){
            let _first_arr  = []
            let _second_arr = []
            let _thrid_arr  = []
            let neighbors = this.neighborList(_startNode.id)
            for (let index = 0; index < neighbors.length; index++) {
                let neighbor = neighbors[index]
                if (neighbor.visit == true) {
                    continue
                }

                if (neighbor.visit == false) {
                    neighbor.parent = _startNode
                    neighbor.visit = true
                    _first_arr.push(neighbor)
                }
            }
            for (let index = 0; index < _first_arr.length; index++) {

                let _second_neighbors = this.neighborList(_first_arr[index].id)

                for (let i = 0; i < _second_neighbors.length; i++) {
                    let neighbor = _second_neighbors[i]

                    if(this.isElementExist(neighbor,_first_arr) === false){
                        neighbor.visit = true
                        _second_arr.push(neighbor)
                    }
                }
            }
            let _middle_arr = _first_arr.concat(this.removeRepeatElement(_second_arr))
            for (let index = 0; index < _middle_arr.length; index++) {
                
                let _third_neighbors = this.neighborList(_middle_arr[index].id)
                for (let i = 0; i < _third_neighbors.length; i++) {
                    
                    let neighbor = _third_neighbors[i]

                    if(this.isElementExist(neighbor,_middle_arr) === false){

                        neighbor.visit = true
                        _thrid_arr.push(neighbor)

                    }
                }
            }
            return _middle_arr.concat(this.removeRepeatElement(_thrid_arr))
        }

    },

    ///////////////////////////////////////////////////////////////////////////////
    // Public Methods
    ///////////////////////////////////////////////////////////////////////////////


        

    /**
     * @method isLegalTile judge the tile is legal tile or not 
     * @param tile_id the tile il on the map
     * **/
    isLegalTile(tile_id) {
        let _tile = tile_id

        if (_tile < 1000 && _tile > 0) {
            return true
        }

        return false
    },

    /**
     * @method isElementExist Judge the element is traversed or ont
     * @param {Object} elem the element instance
     * @param {Array} array the array which need to traverse
     * **/
    isElementExist:function(elem,array){
        for (let index = 0; index < array.length; index++) {
            if(array[index].id == elem.id){
                return true
            }
        }
        return false
    },
    /**
     * @method removeRepeatElement remove the repeat element when traverse the array
     * @param {Array} paramArr the paramArr which need to delete the repeat element
     * @returns {Array} the removed array
     * **/
    removeRepeatElement(paramArr){

        if(!Array.isArray(paramArr)){
            console.warn('type error')
            return 
        }
        
        for (let index = 0; index < paramArr.length; index++) {
            for (let i = index + 1; i < paramArr.length; i++) {
                
                if(paramArr[index].id == paramArr[i].id){
                    paramArr.splice(i,1)
                    i-- 
                }

            }
        }
        return paramArr

    },
    /**
     * @method neighborList based on the tile to calculate the tile's neighbors
     * @param  {String} tile_id the tile id on the map
     * @returns {Array} the neighbors of the tile
     * **/
    neighborList(tile_id) {
        let _tile = parseInt(tile_id)
        let ret = [];

        //west
        if (this.isLegalTile(_tile) && this.isLegalTile(_tile - 1)) {
            let _pushId = _tile - 1
            let node = {}
            node.id = _pushId
            node.visit = false
            ret.push(node)
        }

        //east
        if (this.isLegalTile(_tile) && this.isLegalTile(_tile + 1)) {
            let _pushId = _tile + 1
            let node = {}
            node.id = _pushId
            node.visit = false
            ret.push(node)
        }

        //north
        if (this.isLegalTile(_tile) && this.isLegalTile(_tile - 40)) {
            let _pushId = _tile - 40
            let node = {}
            node.id = _pushId
            node.visit = false
            ret.push(node)
        }
        //east
        if (this.isLegalTile(_tile) && this.isLegalTile(_tile + 40)) {
            let _pushId = _tile + 40
            let node = {}
            node.id = _pushId
            node.visit = false
            ret.push(node)
        }

        //westnorth
        if (this.isLegalTile(_tile - 1) && this.isLegalTile(_tile - 40)) {
            let _pushId = _tile - 40 - 1
            let node = {}
            node.id = _pushId
            node.visit = false
            ret.push(node)
        }

        //eastnorth
        if (this.isLegalTile(_tile + 1) && this.isLegalTile(_tile - 40)) {
            let _pushId = _tile - 40 + 1
            let node = {}
            node.id = _pushId
            node.visit = false
            ret.push(node)
        }

        //westsourth
        if (this.isLegalTile(_tile - 1) && this.isLegalTile(_tile + 40)) {
            let _pushId = _tile + 40 - 1
            let node = {}
            node.id = _pushId
            node.visit = false
            ret.push(node)
        }

        //eastsourth
        if (this.isLegalTile(_tile + 1) && this.isLegalTile(_tile + 40)) {
            let _pushId = _tile + 40 + 1
            let node = {}
            node.id = _pushId
            node.visit = false
            ret.push(node)
        }

        return ret

    },
});
