dojo.provide('garm.components.main.form.FormAbout');

dojo.require('garm.app.Constants');
dojo.require('garm.components.main.form.FormBase');
dojo.require('garm.components.main.form.FormUtil');

dojo.require("dojo.html");


dojo.declare('garm.components.main.form.FormAbout', garm.components.main.form.FormBase, {


    init : function() {

        this.inherited(arguments);
        this.setContent(
            '<table style="height:80%; width:100%; padding:10px">'
            + '<tr><td style="height:auto; width:100%;"><label for="' + garm.app.Constants.FLD_ABOUT + '">Text:</label></td></tr>'
            + '<tr><td style="height:100%; width:100%;">'
                + '<input type="text" dojoType="dijit.form.SimpleTextarea"'
                  + ' name="' + garm.app.Constants.FLD_ABOUT + '"'
                  + ' value="About"'
                  + ' required= "true"'
                  + ' style="height:100%; width:100%;"'
                  + '/>'
            + '</td></tr>'
            + '</table>',
            {   parseContent: true,
                onBegin : function() {

                    dojo.require('dijit.form.SimpleTextarea');
                    this.inherited("onBegin", arguments);
                  }
            }
        );
    }
});