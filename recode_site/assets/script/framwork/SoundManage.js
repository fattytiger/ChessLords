
cc.Class({
    extends: cc.Component,

    properties: {

        music:true,
        sfx:true,
    },
    start () {
        
    },
    settingInfo:function(music,sfx){
        this.music = music;
        this.sfx = sfx;
    },
    onPlayEffect:function(effect){
        if(this.sfx){
            this.soundeffect = cc.loader.getRes(`sound/${effect}`,cc.AudioClip)
            cc.audioEngine.playEffect(this.soundeffect,false)
        }
    },
    onPlaySound:function(effect,loop,value){
    
        this.sound = cc.loader.getRes("sound/"+effect,cc.AudioClip)
        cc.audioEngine.play(this.sound,loop,value)
    },
    //默认按钮点击音效
    basicclickSound:function(){
        if(this.sfx){
            this.BtnEffect = cc.loader.getRes("sound/basic_button_click",cc.AudioClip)
            cc.audioEngine.playEffect(this.BtnEffect,false)
        }
    },
    //世界背景音乐
    onPlayWorldBgSound:function(){
        cc.audioEngine.stopMusic()
        this.bgsound = cc.loader.getRes("sound/BL-BG-Piece-2-Master_1",cc.AudioClip)
        cc.audioEngine.playMusic(this.bgsound,true,0.5)
        
    },
    //战斗背景音乐
    onPlayFightBgSound:function(){
        cc.audioEngine.stopMusic()
        this.bgsound = cc.loader.getRes("soundeffect/BL-Battle_Loop_Final",cc.AudioClip)
        cc.audioEngine.playMusic(this.bgsound,true,0.5)
    },
    //战斗动画背景音乐
    onPlayFightSound:function(){
        cc.audioEngine.stopMusic()
        this.bgsound = cc.loader.getRes("soundeffect/BL-BG-Piece-6-Master_1",cc.AudioClip)
        cc.audioEngine.playMusic(this.bgsound,true,0.5)
    },
    onPlayMarketBgSound:function(){
        cc.audioEngine.stopMusic()
        this.bgsound = cc.loader.getRes("soundeffect/BL-BG-Piece-4-Master_1",cc.AudioClip)
        cc.audioEngine.playMusic(this.bgsound,true,0.5)
    },
    //选择英雄背景音乐
    onPlayHeroBgSound:function(){
        if(this.sfx){
            cc.audioEngine.stopMusic()
            this.bgsound = cc.loader.getRes("soundeffect/BL-BG-Piece-5-Master_1",cc.AudioClip)
            cc.audioEngine.playMusic(this.bgsound,true,0.5)
        }
    },
    //主界面背景
    onPlayMainBgSound:function(){
        cc.audioEngine.stopMusic()
        this.bgsound = cc.loader.getRes("soundeffect/BL-BG-Piece-8-Master_1",cc.AudioClip)
        cc.audioEngine.playMusic(this.bgsound,true,0.5)
    },
    //城市背景
    onPlayCityBgSound:function(){
        cc.audioEngine.stopMusic()
        this.bgsound = cc.loader.getRes("soundeffect/market_ambience_loop",cc.AudioClip)
        cc.audioEngine.playEffect(this.bgsound,true,0.5)
    },
    onPlayBgSound:function(){
        
        if(!cc.audioEngine.isMusicPlaying() && this.music){
            let soundID = Math.ceil(Math.random()*7)+1;
            this.bgsound = cc.loader.getRes("soundeffect/BL-BG-Piece-"+soundID+"-Master_1",cc.AudioClip)
            cc.audioEngine.playMusic(this.bgsound,false,0.5)
        }
    },
    stopAllEffects:function(bool){
        this.sfx = bool; 
    },
    stopAllMusics:function(bool){
        this.music = bool;
        if(this.music){
            //cc.audioEngine.resumeAllEffects();
            this.onPlayMainBgSound();
        }else{
            //cc.audioEngine.stopAllEffects();
            cc.audioEngine.stopMusic()
        }
    },
    // update (dt) {},
});
