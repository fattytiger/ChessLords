import { resolve } from "dns";
import { rejects } from "assert";
import { type } from "os";
const baseURL = `http://127.0.0.1:3000/bcx/login`
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    loginBCX:function(data){
      
    },

    sendLoginData:function(){
        //let data = 'aaa'
        let promise = new Promise((resolve,rejects) => {
            let xmlHttp = new XMLHttpRequest()
            xmlHttp.onreadystatechange = function(){
                if(xmlHttp.readyState === 4){
                    if(xmlHttp.status === 200)
                    console.log(xmlHttp.responseText)
                    resolve
                }else{
                    rejects
                }
            }
            xmlHttp.open('GET',baseURL)//baseURL:    http://127.0.0.1:3000/bcl
            xmlHttp.setRequestHeader('Content-type','application/json')
            xmlHttp.send()
        })
        return promise
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
