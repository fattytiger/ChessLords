const i18n = require('LanguageData');
cc.Class({
    extends: cc.Component,
    properties: {
        
    },
    ctor: function() {
     
      this.language = {}
     
      
    },
    initData:function(language1,language2,language3,language4,language5){

        for (const key in language1) {
            if (language1.hasOwnProperty(key)) {
                const element = language1[key]
                this.language[key] = element;
            }
        }
        for (const key in language2) {
            if (language2.hasOwnProperty(key)) {
                const element = language2[key];
                this.language[key] = element;
            }
        }
        for (const key in language3) {
            if (language3.hasOwnProperty(key)) {
                const element = language3[key];
                this.language[key] = element;
            }
        }
        for (const key in language4) {
            if (language4.hasOwnProperty(key)) {
                const element = language4[key];
                this.language[key] = element;
            }
        }
        for (const key in language5) {
            if (language5.hasOwnProperty(key)) {
                const element = language5[key];
                this.language[key] = element;
            }
        }
    },
    getLangueForID:function(ID){
       
        if(this.language.hasOwnProperty(ID)){
            if(cc.zz.LoginData.getLanguage()=="cn"){    
                return this.language[ID].cn_text;//[+'_text'];
            }else{
                return this.language[ID].en_text;//[+'_text'];
            }
        }
       return ID
    }
})

