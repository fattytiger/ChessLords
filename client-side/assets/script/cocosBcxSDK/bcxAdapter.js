//cocos配置
var _configParams = {
    ws_node_list: [{
        url: "ws://39.106.126.54:8049",
        name: "COCOS3.0节点2"
    }],
    networks: [{
        core_asset: "COCOS",
        chain_id: '7d89b84f22af0b150780a2b121aa6c715b19261c8b7fe0fda3a564574ed7d3e9'
    }],
    faucetUrl: 'http://47.93.62.96:8041',
    auto_reconnect: true,
    worker: false,
    real_sub: true,
    check_cached_nodes_data: true,
};



let BCXAdpater = cc.Class({
    // onLoad () {},

    start() {
        //console.info("window=1=",window.BcxWeb);
    },

    initSDK(callback) {
        this.startContract = "contract.chesslordtest"; //合约名称
        if (window.BcxWeb) {
            this.bcl = window.BcxWeb;
            if (callback) {
                callback(true);
            }
        } else {
            let self = this
            self.bcl = new BCX(_configParams);
            Cocosjs.plugins(new CocosBCX())
            //connect pc-plugin between sdk
            Cocosjs.cocos.connect('My-App').then(connected => {
                if (!connected) {
                    self.checkWindowBcx(function (is_success) {
                        if (is_success) {
                            if (callback) {
                                callback(true)
                            }
                        } else {
                            callback(false)
                        }
                    })
                    return false
                }
                const cocos = Cocosjs.cocos
                self.bcl = cocos.cocosBcx(self.bcl);
                if (self.bcl) {
                    if (callback) {
                        callback(true);
                    }
                } else {
                    if (callback) {
                        callback(null);
                    }
                }
            }).catch(function (e) {
                console.log("connect error---" + JSON.stringify(e))
            })

        }
    },
    checkWindowBcx(callback) {
        let check_count = 0
        let self = this
        let sdk_intervral = setInterval(function () {
            if (window.BcxWeb) {
                self.bcl = window.BcxWeb
                if (callback) {
                    callback(true)
                }
                clearInterval(sdk_intervral);
            }

            if (check_count >= 3) {
                clearInterval(sdk_intervral);
                if (callback) {
                    callback(false)
                }
            }
            check_count = check_count + 1

        }, 1000);
    },

    login(callback) {
        if (this.bcl) {
            try {
                this.bcl.getAccountInfo().then(res => {
                    this.bcl.account_name = res.account_name
                    if (callback) {
                        callback(res);
                    }
                })
            } catch (e) {
                if (this.bcl.account_name) {
                    if (callback) {
                        callback(this.bcl.account_name);
                    }
                }
            }

        }
    },



    callSmartContract:function(contract_name,function_name,parameter,callback){
        this.bcl.callContractFunction({
            nameOrId:`${contract_name}`,
            functionName:`${function_name}`,
            valueList:parameter
        }).then((res) => {
            callback(res)
        }).catch((err) => {
            console.log(err)
        })
    },

    chesslordGameStart:function(callback){
        let functionName = 'transfer',
        parameter = [3,'COCOS',true]
        this.callSmartContract(this.startContract,functionName,parameter,function(result){
            callback(result)
        })
    },


    transfer:function(callback){
        this.bcl.transferAsset({
            fromAccount:this.account_name,
            toAccount: 'panghu123',
            amount: 3,
            assetId: 'COCOS',
            feeAssetId: 'COCOS',
            memo: 'transfer',
            onlyGetFee: false,
        }).then(function (res) {
            if(res.code ===1){
                callback(res)
            }else {
                callback(res)
            }
        }).catch(err => {
            console.info('error=',err)
        })
    },
});

let bcxAdapter = new BCXAdpater();
bcxAdapter.start();
module.exports = bcxAdapter;