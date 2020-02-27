
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
        this.initBlocksAtBegining()
    },

    onLoad: function () {

    },

    initBlocksAtBegining: function () {

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
    },

    showMoveBlockHighlight: function (tile_id) {
        let tileID = parseInt(tile_id)
        let uperTileID = tileID - 40
        let downTileID = tileID + 40
        let rightTileID = tileID + 1
        let leftTileID = tileID - 1

        if (uperTileID > 1000 || uperTileID < 1) {
            console.warn(`uper tile was invalid`);
            uperTileID = tileID
        }

        if (downTileID > 1000 || downTileID < 1) {
            console.warn(`down tile was invalid`);
            downTileID = tileID
        }

        if (rightTileID > 1000 || rightTileID < 1) {
            console.warn(`right tile was invalid`);
            rightTileID = tileID
        }

        if (leftTileID > 1000 || leftTileID < 1) {
            console.warn(`right tile was invalid`);
            leftTileID = tileID
        }

        let ceBlock = this.getBlockScriptByID(tileID)
        let upBlock = this.getBlockScriptByID(uperTileID)
        let doBlock = this.getBlockScriptByID(downTileID)
        let riBlock = this.getBlockScriptByID(rightTileID)
        let leBlock = this.getBlockScriptByID(leftTileID)

        if (upBlock.getRangeFlag() === false) {
            ceBlock.setMoveDirectionLight(this.HIGHLIGHT_DIRECTION.UP)
        }
        if (doBlock.getRangeFlag() === false) {
            ceBlock.setMoveDirectionLight(this.HIGHLIGHT_DIRECTION.DOWN)
        }
        if (riBlock.getRangeFlag() === false) {
            ceBlock.setMoveDirectionLight(this.HIGHLIGHT_DIRECTION.RIGHT)
        }
        if (leBlock.getRangeFlag() === false) {
            ceBlock.setMoveDirectionLight(this.HIGHLIGHT_DIRECTION.LEFT)
        }

    },

    hideMoveBlockHighlight: function (tile_id) {

        let tileID = parseInt(tile_id)
        let uperTileID = tileID - 40
        let downTileID = tileID + 40
        let rightTileID = tileID + 1
        let leftTileID = tileID - 1

        if (uperTileID > 1000 || uperTileID < 1) {
            console.warn(`uper tile was invalid`);
            uperTileID = tileID
        }

        if (downTileID > 1000 || downTileID < 1) {
            console.warn(`down tile was invalid`);
            downTileID = tileID
        }

        if (rightTileID > 1000 || rightTileID < 1) {
            console.warn(`right tile was invalid`);
            rightTileID = tileID
        }

        if (leftTileID > 1000 || leftTileID < 1) {
            console.warn(`right tile was invalid`);
            leftTileID = tileID
        }
        let ceBlock = this.getBlockScriptByID(tileID)
        let upBlock = this.getBlockScriptByID(uperTileID)
        let doBlock = this.getBlockScriptByID(downTileID)

        //clear his highlight area
        ceBlock.unHighLightMoveBlock()

        if (upBlock.getRangeFlag() === true) {
            upBlock.setDirectionHighlight(this.HIGHLIGHT_DIRECTION.DOWN)
        }

        if (doBlock.getRangeFlag() === true) {
            doBlock.setDirectionHighlight(this.HIGHLIGHT_DIRECTION.UP)
        }
    },




    highlightBuildBlock: function (wallet_address, tile_id) {
        let walletAddress = wallet_address

        let tileID = parseInt(tile_id)
        let uperTileID = tileID - 40
        let downTileID = tileID + 40
        let rightTileID = tileID + 1
        let leftTileID = tileID - 1

        if (uperTileID > 1000 || uperTileID < 1) {
            console.warn(`uper tile was invalid`);
            uperTileID = tileID
        }

        if (downTileID > 1000 || downTileID < 1) {
            console.warn(`down tile was invalid`);
            downTileID = tileID
        }

        if (rightTileID > 1000 || rightTileID < 1) {
            console.warn(`right tile was invalid`);
            rightTileID = tileID
        }

        if (leftTileID > 1000 || leftTileID < 1) {
            console.warn(`right tile was invalid`);
            leftTileID = tileID
        }

        let ceBlock = this.getBlockScriptByID(tileID)
        let upBlock = this.getBlockScriptByID(uperTileID)
        let doBlock = this.getBlockScriptByID(downTileID)
        let riBlock = this.getBlockScriptByID(rightTileID)
        let leBlock = this.getBlockScriptByID(leftTileID)

        if (upBlock.getConquerInfo() === null || upBlock.getConquerInfo() !== walletAddress) {

            ceBlock.setDirectionHighlight(walletAddress, this.HIGHLIGHT_DIRECTION.UP)
        }

        if (doBlock.getConquerInfo() === null || doBlock.getConquerInfo() !== walletAddress) {
            ceBlock.setDirectionHighlight(walletAddress, this.HIGHLIGHT_DIRECTION.DOWN)
        }

        if (riBlock.getConquerInfo() === null || riBlock.getConquerInfo() !== walletAddress) {
            riBlock.setDirectionHighlight(walletAddress, this.HIGHLIGHT_DIRECTION.LEFT)
        }

        if (leBlock.getConquerInfo() === null || leBlock.getConquerInfo() !== walletAddress) {
            ceBlock.setDirectionHighlight(walletAddress, this.HIGHLIGHT_DIRECTION.LEFT)
        }


    },

    reverseHighlightBuildBlock: function (wallet_address, tile_id) {

    },


    highLightHeroBlock: function (wallet_address, tile_to) {

        let tileID = parseInt(tile_to)
        let selfWallet = cc.zz.LoginData.getWallet()
        let tileToBlock = this.getBlockScriptByID(tileID)

        if (!tileToBlock) {
            console.warn(`can not find the tileID`);
            return
        }

        if (wallet_address === selfWallet) {
            tileToBlock.onHighlightSelfHeroBlock()
        }

        if (wallet_address !== selfWallet) {
            tileToBlock.onHighlightOtherHeroBlock()
        }
    },


    reverseHighlightHeroBlock: function (wallet_address, tile_from) {

        let tileID = parseInt(tile_from)
        let selfWallet = cc.zz.LoginData.getWallet()
        let tileFromBlock = this.getBlockScriptByID(tileID)

        if (!tileFromBlock) {
            console.warn(`can not find the tileID`);
            return
        }

        if (wallet_address === selfWallet) {
            tileFromBlock.unHighlightSelfHeroBlock()
        }

        if (wallet_address !== selfWallet) {
            tileFromBlock.unHighlightOtherHeroBlock()
        }
    },

    isOccupied: function (parm) {
        return parm === 1
    },

    onMapData: function (data) {

        //init the private variables at first
        this.selfConqueredTile = []
        this.otherConqueredTile = []

        if (data && data.conquered_tiles) {
            this.saveConqueredTiles(data.conquered_tiles)
        }
    },

    saveConqueredTiles: function (tiles) {

        let selfWallet = cc.zz.LoginData.getWallet()
        let tileArray = tiles

        for (let index = 0; index < tileArray.length; index++) {

            let id = tileArray[index].id
            let walletAddress = tileArray[index].occupier_address
            let elem = {}
            elem.id = id
            elem.wallet_address = walletAddress


            if (walletAddress == selfWallet) {
                this.selfConqueredTile.push(elem)
            }

            if (walletAddress != selfWallet) {
                this.otherConqueredTile.push(elem)
            }

            //show the block belongs to
            this.getBlockScriptByID(id).conqueredHighLight(walletAddress)
        }

    },



    getBlockPositionByID: function (id) {
        if (id == null) {
            console.warn(`the id of block you wanna to find is null`)
        }

        let _id = parseInt(id)

        if (typeof _id != 'number') {
            console.warn(`the type of _id was invalid`);
        }

        let _position = {}
        _position.x = this.blocksNodeArray[_id - 1].x
        _position.y = this.blocksNodeArray[_id - 1].y

        return _position

    },

    getBlockScriptByID: function (id) {
        if (id == null) {
            console.warn(`the id of block you wanna to find is null`)
        }

        let _id = parseInt(id)

        if (typeof _id != 'number') {
            console.warn(`the type of _id was invalid`);
        }
        return this.blocksScriptArray[_id - 1]
    },
});
