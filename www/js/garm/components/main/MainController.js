dojo.provide('garm.components.main.MainController');

dojo.require('garm.app.Constants');
dojo.require('garm.components.main.MainStore');
dojo.require('garm.components.main.MainMenuController');
dojo.require('garm.components.main.tree.TreeController');
dojo.require('garm.components.main.form.FormController');

dojo.require('garm.components.popup.PopUpFactory');

dojo.require("dojo.io.iframe");

dojo.require('dijit.layout.ContentPane');
dojo.require('dijit.layout.BorderContainer');


dojo.declare('garm.components.main.MainController', null, {

    _rootNode : null,

    _main : null,

    _mainStore : null,

    _mainMenu : null,

    _mainTree : null,

    _mainForm : null,


    constructor : function(rootNode) {

        this._rootNode = rootNode;

        this._mainStore = new garm.components.main.MainStore();

        this._createUI();

        dojo.subscribe(garm.app.Constants.TOPIC_REN_ITEM, this, this._renameItem);
        dojo.subscribe(garm.app.Constants.TOPIC_DEL_ITEM, this, this._deleteItem);

        dojo.subscribe(garm.app.Constants.TOPIC_ADD_CONTINENT, this, this._addContinent);
        dojo.subscribe(garm.app.Constants.TOPIC_CHA_CONTINENT_IMAGE, this, this._changeContinentImage);
        dojo.subscribe(garm.app.Constants.TOPIC_ADD_COUNTRY, this, this._addCountry);
        dojo.subscribe(garm.app.Constants.TOPIC_CHA_COUNTRY_DRAPES, this, this._changeCountryDrapes);
        dojo.subscribe(garm.app.Constants.TOPIC_ADD_IMAGE, this, this._addImage);
        dojo.subscribe(garm.app.Constants.TOPIC_CHA_IMAGE, this, this._changeImage);
        dojo.subscribe(garm.app.Constants.TOPIC_CHA_PREVIEW, this, this._changePreview);
        dojo.subscribe(garm.app.Constants.TOPIC_CHA_FULL, this, this._changeFull);

        dojo.subscribe(garm.app.Constants.TOPIC_LOAD_DATA, this, this._loadData);
        dojo.subscribe(garm.app.Constants.TOPIC_SAVE_DATA, this, this._saveData);
        dojo.subscribe(garm.app.Constants.TOPIC_FORK_CREATE, this, this._createFork);
    },


    update : function(fork) {

        this._mainMenu.setSelectedForkLabel(fork);
        this._fetchRepo();
    },


    setSwitchedForkLabel : function(fork) {

        this._mainMenu.setSwitchedForkLabel(fork);
    },


    _fetchRepo : function() {

        this._mainStore.request({
            onComplete : dojo.hitch(this, this._updateUI),
            onError    : dojo.hitch(this, this._showError)
        });
    },


    _createUI : function() {

        this._main = dijit.layout.BorderContainer({
            liveSplitters : 'true',
            design        : 'headline',
            gutters       : 'true',
            style         : 'width: 100%; height: 100%'
        }, this._rootNode);

        var topPane = dijit.layout.ContentPane({
            splitter : false,
            region   : 'top'
        });
        this._main.addChild(topPane);

        var treePane = dijit.layout.ContentPane({
            splitter : true,
            region   : 'left',
            style    : 'width: 200px;'
        });
        this._main.addChild(treePane);

        var centerPane = dijit.layout.ContentPane({
            splitter : true,
            region   : 'center'
        });
        this._main.addChild(centerPane);

        this._mainMenu = new garm.components.main.MainMenuController(topPane);
        this._mainTree = new garm.components.main.tree.TreeController(treePane, this._mainStore._store);
        this._mainForm = new garm.components.main.form.FormController(centerPane);

        this._main.startup();
    },


    _canAddItem : function(type, parentItem) {

        var count = this._mainStore.canAddItem(type, parentItem);
        if (count == 0) {
            this._showMessage('Can`t add child items. Where are too many of them');
        }
        return count;
    },


    _addItem : function(keywordArgs, parentItem) {

        if (0 != this._canAddItem(keywordArgs.type, parentItem)) {
            garm.components.popup.PopUpFactory.getInstance().askNewValue({
                title : 'Create item',
                oldValue : keywordArgs.name,
                onOk : dojo.hitch(this, function(result) {
                    this._mainStore.createItem(
                        dojo.mixin(keywordArgs, {name : result.value.newValue}),
                        parentItem
                    );
                })
            });
        }
    },


    _addContinent : function(parentItem) {

        this._addItem({
            name : 'New Continent',
            type : garm.app.Constants.TYPE_CONTINENT
        }, parentItem);
    },


    _addCountry : function(parentItem) {

        this._addItem({
            name : 'New Country',
            type : garm.app.Constants.TYPE_COUNTRY
        }, parentItem);
    },


    _changeCountryDrapes : function(item) {
        var responseMap = {};
        responseMap[garm.app.Constants.FLD_COUNTRY_DRAPES] = 'crop';
        this._doChangeImage(item, responseMap, {
            resizeWidth     : garm.app.Constants.COUNTRY_DRAPES_WIDTH,
            resizeHeight    : garm.app.Constants.COUNTRY_DRAPES_HEIGHT,
            cropWidthCount  : garm.app.Constants.COUNTRY_DRAPES_CROP_WIDTH_COUNT,
            cropHeightCount : garm.app.Constants.COUNTRY_DRAPES_CROP_HEIGHT_COUNT
        });
    },


    _addImage : function(parentItem) {

        this._doAddImage(
            parentItem, {
                type : garm.app.Constants.TYPE_IMAGE
            }, garm.app.Constants.FLD_IMAGE_URL, {
                resizeWidth  : garm.app.Constants.IMAGE_WIDTH,
                resizeHeight : garm.app.Constants.IMAGE_HEIGHT
            }
        );
    },


    _changeContinentImage : function(item) {
        var responseMap = {};
        responseMap[garm.app.Constants.FLD_CONTINENT_IMAGE_URL] = 'url';
        this._doChangeImage(item, responseMap, {
            resizeWidth  : garm.app.Constants.IMAGE_WIDTH,
            resizeHeight : garm.app.Constants.IMAGE_HEIGHT
        });
    },


    _changeImage : function(item) {
        var responseMap = {};
        responseMap[garm.app.Constants.FLD_IMAGE_URL] = 'url';
        this._doChangeImage(item, responseMap, {
            resizeWidth  : garm.app.Constants.IMAGE_WIDTH,
            resizeHeight : garm.app.Constants.IMAGE_HEIGHT
        });
    },


    _changePreview : function(item) {
        var responseMap = {};
        responseMap[garm.app.Constants.FLD_IMAGE_PREVIEW_URL] = 'url';
        this._doChangeImage(item, responseMap, {
            resizeWidth  : garm.app.Constants.IMAGE_PREVIEW_WIDTH,
            resizeHeight : garm.app.Constants.IMAGE_PREVIEW_HEIGHT
        });
    },


    _changeFull : function(item) {
        var responseMap = {};
        responseMap[garm.app.Constants.FLD_IMAGE_FULL_URL] = 'url';
        this._doChangeImage(item, responseMap, {
            resizeWidth  : garm.app.Constants.IMAGE_FULL_WIDTH,
            resizeHeight : garm.app.Constants.IMAGE_FULL_HEIGHT
        });
    },


    _renameItem : function(item) {

        var itemLabel = this._mainStore.getItemName(item);

        garm.components.popup.PopUpFactory.getInstance().askNewValue({
            title : 'Rename "' + itemLabel + '"',
            oldValue : itemLabel,
            onOk : dojo.hitch(this, function(result) {
                this._mainStore.renameItem(item, result.value.newValue);
                this._updateUI();
            })
        });
    },


    _deleteItem: function(item) {

        this._mainStore.canDelItem(item, dojo.hitch(this, function(count) {

            var itemLabel = this._mainStore.getItemName(item);
            if (count != 0) {
                garm.components.popup.PopUpFactory.getInstance().askFor({
                    title : 'Confirmation',
                    content : '<label>Please, give your confirmation <b>to delete "' + itemLabel + '"</b></label>',
                    onOk : dojo.hitch(this, function(result) {
                        this._mainStore.deleteItem(item);
                    })
                });
            }
            else {
                this._showMessage('Can`t delete items. Where are too few of them');
            }
        }), dojo.hitch(this, this._showError));
    },


    _loadData : function(item) {

        garm.components.popup.PopUpFactory.getInstance().askFor({
            title : 'Confirmation',
            content : '<label>Please, give your confirmation <b>to discard changes</b></label>',
            onOk : dojo.hitch(this, function(result) {
                this._fetchRepo();
            })
        });
    },


    _saveData : function(item) {

        garm.components.popup.PopUpFactory.getInstance().askFor({
            title : 'Confirmation',
            content : '<label>Please, give your confirmation <b>to save changes</b></label>',
            onOk : dojo.hitch(this, function(result) {
                if (this._mainForm.commitChanges()) {
                    this._mainStore.save({
                        onComplete : dojo.hitch(this, function() {
                            this._showSuccess('Save complete');
                        }),
                        onError : dojo.hitch(this, this._showError)
                    });
                }
            })
        });
    },


    _createFork : function(item) {

        var now = new Date();
        var fork = 'Version at '
                   + now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate()
                   + ' '
                   + now.getHours() + ':' + now.getMinutes()
                   ;
        garm.components.popup.PopUpFactory.getInstance().askNewValue({
            title : 'Create Version',
            oldValue : fork,
            onOk : dojo.hitch(this, function(result) {
                if (this._mainForm.commitChanges()) {
                    this._mainStore.createFork({
                        fork : result.value.newValue,
                        onComplete : dojo.hitch(this, function() {
                            this._mainMenu.setSelectedForkLabel(result.value.newValue);
                            this._showSuccess('Version "' + result.value.newValue + '" created');
                        }),
                        onError : dojo.hitch(this, this._showError)
                    });
                }
            })
        });
    },


    _updateUI : function() {

        dojo.publish(garm.app.Constants.TOPIC_UPDATE_UI);
        setTimeout(dojo.hitch(this, function() {
            this._main.layout();
        }), 500);
    },


    _showMessage : function(message) {

        dojo.publish(garm.app.Constants.TOPIC_SHOW_MESSAGE, [message]);
    },


    _showSuccess : function(message) {

        dojo.publish(garm.app.Constants.TOPIC_SHOW_SUCCESS, [message]);
    },


    _showError : function(message) {

        dojo.publish(garm.app.Constants.TOPIC_SHOW_ERROR, [message]);
    },


    _doAddImage : function(parentItem, keywordArgs, field, imageParams) {

        var onUpload = dojo.hitch(this, function(response, ioArgs) {

            if (dojo.isString(response)) {
                this._showError(response);
            }
            else {
                var content = '<ul style="width:300px; max-height:200px; overflow-y:auto;">';
                for(fileName in response) {
                    var result = response[fileName]['result'];
                    var status = response[fileName]['status'];
                    var color = result ? 'green' : 'red';

                    content +=
                        '<li style="color:' + color + ';">'
                        + fileName
                        + (!result ? (': ' + status) : '')
                      + '</li>';

                    if (result) {
                        keywordArgs['name']  = fileName;
                        keywordArgs[field] = response[fileName]['url'];
                        this._mainStore.createItem(keywordArgs, parentItem);
                    }
                }
                content += '</ul>';
                garm.components.popup.PopUpFactory.getInstance().info({
                    title : 'Upload result',
                    content : content
                });
            }
            return response;
        });

        var onFileSelect = dojo.hitch(this, function(result) {
            if (result.form.isValid()) {
                var deferred = dojo.io.iframe.send({
                    form     : result.form.domNode,
                    url      : garm.app.Constants.IMAGE_POST_URL,
                    method   : 'post',
                    handleAs : 'json',
                    error    : dojo.hitch(this, this._showError),
                    load     : onUpload
                });
                garm.components.popup.PopUpFactory.getInstance().progress({
                    deferred : deferred,
                    title : 'Upload Image(s)'
                });
            }
        });

        var maxCount = this._canAddItem(
            garm.app.Constants.TYPE_IMAGE, parentItem
        );
        if (0 != maxCount) {
            garm.components.popup.PopUpFactory.getInstance().askForFiles(dojo.mixin({
                title : 'Upload images',
                multiple : true,
                maxFileSize : 10 * 1024 * 1024,
                onOk : onFileSelect
            }, imageParams));
        }
    },


    _doChangeImage : function(item, responseMap, imageParams) {

        var onUpload = dojo.hitch(this, function(response, ioArgs) {

            if (dojo.isString(response)) {
                this._showError(response);
            }
            else {
                var content = '<ul style="width:300px; max-height:200px; overflow-y:auto;">';
                for(fileName in response) {
                    var result = response[fileName]['result'];
                    var status = response[fileName]['status'];
                    var color = result ? 'green' : 'red';

                    content +=
                        '<li style="color:' + color + ';">'
                        + fileName
                        + (!result ? (': ' + status) : '')
                      + '</li>';

                    if (result) {
                        for(var field in responseMap) {
                            this._mainStore.setValue(item, field, response[fileName][responseMap[field]]);
                        }
                        this._updateUI();
                    }
                }
                content += '</ul>';
                garm.components.popup.PopUpFactory.getInstance().info({
                    title : 'Upload result',
                    content : content
                });
            }
            return response;
        });

        var onFileSelect = dojo.hitch(this, function(result) {
            if (result.form.isValid()) {
                var deferred = dojo.io.iframe.send({
                    form     : result.form.domNode,
                    url      : garm.app.Constants.IMAGE_POST_URL,
                    method   : 'post',
                    handleAs : 'json',
                    error    : dojo.hitch(this, this._showError),
                    load     : onUpload
                });
                garm.components.popup.PopUpFactory.getInstance().progress({
                    deferred : deferred,
                    title : 'Upload Image(s)'
                });
            }
        });

        garm.components.popup.PopUpFactory.getInstance().askForFiles(dojo.mixin({
            title : 'Upload image',
            multiple : false,
            maxFileSize : 10 * 1024 * 1024,
            onOk : onFileSelect
        }, imageParams));
    }
});