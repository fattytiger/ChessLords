cc.Class({
    extends: cc.Component,

    properties: {
        heroSprite:{
            default:null,
            type:cc.Sprite
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.heroSprite.node.on(cc.Node.EventType.MOUSE_DOWN, this.mouseClick, this)
    },

    start () {

    },

    mouseClick(event) {
        if (event.getButton() == cc.Event.EventMouse.BUTTON_LEFT) {
            this.mouseLeftClick()
        }

        if (event.getButton() == cc.Event.EventMouse.BUTTON_RIGHT) {
            this.mouseRightClick()
        }
    },

    mouseLeftClick:function(){
        console.log('left click')
    },
    mouseRightClick:function(){
        console.log('right click');
    },

    // update (dt) {},
    initConfig:function(){        
        this.blocksManager = cc.Canvas.instance.node.getComponent('blocks-manager')
    },

    initOriginData:function(hero){
        console.log(hero)
        this.initConfig()

        this.heroID = hero.hero_id
        this.tile_from = parseInt(hero.tile_from)
        this.tile_to   = parseInt(hero.tile_to)

        this.setHeroLocation()
    },

    setHeroLocation:function(){
        let pos = this.blocksManager.getBlockPositionByID(this.tile_from)
        this.node.x = pos.x
        this.node.y = pos.y
    }
});
