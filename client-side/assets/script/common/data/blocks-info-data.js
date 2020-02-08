

/****************************************************************************
 Copyright (c) 2019.    Arctic Seascape
 Author                 Tiger Yang (Front-end@blocklords.io)

 https://www.blocklords.io/

Get block info from this file.

 ****************************************************************************/
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    ///////////////////////////////////////////////////////////////////////////////
    // LIFE-CYCLE CALLBACKS:
    ///////////////////////////////////////////////////////////////////////////////

    // onLoad () {},

    //start () {},

    // update (dt) {},

    ctor: function() {
        this.blocksData = {}
    },

    ///////////////////////////////////////////////////////////////////////////////
    // Public Methods
    ///////////////////////////////////////////////////////////////////////////////


    /**
     * !#en init the table
     * !#zh 
     * @method initData
     * @param {JSON} blocksData block data
     */
    initData(blocksData){
        this.blocksData = blocksData
    },

    /**
     * !#en get blocks table
     * !#zh 
     * @method getBlocksTable
     */
    getTabelData(){
        return this.blocksData
    },

    /**
     * !#en get block from this table
     * !#zh 
     * @method getBlock
     */
    getBlockData(index){
        if(this.blocksData[index]){
            return this.blocksData[index]
        }
    }

});
