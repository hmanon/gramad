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
        var fullUrl = item[garm.app.Constants.FLD_IMAGE_FULL_URL]
                    ? item[garm.app.Constants.FLD_IMAGE_FULL_URL]
                    : garm.app.Constants.IMG_EMPTY
                    ;
        var siteColor = item[garm.app.Constants.FLD_IMAGE_SITE_CLR]
                      ? item[garm.app.Constants.FLD_IMAGE_SITE_CLR][0]
                      : garm.app.Constants.DEF_SITE_CLR
                      ;
        var pageColor = item[garm.app.Constants.FLD_IMAGE_PAGE_CLR]
                      ? item[garm.app.Constants.FLD_IMAGE_PAGE_CLR][0]
                      : garm.app.Constants.DEF_PAGE_CLR
                      ;
        var headColor = item[garm.app.Constants.FLD_IMAGE_HEAD_CLR]
                      ? item[garm.app.Constants.FLD_IMAGE_HEAD_CLR][0]
                      : garm.app.Constants.DEF_HEAD_CLR
                      ;
        this.setContent(
            '<table style="height:auto; width:100%; padding:10px">'
            + '<tr><td style="height:auto; width:100%;">'
              + '<label>Site color:</label>'
              + '<div dojoType="dojox.widget.ColorPicker"'
                + ' name="' + garm.app.Constants.FLD_IMAGE_SITE_CLR + '"'
                + ' animatePoint="false"'
                + ' value="' + siteColor + '"'
                + '>'
                + '</div>'
            + '</td></tr>'
            + '<tr><td style="height:auto; width:100%;">'
              + '<label>Page color:</label>'
              + '<div dojoType="dojox.widget.ColorPicker"'
                + ' name="' + garm.app.Constants.FLD_IMAGE_PAGE_CLR + '"'
                + ' animatePoint="false"'
                + ' value="' + pageColor + '"'
                + '>'
                + '</div>'
            + '</td></tr>'
            + '<tr><td style="height:auto; width:100%;">'
              + '<label>Head color:</label>'
              + '<div dojoType="dojox.widget.ColorPicker"'
                + ' name="' + garm.app.Constants.FLD_IMAGE_HEAD_CLR + '"'
                + ' animatePoint="false"'
                + ' value="' + headColor + '"'
                + '>'
                + '</div>'
            + '</td></tr>'
            + '<tr><td style="height:auto; width:100%;">'
              + '<label>Preview Image:</label>'
              + '<br>'
              + '<img'
                + ' style="width: ' + garm.app.Constants.IMAGE_PREVIEW_WIDTH + 'px; height: ' + garm.app.Constants.IMAGE_PREVIEW_HEIGHT + 'px;"'
                + ' src="' + previewUrl +'"'
                + ' alt="' + previewUrl +'"'
                + ' title="' + item[garm.app.Constants.FLD_NAME] +'"'
                + '/>'
            + '</td></tr>'
            + '<tr><td style="height:auto; width:100%;">'
              + '<label>Normal Image:</label>'
              + '<br>'
              + '<img'
                + ' style="width: ' + garm.app.Constants.IMAGE_WIDTH / 3 + 'px; height: ' + garm.app.Constants.IMAGE_HEIGHT / 3 + 'px;"'
                + ' src="' + imageUrl +'"'
                + ' alt="' + imageUrl +'"'
                + ' title="' + item[garm.app.Constants.FLD_NAME] +'"'
                + '/>'
            + '</td></tr>'
            + '<tr><td style="height:auto; width:100%;">'
            + '<label>Fullscreen Image:</label>'
              + '<br>'
              + '<img'
                + ' style="width: ' + garm.app.Constants.IMAGE_FULL_WIDTH / 3 + 'px; height: ' + garm.app.Constants.IMAGE_FULL_HEIGHT / 3 + 'px;"'
                + ' src="' + fullUrl +'"'
                + ' alt="' + fullUrl +'"'
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