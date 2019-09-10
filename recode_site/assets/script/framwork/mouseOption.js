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

        this.clearScreen()
        node.opacity = 100
        player.initArcherLocation()
        player.initTroopLocation()
        player.initKnightLocation()

        player2.initArcherLocation()
        player2.initTroopLocation()
        player2.initKnightLocation()

        player3.initArcherLocation()
        player3.initTroopLocation()
        player3.initKnightLocation()
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
        const BottomPlayer = require('BottomPlayer')
        const player = new BottomPlayer()
        this.clearScreen()
        let archer = cc.find('Canvas/background/BottomCity/archer')
        cc.loader.loadRes('image/Map/archer_red', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                archer.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
                player.initArcherLocation()
            }
        })
    },

    mouseLeaveArcher2:function(node){
        const LeftPlayer = require('LeftPlayer')
        const player = new LeftPlayer()
        this.clearScreen()
        let archer = cc.find('Canvas/background/LeftCity/archer')
        cc.loader.loadRes('image/Map/archer_red', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                archer.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
                player.initArcherLocation()
            }
        })
    },
    mouseLeaveArcher3:function(node){
        const RightPlayer = require('RightPlayer')
        const player = new RightPlayer()
        this.clearScreen()
        let archer = cc.find('Canvas/background/RightCity/archer')
        cc.loader.loadRes('image/Map/archer_red', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                archer.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
                player.initArcherLocation()
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
        console.log('a')
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
        const BottomPlayer = require('bottomPlayer')
        const player = new BottomPlayer()
        let tro = cc.find('Canvas/background/BottomCity/troop')
        cc.loader.loadRes('image/Map/troop_yellow', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                tro.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
                player.initArcherLocation()
            }
        })
    },
    mouseLeaveTroop2:function(node){
        this.clearScreen()
        const LeftPlayer = require('LeftPlayer')
        const player = new LeftPlayer()
        let tro = cc.find('Canvas/background/LeftCity/troop')
        cc.loader.loadRes('image/Map/troop_yellow', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                tro.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
                player.initArcherLocation()
            }
        })
    },
    mouseLeaveTroop3:function(node){
        this.clearScreen()
        const RightPlayer = require('RightPlayer')
        const player = new RightPlayer()
        let tro = cc.find('Canvas/background/RightCity/troop')
        cc.loader.loadRes('image/Map/troop_yellow', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                tro.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
                player.initArcherLocation()
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
        const BottomPlayer = require('bottomPlayer')
        const player = new BottomPlayer()
        this.clearScreen()
        let knight = cc.find('Canvas/background/BottomCity/knight')
        cc.loader.loadRes('image/Map/knight_blue', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                knight.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
                player.initKnightLocation()
            }
        })
    },
    mouseLeaveKnight2:function(node){
        const LeftPlayer = require('LeftPlayer')
        const player = new LeftPlayer()
        this.clearScreen()
        let knight = cc.find('Canvas/background/LeftCity/knight')
        cc.loader.loadRes('image/Map/knight_blue', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                knight.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
                player.initKnightLocation()
            }
        })
    },
    mouseLeaveKnight3:function(node){
        const RightCity = require('RightPlayer')
        const player = new RightCity()
        this.clearScreen()
        let knight = cc.find('Canvas/background/RightCity/knight')
        cc.loader.loadRes('image/Map/knight_blue', cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log(err)
            } else {
                knight.getComponent(cc.Sprite).spriteFrame = spriteFrame
                node.opacity = 0
                player.initKnightLocation()
            }
        })
    },




    onLoad() { 
        
    },

    start() {

    },

    // update (dt) {},
});
