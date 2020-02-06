const EventType = require("EventType");
cc.Class({
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
        smallParagraphLabel: {
            default:null,
            type:cc.Label
        },
        linkLabel: {
            default: null,
            type:cc.Label
        },
        goButton: {
            default: null,
            type:cc.Button
        },
    },
    start () { },

    InitData:function(popupParams, data) {
            if (popupParams.title.length > 0) {
                this.titleLabel.string = popupParams.title;
                this.titleLabel.node.active = true;
            }
            else {
                this.titleLabel.node.active = false;
            }

            if (popupParams.normal_paragraph.length > 0) {
                this.normalParagraphLabel.string = cc.zz.TableDataManage.Language.getLangueForID(popupParams.normal_paragraph);
                this.normalParagraphLabel.node.active = true;
            }
            else {
                if (data.normal_paragraph != undefined && data.normal_paragraph.length > 0) {
                    this.normalParagraphLabel.string = cc.zz.TableDataManage.Language.getLangueForID(data.normal_paragraph);
                    this.normalParagraphLabel.node.active = true;
                }
                else {
                    this.normalParagraphLabel.node.active = false;
                }
            }

            if (popupParams.small_paragraph.length > 0) {
                this.smallParagraphLabel.string = cc.zz.TableDataManage.Language.getLangueForID(popupParams.small_paragraph);
                this.smallParagraphLabel.node.active = true;
            }
            else {
                if (data.link  != undefined && data.link.length > 0 && popupParams.button_enabled) {
                    this.smallParagraphLabel.string = "\n";
                    this.smallParagraphLabel.node.active = true;
                } 
                else { 
                    this.smallParagraphLabel.string = "\n\n";
                    this.smallParagraphLabel.node.active = true;
                }
            }

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

            if (data.link != undefined && data.link.length > 0) {
                // this.linkLabel.string = popupParams.link + data.link;
                this.linkLabel.string = 'txid: ' + data.link;
                this.linkLabel.node.active = true;
            }
            else {
                if (popupParams.small_paragraph.length > 0) {
                    this.linkLabel.string = "\n\n";
                    this.linkLabel.node.active = true;
                } 
                else {
                    this.linkLabel.node.active = false;
                }
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
    },
    stopAllActions: function() {
        this.iconSprite.node.stopAllActions();
    }
});
