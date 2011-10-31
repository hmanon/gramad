dojo.provide('garm.components.main.form.FormCatalog');

dojo.require('garm.app.Constants');
dojo.require('garm.components.main.form.FormBase');

dojo.require("dojo.html");


dojo.declare('garm.components.main.form.FormCatalog', garm.components.main.form.FormBase, {


    init : function() {

        this.inherited(arguments);
        this.setContent(
            '<input type="file" name="imageURL[]" id="imageURL" multiple=""/>',
            {   parseContent: true,
                onBegin : function() {

                    dojo.require('dijit.form.SimpleTextarea');
                    this.inherited("onBegin", arguments);
                  }
            }
        );
    }
});