
const EventType = require('EventType')
cc.Class({
    extends: cc.Component,

    properties: {

        block: {
            default: null,
            type: cc.Prefab
        },
        background: {
            default: null,
            type: cc.Node
        }

    },

    onEnable: function () {

    },
    onDisable: function () {

    },

    ctor: function () {

        this.BLOCK_WIDTH = 200,

        this.HIGHLIGHT_DIRECTION = {
            "UP": "UP",
            "DOWN": "DOWN",
            "LEFT": "LEFT",
            "RIGHT": "RIGHT"
        }
    },

    start: function () {
        this.blocksNodeArray = []
        this.blocksScriptArray = []
        this.initBlocksAtBegining((function(){
            let heroID = cc.zz.LoginData.getHeroID()
            cc.zz.net.send(cc.zz.net.constants.MAP_DATA,[heroID])
        }).bind(this))
    },

    onLoad: function () {

    },

    initBlocksAtBegining: function (callback) {

        let blockNum = 0

        let maxCloum = 20

        for (let list = 12; list > 0; list--) {

            for (let cloumn = 0; cloumn < maxCloum; cloumn++) {

                blockNum++

                let block = cc.instantiate(this.block)

                let tableInfo = cc.zz.TableDataManage.BlocksData.getBlockData(blockNum)

                if (tableInfo == null) {
                    console.warn(`can not find table info in blocks data`)
                    continue
                }

                let blockScript = block.getComponent('block')

                if (blockScript === null) {
                    console.warn(`can not find the block script`);
                    continue
                }
                //init the block origin data
                blockScript.initOriginData(tableInfo)

                //set block position
                block.setPosition((cloumn - 10) * this.BLOCK_WIDTH, (list - 7) * this.BLOCK_WIDTH)

                //push block instance into the blocksNodeArray
                this.blocksNodeArray.push(block)

                //push block script into the blocksScriptArray
                this.blocksScriptArray.push(blockScript)

                this.background.addChild(block)
            }

        }
        callback()
    },

    getBlockPositionByID: function (id) {
        let blockID = parseInt(id)
        let position = {}
        position.x = this.blocksNodeArray[blockID - 1].x
        position.y = this.blocksNodeArray[blockID - 1].y
        return position
    },
});
