cc.Class({
    extends: cc.Component,

    properties: {

    },

    //handle the node name list
    handleNodeNameList: function (str) {
        let strArray = str.split('node')
        let num = parseInt(strArray[1])
        let column = parseInt(num / 100)
        let list = (num / 100 - column) * 100
        return list.toFixed(0)
    },

    checkLocation(column,list) {
        let TopNode = cc.find(`Canvas/background/node${(column + 1) < 10 ? '0' + (column + 1) : (column + 1)}${list < 10 ? '0' + list : list}`)
        let bottomNode = cc.find(`Canvas/background/node${(column - 1) < 10 ? '0' + (column - 1) : (column - 1)}${list < 10 ? '0' + list : list}`)
        let leftNode = cc.find(`Canvas/background/node${column < 10 ? '0' + column : column}${(list - 1) < 10 ? '0' + (list - 1) : (list - 1)}`)
        let rightNode = cc.find(`Canvas/background/node${column < 10 ? '0' + column : column}${(list + 1) < 10 ? '0' + (list + 1) : (list + 1)}`)

        TopNode.opacity = 100
        bottomNode.opacity = 100
        leftNode.opacity = 100
        rightNode.opacity = 100

    },


    checkCityLocation(column,list){
        let TopNode = cc.find(`Canvas/background/node${(column + 1) < 10 ? '0' + (column + 1) : (column + 1)}${list < 10 ? '0' + list : list}`)
        let bottomNode = cc.find(`Canvas/background/node${(column - 1) < 10 ? '0' + (column - 1) : (column - 1)}${list < 10 ? '0' + list : list}`)
        let leftNode = cc.find(`Canvas/background/node${column < 10 ? '0' + column : column}${(list - 1) < 10 ? '0' + (list - 1) : (list - 1)}`)
        let rightNode = cc.find(`Canvas/background/node${column < 10 ? '0' + column : column}${(list + 1) < 10 ? '0' + (list + 1) : (list + 1)}`)
        let centerNode = cc.find(`Canvas/background/node${column < 10 ? '0' + column : column}${list < 10 ? '0' + list: list}`)
        let TopLeftNode = cc.find(`Canvas/background/node${(column + 1) < 10 ? '0' + (column + 1) : (column + 1)}${(list-1 )< 10 ? '0' +(list-1 ) : (list-1 )}`)
        let TopRightNode = cc.find(`Canvas/background/node${(column + 1) < 10 ? '0' + (column + 1) : (column + 1)}${(list+1 )< 10 ? '0' +(list+1 ) : (list+1 )}`)
        let bottomLeftNode = cc.find(`Canvas/background/node${(column - 1) < 10 ? '0' + (column - 1) : (column-1)}${(list-1 )< 10 ? '0' +(list-1 ) : (list-1 )}`)
        let bottomRightNode = cc.find(`Canvas/background/node${(column -1) < 10 ? '0' + (column - 1) : (column - 1)}${(list+1 )< 10 ? '0' +(list+1 ) : (list+1 )}`)


        TopNode.opacity = 100
        bottomNode.opacity = 100
        leftNode.opacity = 100
        rightNode.opacity = 100
        centerNode.opacity = 100
        TopLeftNode.opacity = 100
        TopRightNode.opacity = 100
        bottomLeftNode.opacity = 100
        bottomRightNode.opacity = 100
    },



    //handle the node name column
    handleNodeNameColumn: function (str) {
        let strArray = str.split('node')
        let num = parseInt(strArray[1])
        let column = parseInt(num / 100)
        return column.toFixed(0)
    },



    clearScreen: function () {
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                let block = cc.find(`Canvas/background/node${i > 9 ? i : '0' + i}${j > 9 ? j : '0' + j}`)
                block.opacity = 0
            }
        }
    },

    mouseEnterBlock: function (node) {
        const BottomPlayer = require('BottomPlayer')
        const player = new BottomPlayer()

        const LeftPlayer = require('LeftPlayer')
        const player2 = new LeftPlayer()

        const RightPlayer = require('RightPlayer')
        const player3 = new RightPlayer

        // this.clearScreen()
        node.opacity = 100
        // player.initArcherLocation()
        // player.initTroopLocation()
        // player.initKnightLocation()

        // player2.initArcherLocation()
        // player2.initTroopLocation()
        // player2.initKnightLocation()

        // player3.initArcherLocation()
        // player3.initTroopLocation()
        // player3.initKnightLocation()
    },


    
    

    mouseLeaveBlock:function(){
        this.clearScreen()
    },


    mouseEnterCity:function(node){
        this.clearScreen()
        let nodeName = node.name
        let column = parseInt(this.handleNodeNameColumn(nodeName))
        let list = parseInt(this.handleNodeNameList(nodeName))
        this.checkCityLocation(column,list)
    },

    mouseEnterBottomCity:function(node){
        let cityArr = ['node0007','node0008','node0009','node0107','node0108','node0109','node0207','node0208','node0209']
        for(let i = 0;i< cityArr.length;i++){
            if(node.name == cityArr[i]){
                this.clearScreen()
                let node0007 = cc.find('Canvas/background/node0007')
                let node0008 = cc.find('Canvas/background/node0008')
                let node0009 = cc.find('Canvas/background/node0009')
                let node0107 = cc.find('Canvas/background/node0107')
                let node0108 = cc.find('Canvas/background/node0108')
                let node0109 = cc.find('Canvas/background/node0109')
                let node0207 = cc.find('Canvas/background/node0207')
                let node0208 = cc.find('Canvas/background/node0208')
                let node0209 = cc.find('Canvas/background/node0209')
                node0007.opacity = 100
                node0008.opacity = 100
                node0009.opacity = 100
                node0107.opacity = 100
                node0108.opacity = 100
                node0109.opacity = 100
                node0207.opacity = 100
                node0208.opacity = 100
                node0209.opacity = 100
            }
        }
    },


    mouseEnterLeftCity:function(node){
        let cityArr = ['node0801','node0802','node0803','node0901','node0902','node0903','node1001','node1002','node1003']
        for(let i=0;i<cityArr.length;i++){
            if(node.name == cityArr[i]){
                this.clearScreen()
                let node0801 = cc.find('Canvas/background/node0801')
                let node0802 = cc.find('Canvas/background/node0802')
                let node0803 = cc.find('Canvas/background/node0803')
                let node0901 = cc.find('Canvas/background/node0901')
                let node0902 = cc.find('Canvas/background/node0902')
                let node0903 = cc.find('Canvas/background/node0903')
                let node1001 = cc.find('Canvas/background/node1001')
                let node1002 = cc.find('Canvas/background/node1002')
                let node1003 = cc.find('Canvas/background/node1003')

                node0801.opacity = 100
                node0802.opacity = 100
                node0803.opacity = 100
                node0901.opacity = 100
                node0902.opacity = 100
                node0903.opacity = 100
                node1001.opacity = 100
                node1002.opacity = 100
                node1003.opacity = 100
            }
        }
    },


    mouseEnterRightCity:function(node){
        let cityArr = ['node0816','node0817','node0818','node0916','node0917','node0918','node1016','node1017','node1018']
        for(let i=0;i<cityArr.length;i++){
            if(node.name == cityArr[i]){
                this.clearScreen()
                let node0816 = cc.find('Canvas/background/node0816')
                let node0817 = cc.find('Canvas/background/node0817')
                let node0818 = cc.find('Canvas/background/node0818')
                let node0916 = cc.find('Canvas/background/node0916')
                let node0917 = cc.find('Canvas/background/node0917')
                let node0918 = cc.find('Canvas/background/node0918')
                let node1016 = cc.find('Canvas/background/node1016')
                let node1017 = cc.find('Canvas/background/node1017')
                let node1018 = cc.find('Canvas/background/node1018')

                node0816.opacity = 100
                node0817.opacity = 100
                node0818.opacity = 100
                node0916.opacity = 100
                node0917.opacity = 100
                node0918.opacity = 100
                node1016.opacity = 100
                node1017.opacity = 100
                node1018.opacity = 100
            }
        }
    },

    //into Archer
    mouseEnterArcher: function (node) {
        this.clearScreen()
        let archer = cc.find('Canvas/background/BottomCity/archer')
        cc.loader.loadRes('image/Map/archer_red_highlighted', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                archer.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
                let nodeName = node.name
                let column = parseInt(this.handleNodeNameColumn(nodeName))
                let list = parseInt(this.handleNodeNameList(nodeName))
                this.checkLocation(column,list)
            }
        })
    },
    mouseEnterArcher2:function(node){
        this.clearScreen()
        let archer = cc.find('Canvas/background/LeftCity/archer')
        cc.loader.loadRes('image/Map/archer_red_highlighted', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                archer.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
                let nodeName = node.name
                let column = parseInt(this.handleNodeNameColumn(nodeName))
                let list = parseInt(this.handleNodeNameList(nodeName))
                this.checkLocation(column,list)
            }
        })
    },
    mouseEnterArcher3:function(node){
        this.clearScreen()
        let archer = cc.find('Canvas/background/RightCity/archer')
        cc.loader.loadRes('image/Map/archer_red_highlighted', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                archer.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
                let nodeName = node.name
                let column = parseInt(this.handleNodeNameColumn(nodeName))
                let list = parseInt(this.handleNodeNameList(nodeName))
                this.checkLocation(column,list)
            }
        })
    },


    //leave Archer
    mouseLeaveArcher:function(node){
        this.clearScreen()
        let archer = cc.find('Canvas/background/BottomCity/archer')
        cc.loader.loadRes('image/Map/archer_red', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                archer.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
            }
        })
    },

    mouseLeaveArcher2:function(node){
        this.clearScreen()
        let archer = cc.find('Canvas/background/LeftCity/archer')
        cc.loader.loadRes('image/Map/archer_red', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                archer.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
            }
        })
    },
    mouseLeaveArcher3:function(node){
        this.clearScreen()
        let archer = cc.find('Canvas/background/RightCity/archer')
        cc.loader.loadRes('image/Map/archer_red', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                archer.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
            }
        })
    },


    //enter the Troop
    mouseEnterTroop: function (node) {
        this.clearScreen()
        let tro = cc.find('Canvas/background/BottomCity/troop')
        cc.loader.loadRes('image/Map/troop_yellow_highlighted', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                tro.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
                let nodeName = node.name
                let column = parseInt(this.handleNodeNameColumn(nodeName))
                let list = parseInt(this.handleNodeNameList(nodeName))
                this.checkLocation(column,list)
            }
        })
    },
    mouseEnterTroop2:function(node){
        this.clearScreen()
        let tro = cc.find('Canvas/background/LeftCity/troop')
        console.log(cc.gameSpace.TroopLocation2)
        cc.loader.loadRes('image/Map/troop_yellow_highlighted', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                tro.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
                let nodeName = node.name
                let column = parseInt(this.handleNodeNameColumn(nodeName))
                let list = parseInt(this.handleNodeNameList(nodeName))
                this.checkLocation(column,list)
            }
        })
    },
    mouseEnterTroop3:function(node){
        this.clearScreen()
        let tro = cc.find('Canvas/background/RightCity/troop')
        cc.loader.loadRes('image/Map/troop_yellow_highlighted', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                tro.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
                let nodeName = node.name
                let column = parseInt(this.handleNodeNameColumn(nodeName))
                let list = parseInt(this.handleNodeNameList(nodeName))
                this.checkLocation(column,list)
            }
        })
    },

    //leave the troop
    mouseLeaveTroop:function(node){
        this.clearScreen()
        let tro = cc.find('Canvas/background/BottomCity/troop')
        cc.loader.loadRes('image/Map/troop_yellow', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                tro.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
            }
        })
    },
    mouseLeaveTroop2:function(node){
        this.clearScreen()
        let troop = cc.find('Canvas/background/LeftCity/troop')
        cc.loader.loadRes('image/Map/troop_yellow', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                troop.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
            }
        })
    },
    mouseLeaveTroop3:function(node){
        this.clearScreen()
        let tro = cc.find('Canvas/background/RightCity/troop')
        cc.loader.loadRes('image/Map/troop_yellow', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                tro.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
            }
        })
    },

    //enter the knight
    mouseEnterKnight: function (node) {
        this.clearScreen()
        let knight = cc.find('Canvas/background/BottomCity/knight')
        cc.loader.loadRes('image/Map/knight_blue_highlighted', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                knight.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
                let nodeName = node.name
                let column = parseInt(this.handleNodeNameColumn(nodeName))
                let list = parseInt(this.handleNodeNameList(nodeName))

                this.checkLocation(column,list)
            }
        })
    },
    mouseEnterKnight2: function (node) {
        this.clearScreen()
        let knight = cc.find('Canvas/background/LeftCity/knight')
        cc.loader.loadRes('image/Map/knight_blue_highlighted', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                knight.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
                let nodeName = node.name
                let column = parseInt(this.handleNodeNameColumn(nodeName))
                let list = parseInt(this.handleNodeNameList(nodeName))

                this.checkLocation(column,list)
            }
        })
    },
    mouseEnterKnight3: function (node) {
        this.clearScreen()
        let knight = cc.find('Canvas/background/RightCity/knight')
        cc.loader.loadRes('image/Map/knight_blue_highlighted', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                knight.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
                let nodeName = node.name
                let column = parseInt(this.handleNodeNameColumn(nodeName))
                let list = parseInt(this.handleNodeNameList(nodeName))

                this.checkLocation(column,list)
            }
        })
    },


    //leave the knight
    mouseLeaveKnight:function(node){
        this.clearScreen()
        let knight = cc.find('Canvas/background/BottomCity/knight')
        cc.loader.loadRes('image/Map/knight_blue', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                knight.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
            }
        })
    },
    mouseLeaveKnight2:function(node){
        this.clearScreen()
        let knight = cc.find('Canvas/background/LeftCity/knight')
        cc.loader.loadRes('image/Map/knight_blue', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                knight.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
            }
        })
    },
    mouseLeaveKnight3:function(node){
        this.clearScreen()
        let knight = cc.find('Canvas/background/RightCity/knight')
        cc.loader.loadRes('image/Map/knight_blue', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                knight.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
            }
        })
    },




    onLoad() { 
        
    },

    start() {

    },

    // update (dt) {},
});
