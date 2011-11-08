dojo.provide('garm.components.main.form.FormImage');

dojo.require('garm.app.Constants');
dojo.require('garm.components.main.form.FormBase');

dojo.require("dojo.html");


dojo.declare('garm.components.main.form.FormImage', garm.components.main.form.FormBase, {

    init : function() {

        this.inherited(arguments);
    },


    setItem : function(item) {

        this.inherited(arguments);

        var imageUrl = item[garm.app.Constants.FLD_IMAGE_URL]
                     ? item[garm.app.Constants.FLD_IMAGE_URL]
                     : garm.app.Constants.IMG_EMPTY
                     ;
        var previewUrl = item[garm.app.Constants.FLD_IMAGE_PREVIEW_URL]
                       ? item[garm.app.Constants.FLD_IMAGE_PREVIEW_URL]
                       : garm.app.Constants.IMG_EMPTY
                       ;
        var bgColor = item[garm.app.Constants.FLD_IMAGE_CLR]
                    ? item[garm.app.Constants.FLD_IMAGE_CLR][0]
                    : '#000000'
                    ;
        this.setContent(
            '<table style="height:auto; width:100%; padding:10px">'
            + '<tr><td style="height:auto; width:100%;">'
              + '<label>Background color:</label>'
                + '<div dojoType="dojox.widget.ColorPicker"'
                 + ' name="' + garm.app.Constants.FLD_IMAGE_CLR + '"'
                 + ' animatePoint="false"'
                 + ' value="' + bgColor + '"'
                 + '>'
                 + '</div>'
            + '</td></tr>'
            + '<tr><td style="height:auto; width:100%;">'
              + '<label>Preview:</label>'
              + '<br>'
              + '<img'
                + ' style="width: ' + garm.app.Constants.IMAGE_PREVIEW_WIDTH + 'px; height: ' + garm.app.Constants.IMAGE_PREVIEW_HEIGHT + 'px;"'
                + ' src="' + previewUrl +'"'
                + ' alt="' + previewUrl +'"'
                + ' title="' + item[garm.app.Constants.FLD_NAME] +'"'
                + '/>'
            + '</td></tr>'
            + '<tr><td style="height:auto; width:100%;">'
              + '<label>Full size:</label>'
              + '<br>'
              + '<img'
                + ' style="width: ' + garm.app.Constants.IMAGE_WIDTH / 2 + 'px; height: ' + garm.app.Constants.IMAGE_HEIGHT / 2 + 'px;"'
                + ' src="' + imageUrl +'"'
                + ' alt="' + imageUrl +'"'
                + ' title="' + item[garm.app.Constants.FLD_NAME] +'"'
                + '/>'
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