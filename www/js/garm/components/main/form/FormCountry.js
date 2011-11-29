dojo.provide('garm.components.main.form.FormCountry');

dojo.require('garm.app.Constants');
dojo.require('garm.components.main.form.FormBase');
dojo.require('garm.components.main.form.FormUtil');

dojo.require("dojo.html");


dojo.declare('garm.components.main.form.FormCountry', garm.components.main.form.FormBase, {


    init : function() {
        this.inherited(arguments);
    },


    setItem : function(item) {

        this.inherited(arguments);

        var fields = [
            garm.components.main.form.FormUtil.PREPARE_COLOR_PICKER(
                'Site Color', item,
                garm.app.Constants.FLD_SITE_CLR,
                garm.app.Constants.DEF_SITE_CLR
            ),
            garm.components.main.form.FormUtil.PREPARE_COLOR_PICKER(
                'Page Color', item,
                garm.app.Constants.FLD_PAGE_CLR,
                garm.app.Constants.DEF_PAGE_CLR
            ),
            garm.components.main.form.FormUtil.PREPARE_COLOR_PICKER(
                'Head Color', item,
                garm.app.Constants.FLD_HEAD_CLR,
                garm.app.Constants.DEF_HEAD_CLR
            ),
            garm.components.main.form.FormUtil.PREPARE_SOUND(
                'Sound', item,
                garm.app.Constants.FLD_SOUND_URL
            ),
            garm.components.main.form.FormUtil.PREPARE_DRAPES(
                'Drapes', item,
                garm.app.Constants.FLD_COUNTRY_DRAPES
            )
        ];

        var content = '<table style="height:auto; width:100%; padding:10px">';
        dojo.forEach(fields, function(field) {
            content += '<tr><td style="height:auto; width:100%;">' + field + '</td></tr>';
        });
        content += '</table>';

        this.setContent(
            content, {
            parseContent: true,
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