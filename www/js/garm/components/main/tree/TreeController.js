dojo.provide('garm.components.main.tree.TreeController');

dojo.require('garm.app.Constants');
dojo.require("garm.components.main.tree.ContextMenu");

dojo.require("dijit.Tree");
dojo.require("dijit.tree.ForestStoreModel");
dojo.require("dijit.tree.dndSource");

dojo.declare('garm.components.main.tree.TreeController', null, {

    _parent : null,

    _store : null,

    _connections : [],

    _mainTree : null,

    _mainTreeMenu : null,


    constructor : function(parent, store) {

        this._parent = parent;
        this._store = store;

        dojo.subscribe(
            garm.app.Constants.TOPIC_UPDATE_UI, this, this._updateUI
        );
    },


    _updateUI : function() {

        dojo.forEach(this._connections, dojo.disconnect);

        // tree model
        var model = new dijit.tree.ForestStoreModel({
            store: this._store,
            query: {
                "type": garm.app.Constants.TYPE_CONFIG
            },
            rootId: "root",
            rootLabel: "Config",
            childrenAttrs: [garm.app.Constants.FLD_CHILDREN]
        });

        // tree

        if (this._tree) {
            this._tree.destroyRecursive(true);
        }
        this._tree = new dijit.Tree({
            model: model,
            showRoot: false,
            dndController: "dijit.tree.dndSource",
            dragThreshold: "8",
            betweenThreshold: "8",
            checkAcceptance: dojo.hitch(this, function(source, nodes) {
                return source.tree == this._tree;
            }),
            checkItemAcceptance: dojo.hitch(this, function(node, source, position) {
                if (position == "over") {
                    return false;
                }
                var targetItem = dijit.getEnclosingWidget(node).item;
                var parentItem = source.tree.getNodesByItem(targetItem.pid);
                for (var i = 0; i < source.tree.selectedItems.length; ++i) {
                    var selectedItem = source.tree.selectedItems[i];
                    if (   (selectedItem.type.toString() != targetItem.type.toString())
                        || (selectedItem.pid.toString()  != targetItem.pid.toString())
                    ) {
                        return false;
                    }
                }
                return true;
            })
        }).placeAt(this._parent.domNode);

        this._connections.push(
            dojo.connect(this._tree, 'onClick', function(item) {

                dojo.publish(garm.app.Constants.TOPIC_EDT_ITEM, [item]);
            })
        );
        // TODO double click is not working, may be this is a dojo restriction
        this._connections.push(
            dojo.connect(this._tree, 'ondblclick', function(item) {

                dojo.publish(garm.app.Constants.TOPIC_REN_ITEM, [item]);
            })
        );

        // tree context menu
        if (this._mainTreeMenu) {
            this._mainTreeMenu.destroyRecursive(true);
        }
        this._mainTreeMenu = new garm.components.main.tree.ContextMenu({
            targetNodeIds: [this._tree.id]
        });
        this._mainTreeMenu.startup();
    }
});