dojo.provide('garm.components.main.form.FormCountry');

dojo.require('garm.app.Constants');
dojo.require('garm.components.main.form.FormBase');

dojo.require("dojo.html");


dojo.declare('garm.components.main.form.FormCountry', garm.components.main.form.FormBase, {


    init : function() {

        this.inherited(arguments);

        dojo.html.set(
            this.domNode,
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