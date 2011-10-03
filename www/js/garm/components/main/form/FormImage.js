dojo.provide('garm.components.main.form.FormImage');

dojo.require('garm.app.Constants');
dojo.require('garm.components.main.form.FormBase');

dojo.require("dojo.html");


dojo.declare('garm.components.main.form.FormImage', garm.components.main.form.FormBase, {

    init : function() {

        this.inherited(arguments);

        dojo.html.set(
            this.domNode,
            '<table style="height:100%; width:100%; padding:10px">'
            + '<tr><td style="height:auto; width:100%;">'
              + '<label>Background color:</label>'
              + '<div dojoType="dijit.form.DropDownButton"'
                + ' id="imageDropDown"'
                + ' name="' + garm.app.Constants.FLD_IMAGE_CLR + '"'
                + '>'
                + '<span></span>'
                + '<div dojoType="dojox.widget.ColorPicker"'
                 + ' id="imageColorPicker"'
                 + ' animatePoint="false"'
                 + ' showHsv="false"'
                 + ' showRgb="false"'
                 + '>'
                   + '<script type="dojo/connect" data-dojo-event="onChange" data-dojo-args="evt">'
                     + 'dijit.byId("imageDropDown").set("value", evt);'
                     + 'dojo.byId("imageDropDown").style.background = evt;'
                   + '</script>'
                 + '</div>'
              + '</div>'
            + '</td></tr>'
            + '<tr><td style="height:auto%; width:100%;">'
              + '<label>Preview:</label>'
              + '<br>'
              + '<img id="previewPlaceHolder" style="width: 60px;"/>'
            + '</td></tr>'
            + '<tr><td style="height:auto%; width:100%;">'
              + '<label>Full size:</label>'
              + '<br>'
              + '<img id="bigImagePlaceHolder" style="width: 600px;"/>'
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
    },


    setItem : function(item) {

        this.inherited(arguments);

        var imageUrl = item[garm.app.Constants.FLD_IMAGE_URL]
                     ? item[garm.app.Constants.FLD_IMAGE_URL]
                     : garm.app.Constants.IMG_EMPTY
                     ;
        var image = dojo.attr('bigImagePlaceHolder', {
            src   : garm.app.Constants.IMG_LOADER,
            alt   : imageUrl,
            title : item[garm.app.Constants.FLD_NAME]
        });
        dojo.attr(image, 'src', imageUrl);

        var previewUrl = item[garm.app.Constants.FLD_IMAGE_PREVIEW_URL]
                       ? item[garm.app.Constants.FLD_IMAGE_PREVIEW_URL]
                       : garm.app.Constants.IMG_EMPTY
                       ;
        var preview = dojo.attr('previewPlaceHolder', {
            src   : garm.app.Constants.IMG_LOADER,
            alt   : previewUrl,
            title : item[garm.app.Constants.FLD_NAME]
        });
        dojo.attr(preview, 'src', previewUrl);

        var bgColor = item[garm.app.Constants.FLD_IMAGE_CLR]
                    ? item[garm.app.Constants.FLD_IMAGE_CLR][0]
                    : '#000000'
                    ;
        dijit.byId('imageColorPicker').setColor(bgColor);
        dojo.byId('imageDropDown').style.background = bgColor;
    }
});