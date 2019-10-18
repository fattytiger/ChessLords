module.exports = cc.Class({
    extends: cc.Component,

    properties: {

    },

    loginData: function (username) {
        let sendData = {
            username,
            type: 'login',

        }
        return sendData
    },
    matchData: function () {
        let sendData = {
            type: 'match'
        }
        return sendData
    },

    bottomTroopMove: function (xdistance, ydistance) {

        let sendData = {
            type: 'bottomTroopMove',
            xdistance,
            ydistance
        }
        return sendData

    }


});
