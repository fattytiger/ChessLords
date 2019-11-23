module.exports = cc.Class({
    extends: cc.Component,

    properties: {},

    loadMapSpirte(node,source){
        cc.loader.loadRes(`image/Map/${source}`,cc.SpriteFrame, function(err,sprite) {
            if(err){
                console.log(err)
            }else{
                let beforeSprite = node.getComponent(cc.Sprite)
                beforeSprite.spriteFrame = sprite
            }
        })
    }



});
