dojo.provide('garm.components.main.form.FormCountry');

dojo.require('garm.app.Constants');
dojo.require('garm.components.main.form.FormBase');

dojo.require("dojo.html");


dojo.declare('garm.components.main.form.FormCountry', garm.components.main.form.FormBase, {


    init : function() {
        this.inherited(arguments);
    },


    setItem : function(item) {

        this.inherited(arguments);

        var siteColor = item[garm.app.Constants.FLD_COUNTRY_SITE_CLR]
                      ? item[garm.app.Constants.FLD_COUNTRY_SITE_CLR][0]
                      : garm.app.Constants.DEF_SITE_CLR
                      ;
        var pageColor = item[garm.app.Constants.FLD_COUNTRY_PAGE_CLR]
                      ? item[garm.app.Constants.FLD_COUNTRY_PAGE_CLR][0]
                      : garm.app.Constants.DEF_PAGE_CLR
                      ;
        var headColor = item[garm.app.Constants.FLD_COUNTRY_HEAD_CLR]
                      ? item[garm.app.Constants.FLD_COUNTRY_HEAD_CLR][0]
                      : garm.app.Constants.DEF_HEAD_CLR
                      ;
        var drapes = item[garm.app.Constants.FLD_COUNTRY_DRAPES]
                   ;
        var rows = '';
        dojo.forEach(drapes, function(row) {
            var cells = '';
            dojo.forEach(row, function(cell) {
                cells += '<td>'
                       + '<img src="' + cell['url'] + '" alt="' + cell['url'] + '">'
                       + '</td>'
                       ;
            });
            rows += '<tr>'
                    + cells
                    + '</tr>'
                    ;
        });
        this.setContent(
            '<table style="padding:10px; cellspacing:0px">'
            + rows
            + '</table>'
            + '<table style="height:auto; width:100%; padding:10px">'
            + '<tr><td style="height:auto; width:auto;">'
              + '<label>Site color:</label>'
                + '<div dojoType="dojox.widget.ColorPicker"'
                 + ' name="' + garm.app.Constants.FLD_COUNTRY_SITE_CLR + '"'
                 + ' animatePoint="false"'
                 + ' value="' + siteColor + '"'
                 + '>'
                 + '</div>'
            + '</td></tr>'
            + '<tr><td style="height:auto; width:auto;">'
              + '<label>Page color:</label>'
                + '<div dojoType="dojox.widget.ColorPicker"'
                 + ' name="' + garm.app.Constants.FLD_COUNTRY_PAGE_CLR + '"'
                 + ' animatePoint="false"'
                 + ' value="' + pageColor + '"'
                 + '>'
                 + '</div>'
            + '</td></tr>'
              + '<tr><td style="height:auto; width:auto;">'
              + '<label>Head color:</label>'
                + '<div dojoType="dojox.widget.ColorPicker"'
                 + ' name="' + garm.app.Constants.FLD_COUNTRY_HEAD_CLR + '"'
                 + ' animatePoint="false"'
                 + ' value="' + headColor + '"'
                 + '>'
                 + '</div>'
            + '</td></tr>'
            + '</table>',
            {   parseContent: true,
                onBegin : function() {
                    dojo.require("dijit.form.DropDownButton");
                    dojo.require("dojox.widget.ColorPicker");
                    this.inherited("onBegin", arguments);
                }
            }
        );
    }
});