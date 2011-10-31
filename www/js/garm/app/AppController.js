dojo.provide('garm.app.AppController');

dojo.require("garm.components.main.MainController");
dojo.require('garm.components.popup.PopUpFactory');


dojo.declare('garm.app.AppController', null, {

    _main : null,


    constructor : function(rootNode) {

        this._main = new garm.components.main.MainController(rootNode);

        dojo.subscribe(garm.app.Constants.TOPIC_SHOW_MESSAGE, this, this._showMessage);
        dojo.subscribe(garm.app.Constants.TOPIC_SHOW_SUCCESS, this, this._showSuccess);
        dojo.subscribe(garm.app.Constants.TOPIC_SHOW_ERROR,   this, this._showError);

        dojo.subscribe(garm.app.Constants.TOPIC_FORK_SELECT,  this, this._showForkSelection);
        dojo.subscribe(garm.app.Constants.TOPIC_FORK_SWITCH,  this, this._showForkSwitching);
    },


    init : function() {

        this._updateSwitchedForkLabel();
        this._showForkSelection();
    },


    _updateSwitchedForkLabel: function() {

        var onFetch = dojo.hitch(this, function(forks) {
            for(var fork in forks) {
                if (forks[fork]) {
                    this._main.setSwitchedForkLabel(fork);
                }
            }
        });

        this._fetchForks({
            mark       : 'current',
            onComplete : onFetch
        });
    },


    _showForkSelection : function() {

        var askFork = dojo.hitch(this, function(forks) {
            garm.components.popup.PopUpFactory.getInstance().askOptions({
                title : 'Select Version',
                options : forks,
                onOk : dojo.hitch(this, function(result) {
                    this._selectFork(result.value.option);
                })
            });
        });

        this._fetchForks({
            mark       : 'selected',
            onComplete : askFork
        });
    },


    _showForkSwitching : function() {

        var askFork = dojo.hitch(this, function(forks) {
            garm.components.popup.PopUpFactory.getInstance().askOptions({
                title : 'Switch Version',
                options : forks,
                onOk : dojo.hitch(this, function(result) {
                    this._switchFork(result.value.option);
                })
            });
        });

        this._fetchForks({
            mark       : 'current',
            onComplete : askFork
        });
    },


    _fetchForks : function(params) {

        var deferred = dojo.xhrPost({
            url          : garm.app.Constants.STORE_FORK_URL,
            handleAs     : 'json',
            preventCache : true,
            content      : {
                mark : params.mark
            },
            load  : params.onComplete,
            error : this._showError
        });
        this._showProgress(deferred, 'Fetch Versions');
    },


    _selectFork : function(fork) {

        var deferred = dojo.xhrPost({
            url          : garm.app.Constants.STORE_FORK_URL,
            handleAs     : 'json',
            preventCache : true,
            content      : {
                select : fork,
                mark   : 'selected'
            },
            load : dojo.hitch(this, function(result) {
                this._main.update(fork);
            }),
            error : this._showError
        });
        this._showProgress(deferred, 'Select Version');
    },


    _switchFork : function(fork) {

        var deferred = dojo.xhrPost({
            url          : garm.app.Constants.STORE_FORK_URL,
            handleAs     : 'json',
            preventCache : true,
            content      : {
                'switch' : fork,
                mark     : 'current'
            },
            load : dojo.hitch(this, function(result) {
                this._main.setSwitchedForkLabel(fork);
                this._showSuccess('Version "' + fork + '" was activated');
            }),
            error : this._showError
        });
        this._showProgress(deferred, 'Activate Version');
    },


    _showProgress : function(deferred, message) {

        garm.components.popup.PopUpFactory.getInstance().progress({
            deferred: deferred,
            content : '<label style="color: black;">' + message + '</label>'
        });
    },


    _showMessage: function(message) {

        garm.components.popup.PopUpFactory.getInstance().info({
            content : '<label style="color: black;">' + message + '</label>'
        });
    },


    _showSuccess : function(message) {

        garm.components.popup.PopUpFactory.getInstance().info({
            content : '<label style="color: green;">' + message + '</label>'
        });
    },


    _showError : function(message) {

        var content = '<label style="color: red;">' + message + '</label>';
        if (message.responseText) {
            content += '<br><label style="color: black;">'
                       + message.responseText.replace(/\n/, '<br>')
                     + '</label>';
        }
        garm.components.popup.PopUpFactory.getInstance().error({
            content : content
        });
    }
});