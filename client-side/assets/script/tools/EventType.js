var EventType = {}

const LOAD_ISOVER = "LOAD_ISOVER"
const POP_UP = "POP_UP"                         
const LOAD_ATLAS_RESOURCE = "LOAD_ATLAS_RESOURCE"           //bind with in sprite-manger.js
const CHOOSE_TROOP_FLAG = "CHOOSE_TROOP_FLAG"           //bind with in hero-manager.js
const REQUEST_TROOP_MOVE = "REQUEST_TROOP_MOVE"           //bind with in hero-manager.js
const SHOW_ATTACK_AREA = "SHOW_ATTACK_AREA"                 //bind with in hero-manager.js not use
const HIDE_ATTACK_AREA = "HIDE_ATTACK_AREA"                 //bind with in hero-manager.js not use

const REQUEST_FIGHT_OTHER = "REQUEST_FIGHT_OTHER"               //bind with in fight-manager.js
const REQUEST_FIGHT_BASE = "REQUEST_FIGHT_BASE"                 //bind with in fight-manager.js

const GET_ANIMATION_NAME = "GET_ANIMATION_NAME"             //bind with in animation-manager.js
const RENDER_CONNECTION_HERO = "RENDER_CONNECTION_HERO"     //bind with in hero-manager.js
const RENDER_CONNECTION_BASE = "RENDER_CONNECTION_BASE"     //bind with in building-manager.js


module.exports = {
    EventType:EventType,
    LOAD_ISOVER:LOAD_ISOVER,
    POP_UP:POP_UP,
    LOAD_ATLAS_RESOURCE:LOAD_ATLAS_RESOURCE,
    CHOOSE_TROOP_FLAG:CHOOSE_TROOP_FLAG,
    REQUEST_TROOP_MOVE:REQUEST_TROOP_MOVE,
    SHOW_ATTACK_AREA:SHOW_ATTACK_AREA,
    HIDE_ATTACK_AREA:HIDE_ATTACK_AREA,

    REQUEST_FIGHT_OTHER:REQUEST_FIGHT_OTHER,
    REQUEST_FIGHT_BASE:REQUEST_FIGHT_BASE,
    
    GET_ANIMATION_NAME:GET_ANIMATION_NAME,
    RENDER_CONNECTION_HERO:RENDER_CONNECTION_HERO,
    RENDER_CONNECTION_BASE:RENDER_CONNECTION_BASE

}