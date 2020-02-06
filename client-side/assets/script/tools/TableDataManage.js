cc.Class({
    ctor:function(){
        this.jsonArr = {}
        // var BlocksData = require('blocks-info-data')
        // this.BlocksData = new BlocksData()

        let Language = require('Language');
        this.Language = new Language()
    },
    initTableList:function(table){
        for(var key in table){
            this.jsonArr[table[key].name] = table[key].json
        }
        // this.BlocksData.initData(this.jsonArr.block_blocks_info)
        this.Language.initData(this.jsonArr.language_first_name,this.jsonArr.language_last_name,this.jsonArr.language_item_name,this.jsonArr.language_item_des,this.jsonArr.language_neo_ui); this.Language.initData(this.jsonArr.language_first_name,this.jsonArr.language_last_name,this.jsonArr.language_item_name,this.jsonArr.language_item_des,this.jsonArr.language_neo_ui);
    },
})