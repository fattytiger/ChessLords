const view_types = {
    SIMPLE: 1,              // Simple popup: icon, label and go button.
    ICONCENTRIC: 2,         // Icon is too large comparing to simple popup
    OUT_OF_ITEMS: 3,        // Special popup used to show in first page
    PROGRESSIVE: 4
};

var Popup = cc.Class({
    ctor: function() {
        this.TYPE = {
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

