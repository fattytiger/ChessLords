const view_types = {
    SIMPLE: 1,              // Simple popup: icon, label and go button.
    ICONCENTRIC: 2,         // Icon is too large comparing to simple popup
    OUT_OF_ITEMS: 3,        // Special popup used to show in first page
    PROGRESSIVE: 4
};

var Popup = cc.Class({
    ctor: function() {
        this.TYPE = {
            INVALID_ACTION:{
                id:"INVALID_ACTION",
                view_type:view_types.SIMPLE,
                icon:"common/icon_002",
                title:'',
                normal_paragraph:"You are fighting now",
                small_paragraph:"",
                link:undefined,
                has_custom_data:false,
                button_enabled:true,
                is_important:true
            },
            NO_SERVER_CONNECTION: {
                id: 'NO_SERVER_CONNECTION',
                view_type: view_types.SIMPLE,
                icon: 'common/icon_002',
                title: '',
                normal_paragraph: 'Could not connect to server.\nPlease restart the game!',
                small_paragraph: '',//'label.216', // label 216 - contact support if you have a question
                link: undefined,
                has_custom_data: false,
                button_enabled: false,
                is_important: true
            },
            FACING_SERVER_CONNECTION_ISSUE: {
                id: 'FACING_SERVER_CONNECTION_ISSUE',
                view_type: view_types.SIMPLE,
                icon: 'common/loading_01',
                action: 'rotate',
                title: '',
                normal_paragraph: 'Attempting to connect to server. Please wait...',
                small_paragraph: '',//'label.216', // label 216 - contact support if you have a question
                link: undefined,
                has_custom_data: false,
                button_enabled: false,
                is_important: false
            },
            RECONNECTED_TO_SERVER: {
                id: 'RECONNECTED_TO_SERVER',
                view_type: view_types.SIMPLE,
                icon: 'common/icon_001',
                title: 'Success',
                normal_paragraph: 'Reconnected to Server',
                small_paragraph: '',//'label.216', // label 216 - contact support if you have a question
                link: undefined,
                has_custom_data: false,
                button_enabled: true,
                is_important: false
            },
            WAITTING_ANOTHER_PLAYER:{
                id:"WAITTING_ANOTHER_PLAYER",
                view_type:view_types.SIMPLE,
                icon:'common/loading_01',
                action:'rotate',
                title:'',
                normal_paragraph:'Finding another player,please wait...',
                small_paragraph:'',
                link:undefined,
                has_custom_data:false,
                button_enabled:false,
                is_important:false
            },
            FIND_ANOTHER_PLAYER:{
                id:'FIND_ANOTHER_PLAYER',
                view_type:view_types.SIMPLE,
                icon:'common/icon_001',
                title:'Success',
                normal_paragraph:'Finding another player',
                small_paragraph:'',
                link:undefined,
                has_custom_data:false,
                button_enabled:true,
                is_important:false
            },
            WAITTING_ANAMY_RECONNECTION:{
                id:"WAITTING_ANAMY_RECONNECTION",
                view_type:view_types.SIMPLE,
                icon:'common/loading_01',
                action:'rotate',
                title:'',
                normal_paragraph:'Your anamy is reconnecting now...',
                small_paragraph:'',
                link:undefined,
                has_custom_data:false,
                button_enabled:false,
                is_important:false
            },
            WINNER_PANEL:{
                id:"WINNER_PANEL",
                view_type:view_types.SIMPLE,
                icon:'common/icon_001',
                title:'',
                normal_paragraph:'YOU WIN!',
                small_paragraph:'Click confirm can get your rewards',
                link:undefined,
                has_custom_data:false,
                button_enabled:true,
                is_important:true
            },
            LOSER_PANEL:{
                id:"LOSER_PANEL",
                view_type:view_types.SIMPLE,
                icon:'common/icon_002',
                title:'',
                normal_paragraph:'YOU lOSE!',
                small_paragraph:'',
                link:undefined,
                has_custom_data:true,
                button_enabled:true,
                is_important:true
            },
        };
        this.VIEW_TYPE = view_types;
    },
    isValidPopupType: function(type) {
        return this.TYPE[type] != undefined;
    },
    getPopupParams: function(type) {
        return this.TYPE[type];
    }
});

