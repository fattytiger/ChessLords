
cc.Class({
    extends: cc.Component,

    properties: {
        backgroundLayer: {
            default:null,
            type:cc.Node
        },
        simplePopup: {
            default:null,
            type:cc.Node
        },
        iconCentricPopup: {
            default:null,
            type:cc.Node
        },
        progressivePopup: {
            default:null,
            type:cc.Node
        }
    },

    onLoad () {
    },
    start () {},

    showNotification : function ( data ) {
        if (!this.isShowingPopup()) {
            this.hideAllNode();
            this.Loading.active = false;
            this.Notification.active = true;
            var notView = this.notificationView.getComponent("NotificationView");
            notView.InitData(data.title,data.content,data.icon);
        }
    },
    hideAllNode:function() {
        if (this.simplePopup.active) {
            var script = this.simplePopup.getComponent('simple-pop-up');
            script.stopAllActions();
        }
        
        if (this.iconCentricPopup.active) {
            var script = this.iconCentricPopup.getComponent('icon-focused-pop-up');
            script.stopAllActions();    
        }

        if (this.progressivePopup.active) {
            var script = this.progressivePopup.getComponent('progressive-pop-up');
            script.stopAllActions();
        }
        
        this.simplePopup.active = false;
        this.iconCentricPopup.active = false;
        this.progressivePopup.active = false;
    },
    hideAnyPopup:function() {
        this.hideAllNode();
        this.node.active = false;
        if (this.callback != undefined) {
            this.callback();
            this.callback = undefined;
        }
    },
    show: function(type, data, callback) {
        this.callback = callback;
        if (cc.zz.Popup.isValidPopupType(type)) {
            let popupParams = cc.zz.Popup.getPopupParams(type);
            console.log("Show popup "+type);

            if (this.isShowingPopup()) {
                console.log("Already some popup is here");
                if ( popupParams.is_important != undefined && !popupParams.is_important ) {
                    console.log("Popup "+type+" is not important!");
                    if (this.previous_important != undefined && this.previous_important) { 
                        console.log("Previous popup is important, therefore skip "+type);
                        return;
                    }
                    else if (this.previous_important == undefined) {
                        console.log("Previous is not important, so that was not even marked. Skip " + type);
                        return;
                    }
                }
            }
            console.log("Mark "+type+" as a new block");
             this.previous_important = popupParams.is_important;

            if (popupParams.view_type == cc.zz.Popup.VIEW_TYPE.SIMPLE) {
                this.showSimple(popupParams, data);
            }
            else if (popupParams.view_type == cc.zz.Popup.VIEW_TYPE.ICONCENTRIC) {
                this.showIconcentric(popupParams, data);
            }
            else if (popupParams.view_type == cc.zz.Popup.VIEW_TYPE.PROGRESSIVE) {
                this.showProgressive(popupParams, data);
            }
            else {
                cc.error(popupParams.view_type + " has not been implemented yet!");
            }
        }
        else {
            cc.log(type+" is not a valid popup type");
        }
    },
    openPopupUrl: function() {},
    showSimple: function(popupParams, data) {
        this.hideAllNode();
            
        let script = this.simplePopup.getComponent('simple-pop-up');
        script.InitData(popupParams, data);

        this.node.active = true;
        this.backgroundLayer.active = true;
        this.simplePopup.active = true;
    },
    showIconcentric: function(popupParams, data) {
        if (this.isShowingPopup()) {
            cc.warn("Iconcentric popups can not interrupt already showed popups!");
            return;
        }
        let script = this.iconCentricPopup.getComponent('icon-focused-pop-up');
        script.InitData(popupParams, data);

        this.hideAllNode();
        this.node.active = true;
        this.backgroundLayer.active = true;
        this.iconCentricPopup.active = true;
    },
    showProgressive: function(popupParams, data) {
        this.hideAllNode();
        // if (this.isShowingPopup()) {
        //     cc.warn('"Progressive popup cannot be shown, while other popup being active on scene." said Medet Ahmetson');
        //     return;
        // }

        let script = this.progressivePopup.getComponent('progressive-pop-up');
        script.InitData(popupParams, data);

        this.node.active = true;
        this.backgroundLayer.active = true;
        this.progressivePopup.active = true;
    },
    isShowingPopup: function() {
        return ( this.backgroundLayer.active && this.node.active );
    }
});
