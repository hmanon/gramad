dojo.provide('garm.components.main.form.FormCatalog');

dojo.require('garm.app.Constants');
dojo.require('garm.components.main.form.FormBase');
dojo.require('garm.components.main.form.FormUtil');

dojo.require("dojo.html");


dojo.declare('garm.components.main.form.FormCatalog', garm.components.main.form.FormBase, {


    init : function() {

        this.inherited(arguments);
        this.setContent(
            '<div/>',
            {   parseContent: true,
                onBegin : function() {
                    dojo.require('dijit.form.DropDownButton');
                    dojo.require('dojox.widget.ColorPicker');
                    dojo.require('dijit.form.SimpleTextarea');
                    this.inherited('onBegin', arguments);
                }
            }
        );
    }
});