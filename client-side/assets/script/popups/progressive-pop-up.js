const EventType = require("EventType");
cc.Class( {
    extends: cc.Component,

    properties: {
        iconSprite:{
            default:null,
            type:cc.Sprite
        },
        titleLabel: {
            default:null,
            type:cc.Label
        },
        normalParagraphLabel: {
            default:null,
            type:cc.Label
        },
        goButton: {
            default: null,
            type:cc.Button
        },
        bar: {
            default: null,
            type: cc.ProgressBar
        },
        barLabel: {
            default: null,
            type: cc.Label
        }
    },
    start () {  },
    InitData:function(popupParams, data) {
        this.data = data;   // custom data
        this.params = popupParams;
        this.steps = popupParams.steps.length + 1;      // + 1 as we count finish label too
        this.progress = 1;

        this.titleLabel.node.active = true;

        if (popupParams.icon.length > 0) {
            this.iconSprite.spriteFrame = cc.loader.getRes(popupParams.icon, cc.SpriteFrame);
            this.iconSprite.node.active = true;

            if (popupParams.action != undefined) {
                if (popupParams.action == 'rotate') {
                    this.iconSprite.node.runAction(cc.repeatForever(cc.rotateBy(2, 360)))
                }
            }
            else {
                this.iconSprite.node.setRotation(0);
            }
        }
        else {
            this.iconSprite.node.active = false;
        }

        if (popupParams.button_enabled) {
            this.goButton.node.active = true;
        }
        else {
            this.goButton.node.active = false;
        }

        if (popupParams.sound != undefined) {
            cc.zz.SoundManage.onPlayEffect(popupParams.sound);
       }

       this.showParagraph(this.params, this.progress);

       this.setBar();

       // set listeners for update or increase progress
        cc.zz.fire.on(EventType.UPDATE_POP_UP_PROGRESS, this.updateData.bind(this));
        cc.zz.fire.on(EventType.INCREMENT_POP_UP_PROGRESS, this.increaseProgress.bind(this));
        // cc.zz.fire.on(EventType.FINISH_POP_UP_PROGRESS, this.updateData.bind(this));
    },
    updateData: function(blockHeight) {
        this.showParagraph(this.params, this.progress, blockHeight.toString());
    },
    increaseProgress: function() {
        this.progress++;
        this.setBar();

        // finish the progress?
        if (this.progress >= this.steps) {
            this.goButton.node.active = true;
            this.titleLabel.node.active = true;
            this.titleLabel.string = this.params.finish_title;

            this.iconSprite.node.active = false;
            this.iconSprite.node.stopAllActions();

            if (this.params.finish_text.indexOf("label.") == 0) {
                this.normalParagraphLabel.string = cc.zz.TableDataManage.Language.getLangueForID(this.params.finish_text);
            }
            else {
                this.normalParagraphLabel.string = this.params.finish_text;
            }
        }
        else {
            this.showParagraph(this.params, this.progress);
        }
    },

    // Before showing each progress increase
    //  Send to server the message from player: wallet id, hero id, import or export, step #
    // After finishing of progress
    //  Send to server remove the progress
    // In the beginning when checks the loom for hero,
    //  Get transfer status from Server
    //  If transfer is import
    //      if transfer token step has been finished
    //          show popup
    //          increase the progress
    //          get address mapping
    //          check for loom gateway and then for hero balance
    //  if transfer is export
    //      if step is transfer to gateway or further 
    //          show popup
    //          increase progress
    //          get address mapping
    //          popup the withdraw
    //          change the configuration of popup

    showParagraph: function(popupParams, progress, postscriptum) {
        let index = progress - 1;

        if (popupParams.steps[index].title.length > 0) {
            this.titleLabel.string = popupParams.steps[index].title;
            this.titleLabel.node.active = true;
        }
        else {
            this.titleLabel.string = "";
        }

        if (popupParams.steps[index].msg.length > 0) {
            if (popupParams.steps[index].msg.indexOf("label.") == 0) {
                this.normalParagraphLabel.string = cc.zz.TableDataManage.Language.getLangueForID(popupParams.steps[index].msg);
            }
            else {
                this.normalParagraphLabel.string = popupParams.steps[index].msg;
            }
            if (postscriptum) {
                this.normalParagraphLabel.string = this.normalParagraphLabel.string + postscriptum;
            }
            this.normalParagraphLabel.node.active = true;
        }
        else {
            this.normalParagraphLabel.node.active = false;
        }
    },
    stopAllActions: function() {
        this.iconSprite.node.stopAllActions();

        cc.zz.fire.un(EventType.UPDATE_POP_UP_PROGRESS, this.updateData.bind(this));
        cc.zz.fire.un(EventType.INCREMENT_POP_UP_PROGRESS, this.increaseProgress.bind(this));
        // cc.zz.fire.un(EventType.FINISH_POP_UP_PROGRESS, this.updateData.bind(this));
    },
    setBar: function() {
        if (!this.steps || !this.progress) {
            return;
        }

        this.bar.progress = parseFloat((this.progress / this.steps).toFixed(2));
        this.barLabel.active = true;
        this.barLabel.string = this.progress+"/"+this.steps;
    }
});
