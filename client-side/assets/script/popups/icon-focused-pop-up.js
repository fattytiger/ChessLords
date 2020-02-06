const EventType = require("EventType");
cc.Class({
    extends: cc.Component,

    properties: {
        titleLabel: {
            default:null,
            type:cc.Label
        },
        iconSprite: {
            default:null,
            type:cc.Sprite
        },
        paragraphLabel: {
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
        if (popupParams.title != undefined && popupParams.title.length > 0) {
            this.titleLabel.string = cc.zz.TableDataManage.Language.getLangueForID(popupParams.title);
            this.titleLabel.node.active = true;
        }
        else {
            this.titleLabel.node.active = false;
        }

        if (popupParams.normal_paragraph.length > 0) {
            if (data.normal_paragraph != undefined) {
                this.paragraphLabel.string = data.normal_paragraph;    
            }
            else {
                this.paragraphLabel.string = cc.zz.TableDataManage.Language.getLangueForID(popupParams.normal_paragraph);
            }
            
            this.paragraphLabel.node.active = true;
        }
        else {
            this.paragraphLabel.node.active = false;
        }

        if (popupParams.icon.length > 0) {
            if (data.icon != undefined) {
                this.iconSprite.spriteFrame = cc.loader.getRes(data.icon, cc.SpriteFrame);
            }
            else {
                this.iconSprite.spriteFrame = cc.loader.getRes(popupParams.icon, cc.SpriteFrame);
            }
            this.iconSprite.node.active = true;
            if (popupParams.action != undefined) {
                if (popupParams.action == 'rotate') {
                    this.iconSprite.node.runAction(cc.repeatForever(cc.rotateBy(2, 360)))
                }
            }
            else {
                this.iconSprite.node.setRotation(0);
            }
            // this.iconSprite.sizeMode = cc.Sprite.SizeMode.RAW;
            // this.iconSprite.node.setContentSize(new cc.size(90, 90));
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
    },
    stopAllActions: function() {
        this.iconSprite.node.stopAllActions();
    }
});
