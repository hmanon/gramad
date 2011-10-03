dojo.provide('garm.components.main.MainStore');

dojo.require('garm.app.Constants');

dojo.require('dojo.data.ItemFileWriteStore');

dojo.require('uuid.UUID');


dojo.declare('garm.components.main.MainStore', null, {

    _store : null,


    constructor : function() {

        this._store = new dojo.data.ItemFileWriteStore(
            garm.app.Constants.STORE_STRUCT
        );
        dojo.subscribe(garm.app.Constants.TOPIC_UPD_ITEM, this, this._updateItem);
    },


    createItem : function(keywordArgs, parentItem) {

        var newItem = this._store.newItem(
            dojo.mixin(keywordArgs, {
                id  : uuid.UUID.generate(),
                pid : this._store.getIdentity(parentItem)
            }), {
                parent : parentItem,
                attribute : garm.app.Constants.FLD_CHILDREN
            }
        );
        this.fillItem(newItem);
    },


    fillItem : function(item) {

        var meta = this.getMetaFor(item);
        for (var childType in meta) {
            var info = meta[childType];
            for (var i = 0; i < info.min; ++i) {
                this.createItem({
                    name : info.defName + ' ' + i,
                    type : childType
                }, item);
            }
        }
    },


    renameItem : function(item, name) {

        this._store.setValue(item, garm.app.Constants.FLD_NAME, name);
    },


    deleteItem : function(item) {

        var children = this.getChildren(item);
        for(var i in children) {
            this.deleteItem(children[i]);
        }
        this._store.deleteItem(item);
    },


    getItemName : function(item) {

        return this._store.getLabel(item);
    },


    getMetaFor : function(item) {

        var type = this._store.getValue(
            item, garm.app.Constants.FLD_TYPE
        );
        return garm.app.Constants.STORE_META[type];
    },


    getMetaInfoFor : function(childType, parentItem) {

        var meta = this.getMetaFor(parentItem);
        return meta ? meta[childType] : null;
    },


    getChildren : function(item) {

        return this._store.getValues(
            item, garm.app.Constants.FLD_CHILDREN
        );
    },


    getParent : function(item, onResult, onError) {

        var pid = this._store.getValue(
            item, garm.app.Constants.FLD_PID
        );
        this._store.fetchItemByIdentity({
            identity : pid,
            onItem : onResult,
            onError: onError
        });
    },


    canAddItem : function(childType, parentItem) {

        var info = this.getMetaInfoFor(childType, parentItem);
        var result = (!info)
            ? -1
            : Math.max(info.max - this.getChildren(parentItem).length, 0)
            ;
        return result;
    },


    canDelItem : function(item, onResult, onError) {

        this.getParent(
            item,
            dojo.hitch(this, function(parentItem) {

                var childType = this._store.getValue(
                    item, garm.app.Constants.FLD_TYPE
                );
                var info = this.getMetaInfoFor(childType, parentItem);
                var result = (!info)
                    ? 0
                    : Math.max(this.getChildren(parentItem).length - info.min, 0)
                    ;
                onResult(result);
            }),
            onError
        );
    },


    setValue : function(item, field, value) {

        this._store.setValue(item, field, value);
    },


	request : function(params) {

        dojo.when(
            dojo.xhrGet({
                url          : garm.app.Constants.STORE_GET_URL,
                handleAs     : 'json',
                preventCache : true
            }),
            dojo.hitch(this, function(data) {
            	this._store.data = data;
            	this._store.revert();
            	this._store.close();

                if (dojo.isFunction(params.onComplete)) {
                	params.onComplete();
                }
            }),
            dojo.hitch(this, function(error) {
                if (dojo.isFunction(params.onError)) {
                	params.onError(error);
                }
            })
        );
	},


	save : function(params) {

	    this._store._saveEverything = function(saveCompleteCallback, saveFailedCallback, newFileContentString) {

            dojo.xhrPost({
                url     : garm.app.Constants.STORE_POST_URL,
                load    : saveCompleteCallback,
                error   : saveFailedCallback,
                content : {
                    data : newFileContentString
                }
            });
        };
	    this._store.save(params);
	},


    createFork : function(params) {

        this._store._saveEverything = function(saveCompleteCallback, saveFailedCallback, newFileContentString) {

            dojo.xhrPost({
                url     : garm.app.Constants.STORE_POST_URL,
                load    : saveCompleteCallback,
                error   : saveFailedCallback,
                content : {
                    fork : params.fork,
                    data : newFileContentString
                }
            });
        };
        this._store.save(params);
    },


    _updateItem : function(data) {

        var item  = data.item;
        var value = data.value;
        if (this._store.isItem(item)) {
            for(field in value) {
                this._store.setValue(item, field, value[field]);
            }
        }
    }
});