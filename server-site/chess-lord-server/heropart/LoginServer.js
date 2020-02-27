const COMMANDS = require('../commands')
const heroOption = require('../databaseOption/HeroOptions')
const sendData = require('../common/SendData')
const allclients = require('../handler/allclients')


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
        console.log(client)
        let hero_id = parameters[0]
        let hero_name = parameters[1]

        //judege the error parameter
        if (!hero_id || !hero_name) {
            //The data which you need to send
            let messageData = `please login with COCOS wallet`
            sendData.sendDataToclient(client, COMMANDS.ERROR_COMMAND, messageData)
            return
        }

        client.hero = hero_id
        console.log(client.hero)

        heroOption.findHeroByHeroID(hero_id)
            .then((document) => {
                //if the document does not exist
                if (document === null) {
                    heroOption
                        .createHeroByHeroID(hero_id, hero_name, client)
                        .then((document) => {
                            sendData.sendDataToclient(client, COMMANDS.HERO_LOGIN, document)
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
                            sendData.sendDataToclient(client, COMMANDS.HERO_LOGIN, document)
                        })
                }
            })
    },

    ready: function (client, parameters) {
        //find another ready player ,if find send into the game
        let heroID = parameters[0]

        console.log()

        //find the ready hero
        heroOption.findAnotherReadyHero().then(documents => {
            console.log(documents)
            let heroAccount = documents.length
            if (heroAccount === 0) {
                heroOption.updateHeroReadyByHeroID(heroID, true)
                    .then((res) => {
                        console.log(res)
                        if (res.ok === 1) {
                            sendData.sendDataToclient(client, COMMANDS.HERO_READY, COMMANDS.TIP_MESSAGE.WAITTING_PLAYER)
                        }
                    })
                return
            }
            //have been find ,into the game
            if (heroAccount !== 0) {
                console.log('have another one', documents)
                this.onIntoGame(heroID, documents[0].hero_id)
            }
        })
    },

    into: function (self_hero_id, other_hero_id) {
        //get all clients
        let selfClient = allclients.getClientByHeroID(self_hero_id)
        let otherClient = allclients.getClientByHeroID(other_hero_id)
        let message = `aaaa`
        console.log(otherClient, 'otherclient')
        sendData.sendDataToclient(selfClient, COMMANDS.INTO_GAME, message)
        sendData.sendDataToclient(otherClient, COMMANDS.INTO_GAME, message)
    },

    onIntoGame: function (self_hero_id, other_hero_id) {
        //set the self hero id and other other id fields
        heroOption.updateHeroReadyByHeroID(self_hero_id, false)
            .then(() => {
                return heroOption.updateHeroReadyByHeroID(other_hero_id, false)
            }).then(() => {
                //set the into game fields
                return heroOption.updateHeroIngameByHeroID(self_hero_id, true)
            }).then(() => {
                return heroOption.updateHeroIngameByHeroID(other_hero_id, true)
            }).then(() => {
                return heroOption.updateHeroCampByHeroID(self_hero_id, 'blue')
            }).then(() => {
                return heroOption.updateHeroCampByHeroID(other_hero_id, 'red')
            }).then(() => {
                let clients = allclients.getAllClient()
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

    /**
     * @param {Object} client the instance of the client
     * **/
    heroCloseServer: function (client) {
        let heroID = client.hero
        heroOption.updateHeroLoginByHeroID(heroID, false)
            .then(() => {
                return heroOption.updateHeroReadyByHeroID(heroID, false)
            }).then(() => {
                heroOption.updateHeroClientByHeroID(heroID, null)
            })

    }
}