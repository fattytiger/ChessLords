const COMMANDS = require('../commands')
const heroOption = require('../databaseOption/HeroOptions')
const ClientManager = require('../handler/ClientManager')


module.exports = {
    /**
     * 
     * @method login  Trigger the HERO_LOGIN_SERVER event
     * @param {Array} parameters 2 elements ,the details as follow commands
     * @param {String} hero_id
     * @param {String} hero_name    
     * 
     * **/
    login: function (client, parameters) {
        let hero_id = parameters[0]
        let hero_name = parameters[1]

        //judege the error parameter
        if (!hero_id || !hero_name) {
            //The data which you need to send
            let messageData = `please login with COCOS wallet`
            ClientManager.sendSimpleData(client, COMMANDS.ERROR_COMMAND, messageData)
            return
        }

        client.hero = hero_id

        heroOption.findHeroByHeroID(hero_id)
            .then((document) => {
                //if the document does not exist
                if (document === null) {
                    heroOption
                        .createHeroByHeroID(hero_id, hero_name, client)
                        .then((document) => {
                            ClientManager.sendSimpleData(client, COMMANDS.HERO_LOGIN, document)
                        })
                }
                //update hero login status when the database already have the hero
                if (document !== null) {
                    //update hero login status
                    heroOption.updateHeroLoginByHeroID(hero_id, true)
                        .then(() => {
                            //update hero client
                            return heroOption.updateHeroClientByHeroID(hero_id, client)
                        }).then(() => {
                            //find hero 
                            return heroOption.findHeroByHeroID(hero_id)
                        }).then((document) => {
                            this.countLoginPlyers()
                            ClientManager.sendSimpleData(client, COMMANDS.HERO_LOGIN, document)
                        })
                }
            })
    },


    //calculate the logined players
    countLoginPlyers:function(){
        heroOption.findLoginedHeros().then(players => {
            let count = players.length
            ClientManager.sendBroadCastData(COMMANDS.SHOW_HERO_LOGIN_NUMBER,count)
        })
    },

    //calculate the ready players
    countReadyPlayers:function(){
        heroOption.findReadyHeroes().then(players => {
            let count = players.length
            ClientManager.sendBroadCastData(COMMANDS.SHOW_HERO_READY_NUMBER,count)
        })
    },


    ready: function (client, parameters) {
        //find another ready player ,if find send into the game
        let heroID = parameters[0]
        //find the ready hero
        heroOption.findAnotherReadyHero().then(documents => {
            let heroAccount = documents.length
            if (heroAccount === 0) {
                heroOption.updateHeroReadyByHeroID(heroID, true)
                    .then((res) => {
                        //not find another ready player
                        this.countReadyPlayers()
                        ClientManager.sendSimpleData(client, COMMANDS.HERO_READY, COMMANDS.TIP_MESSAGE.WAITTING_PLAYER)
                    })
                return
            }
            //have been find ,into the game
            if (heroAccount !== 0) {
                //find another ready player
                this.onIntoGame(heroID, documents[0].hero_id)
            }
        })
    },
    onIntoGame: function (self_hero_id, other_hero_id) {
        //set the self hero id and other other id fields
        heroOption.updateHeroReadyByHeroID(self_hero_id, false)
            .then(() => {
                //set the into game fields
                return heroOption.updateHeroIngameByHeroID(self_hero_id, true)
            }).then(() => {
                return heroOption.updateHeroIngameByHeroID(other_hero_id, true)
            }).then(() => {
                return heroOption.updateHeroCampByHeroID(self_hero_id, 'blue')
            }).then(() => {
                return heroOption.updateHeroCampByHeroID(other_hero_id, 'red')
            }).then(() => {
                //send the ready player amount
                this.countReadyPlayers()
                let clients = ClientManager.getAllClient()
                let findcont = 0
                for (let i = 0; i < clients.length; i++) {
                    let client = clients[i]
                    //set self as blue camp
                    if (client.hero === self_hero_id) {
                        findcont++
                        //have dived the camp
                        if (findcont == 2) {
                            this.into(self_hero_id, other_hero_id)
                            return
                        }
                    }
                    //set other as red camp
                    if (client.hero === other_hero_id) {
                        findcont++
                        //have dived the camp
                        if (findcont == 2) {
                            this.into(self_hero_id, other_hero_id)
                            return
                        }
                    }
                }
            })
    },
    into: function (self_hero_id, other_hero_id) {
        //save anamy info
        heroOption.updateHeroAnamyByHeroID(self_hero_id, other_hero_id)
            .then(() => {
                return heroOption.updateHeroAnamyByHeroID(other_hero_id, self_hero_id)
            })
            .then(() => {
                //get all clients
                let selfClient = ClientManager.getClientByHeroID(self_hero_id)
                let otherClient = ClientManager.getClientByHeroID(other_hero_id)
                let message = `player into the game`
                ClientManager.sendSimpleData(selfClient, COMMANDS.INTO_GAME, message)
                ClientManager.sendSimpleData(otherClient, COMMANDS.INTO_GAME, message)
            })
    },
    /**
     * @param {Object} client the instance of the client
     * **/
    heroCloseServer: function (client) {
        let heroID = client.hero
        heroOption.updateHeroLoginByHeroID(heroID, false)
            .then(() => {
                return heroOption.updateHeroReadyByHeroID(heroID, false)
            }).then(() => {
                return heroOption.updateHeroClientByHeroID(heroID, null)
            }).then(() => {
                ClientManager.sendBroadCastData(COMMANDS.CLOSE_CONNECTION,heroID)
            })

    }
}