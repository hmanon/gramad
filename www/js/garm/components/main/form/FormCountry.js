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

        var drapes = item[garm.app.Constants.FLD_COUNTRY_DRAPES];
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
        );
    }
});