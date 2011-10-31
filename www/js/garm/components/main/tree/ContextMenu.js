dojo.provide('garm.components.main.tree.ContextMenu');

dojo.require('garm.app.Constants');

dojo.require('dijit.Menu');
dojo.require('dijit.MenuItem');


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
        garm.app.Constants.PREPARE_ITEM_MENU(this, item);
    }
});