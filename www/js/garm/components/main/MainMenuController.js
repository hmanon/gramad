dojo.provide('garm.components.main.MainMenuController');

dojo.require('garm.app.Constants');

dojo.require("dijit.Menu");
dojo.require('dijit.form.Button');


dojo.declare('garm.components.main.MainMenuController', null, {

    _selectedForkLabel : null,


    constructor : function(parent) {

        var menu = new dijit.Menu({
            style: "display: none;"
        });
        menu.addChild(new dijit.MenuItem({
            label: "Save",
            iconClass: "dijitIcon dijitIconSave",
            onClick: function() {
                dojo.publish(garm.app.Constants.TOPIC_SAVE_DATA, []);
            }
        }));
        menu.addChild(new dijit.MenuItem({
            label: "Discard",
            iconClass: "dijitIcon dijitIconUndo",
            onClick: function() {
                dojo.publish(garm.app.Constants.TOPIC_LOAD_DATA, []);
            }
        }));
        menu.addChild(new dijit.MenuSeparator());
        menu.addChild(new dijit.MenuItem({
            label: "Create Version",
            iconClass: "dijitIcon dijitIconUndo",
            onClick: function() {
                dojo.publish(garm.app.Constants.TOPIC_FORK_CREATE, []);
            }
        }));
        menu.addChild(new dijit.MenuItem({
            label: "Select Version",
            iconClass: "dijitIcon dijitIconUndo",
            onClick: function() {
                dojo.publish(garm.app.Constants.TOPIC_FORK_SELECT, []);
            }
        }));
        menu.addChild(new dijit.MenuItem({
            label: "Activate Version",
            iconClass: "dijitIcon dijitIconUndo",
            onClick: function() {
                dojo.publish(garm.app.Constants.TOPIC_FORK_SWITCH, []);
            }
        }));

        var button = new dijit.form.DropDownButton({
            label: "Menu",
            dropDown: menu
        }).placeAt(parent.domNode);

        dojo.create('br', null, parent.domNode);
        this._selectedForkLabel = dojo.create('label', null, parent.domNode);
        dojo.create('br', null, parent.domNode);
        this._switchedForkLabel = dojo.create('label', null, parent.domNode);
    },


    setSelectedForkLabel : function(fork) {

        dojo.attr(this._selectedForkLabel, {
            innerHTML : 'Selected Version: <b>"' + fork + '"</b>'
        });
    },


    setSwitchedForkLabel : function(fork) {

        dojo.attr(this._switchedForkLabel, {
            innerHTML : 'Activated Version: <b>"' + fork + '"</b>'
        });
    }
});
