dojo.provide('garm.components.main.form.FormCredits');

dojo.require('garm.app.Constants');
dojo.require('garm.components.main.form.FormBase');

dojo.require("dojo.html");


dojo.declare('garm.components.main.form.FormCredits', garm.components.main.form.FormBase, {


    init : function() {

        this.inherited(arguments);

        dojo.html.set(
            this.domNode,
            '<table style="height:100%; width:100%; padding:10px">'
            + '<tr><td style="height:auto; width:100%;"><label for="' + garm.app.Constants.FLD_CREDITS + '">Text:</label></td></tr>'
            + '<tr><td style="height:100%; width:100%;">'
                + '<input type="text" dojoType="dijit.form.SimpleTextarea"'
                  + ' name="' + garm.app.Constants.FLD_CREDITS + '"'
                  + ' value="Credits.."'
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