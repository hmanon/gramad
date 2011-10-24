dojo.provide('garm.components.main.tree.ContextMenu');

dojo.require('garm.app.Constants');

dojo.require("dijit.Menu");
dojo.require("dijit.MenuItem");


dojo.declare('garm.components.main.tree.ContextMenu', dijit.Menu, {


    constructor: function(/* Object? */ params, /* DomNode|String */ srcNodeRef) {

        dojo.connect(this, "_openMyself", this, function(e) {

            this._fillMenuFor(
                dijit.getEnclosingWidget(e.target).item
            );
        });

        dojo.connect(this, "onClose", this, function(e) {

            this._clearMenu();
        });
    },


    _clearMenu : function() {

        var children = this.getChildren();
        for (var i in children) {
            this.removeChild(children[i]);
        }
    },


    _fillMenuFor : function(item) {

        var menuValues = this._prepareMenuValues(item);
        for (var i in menuValues) {
            if (menuValues[i] != null) {
                var menuItem = new dijit.MenuItem({
                    label     : menuValues[i].label,
                    iconClass : menuValues[i].iconClass
                });
                dojo.connect(menuItem, 'onClick', menuValues[i], function() {
                    dojo.publish(this.topic, [this.item]);
                });
                this.addChild(menuItem);
            }
            else {
                this.addChild(new dijit.MenuSeparator());
            }
        }
    },


    _prepareMenuValues : function(item) {

        var itemLabel = item[garm.app.Constants.FLD_NAME];
        var separator = null;
        var editItem = {
            label : 'Edit "' + itemLabel + '"',
            topic : garm.app.Constants.TOPIC_EDT_ITEM,
            iconClass: "dijitIcon dijitIconEditTask",
            item  : item
        };
        var renameItem = {
            label : 'Rename "' + itemLabel + '"',
            topic : garm.app.Constants.TOPIC_REN_ITEM,
            iconClass: "dijitIcon dijitIconEdit",
            item  : item
        };
        var deleteItem = {
            label : 'Delete "' + itemLabel + '"',
            topic : garm.app.Constants.TOPIC_DEL_ITEM,
            iconClass: "dijitIcon dijitIconDelete",
            item  : item
        };
        var result = {};
        result[garm.app.Constants.TYPE_CONFIG] = [
            { label : 'Save changes',
              topic : garm.app.Constants.TOPIC_SAVE_DATA,
              iconClass: "dijitIcon dijitIconSave",
              item  : item
            },
            separator,
            { label : 'Discard changes',
              topic : garm.app.Constants.TOPIC_LOAD_DATA,
              iconClass: "dijitIcon dijitIconUndo",
              item  : item
            },
            separator,
            { label : 'Create Version',
              topic : garm.app.Constants.TOPIC_FORK_CREATE,
              iconClass: "dijitIcon dijitIconUndo",
              item  : item
            },
            { label : 'Select Version',
              topic : garm.app.Constants.TOPIC_FORK_SELECT,
              iconClass: "dijitIcon dijitIconUndo",
              item  : item
            },
            { label : 'Switch Version',
              topic : garm.app.Constants.TOPIC_FORK_SWITCH,
              iconClass: "dijitIcon dijitIconUndo",
              item  : item
            }
        ];
        result[garm.app.Constants.TYPE_ABOUT] = [
            editItem
        ];
        result[garm.app.Constants.TYPE_CREDITS] = [
            editItem
        ];
        result[garm.app.Constants.TYPE_CONTACTS] = [
            editItem
        ];
        result[garm.app.Constants.TYPE_CATALOG] = [
            editItem,
            separator,
            { label : 'Add Continent',
              topic : garm.app.Constants.TOPIC_ADD_CONTINENT,
              iconClass: "dijitIcon dijitLeaf",
              item  : item
            }
        ];
        result[garm.app.Constants.TYPE_CONTINENT] = [
            editItem,
            renameItem,
            separator,
            deleteItem,
            separator,
            { label : 'Add Country',
              topic : garm.app.Constants.TOPIC_ADD_COUNTRY,
              iconClass: "dijitIcon dijitLeaf",
              item  : item
            }
        ];
        result[garm.app.Constants.TYPE_COUNTRY] = [
            editItem,
            renameItem,
            separator,
            deleteItem,
            separator,
            { label : 'Add Images',
              topic : garm.app.Constants.TOPIC_ADD_IMAGE,
              iconClass: "dijitIcon dijitLeaf",
              item  : item
            }
        ];
        result[garm.app.Constants.TYPE_IMAGE] = [
            editItem,
            renameItem,
            { label : 'Change Preview',
              topic : garm.app.Constants.TOPIC_CHA_PREVIEW,
              iconClass: "dijitIcon dijitIconFile",
              item  : item
            },
            { label : 'Change Image',
              topic : garm.app.Constants.TOPIC_CHA_IMAGE,
              iconClass: "dijitIcon dijitIconFile",
              item  : item
            },
            separator,
            deleteItem
         ];
        return result[item.type];
    }
});