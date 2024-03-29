dojo.provide('garm.components.popup.PopUpFactory');

dojo.require('garm.util.UniqId');

dojo.require('dijit.Dialog');
dojo.require('dijit.form.Form');
dojo.require('dijit.form.ValidationTextBox');
dojo.require('dijit.form.RadioButton');


dojo.declare('garm.components.popup.PopUpFactory', null, {

	statics : {

		_instance : null,

		getInstance : function() {

			if (this._instance == null) {
				this._instance = new garm.components.popup.PopUpFactory();
			}
			return this._instance;
		}
	},


	progress : function(params) {

        var popUp = this.create(dojo.mixin({
            title : 'Operation in progress',
            content : '<img'
                      + ' src="' + garm.app.Constants.IMG_LOADER  +'"'
                      + ' alt="Wait Please.."'
                      + '/>'
        }, params));

        + '<img id="previewPlaceHolder"'
        + ' style="width: ' + garm.app.Constants.IMAGE_PREVIEW_WIDTH + 'px; height: ' + garm.app.Constants.IMAGE_PREVIEW_HEIGHT + 'px;"'
        + '/>'

        params.deferred.addCallback(function(data) {
            popUp.hide();
            popUp.destroyRecursive();
        });

        params.deferred.addErrback(function(error) {
            popUp.hide();
            popUp.destroyRecursive();
        });
        popUp.show();

        return popUp;
    },


	info : function(params) {

	    return this.message(dojo.mixin({
            title : 'Info'
        }, params));
	},


    error : function(params) {

        return this.message(dojo.mixin({
            title : 'Error'
        }, params));
    },


    message : function(params) {

        var popUp = this.create(dojo.mixin({
            options : {'ok' : 'OK'}
        }, params));

        var subscription = dojo.subscribe(popUp.id, this, function(result) {

            dojo.unsubscribe(subscription);
            if(dojo.isFunction(params.onOk)) {
                params.onOk(result);
            }
            popUp.hide();
            popUp.destroyRecursive();
        });
        popUp.show();

        return popUp;
    },


    askOptions : function(params) {

        var options = params.options;
        var content = '';
        for(option in options) {
            var optionId = garm.util.UniqId.next();
            content +=
                '<br/>'
              + '<input'
                + ' id="' + optionId + '"'
                + ' type="radio"'
                + ' dojoType="dijit.form.RadioButton"'
                + ' name="option"'
                + ' value="' + option + '"'
                + ' checked="' + options[option] + '"'
                + ' />'
              + '<label for="' + optionId + '">' + option + '</label>';
        }
        this.askFor(dojo.mixin(params, {
            content : content
        }));
    },


    askNewValue : function(params) {

        var content =
            '<label>Input:</label>'
            + '<div'
              + ' dojoType="dijit.form.ValidationTextBox"'
              + ' name="newValue"'
              + ' required="true"'
              + ' value="' + params.oldValue + '"'
              + ' >'
          + '</div>';
        this.askFor(dojo.mixin(params, {
            content : content
        }));
    },


    askForFiles: function(params) {

        var content =
            '<div>'
            + '<label>Select files:</label>'
            + ((params.maxFileSize)
                    ? '<input type="hidden" name="MAX_FILE_SIZE" value="' + params.maxFileSize + '"/>'
                    : '')
            + ((params.resizeWidth)
                    ? '<input type="hidden" name="resizeWidth" value="' + params.resizeWidth + '"/>'
                    : '')
            + ((params.resizeHeight)
                    ? '<input type="hidden" name="resizeHeight" value="' + params.resizeHeight + '"/>'
                    : '')
            + ((params.cropWidthCount)
                    ? '<input type="hidden" name="cropWidthCount" value="' + params.cropWidthCount + '"/>'
                    : '')
            + ((params.cropHeightCount)
                    ? '<input type="hidden" name="cropHeightCount" value="' + params.cropHeightCount + '"/>'
                    : '')
            + '<input'
              + ' type="file"'
              + ' name="fileURL[]"'
              + ' id="fileURL"'
              + (params.multiple ? ' multiple="true"' : '')
              + ' />'
          + '</div>';
        this.askFor(dojo.mixin(params, {
            content : content
        }));
    },


	askFor : function(params) {

	    var popUp = this.create(dojo.mixin(params, {
	        options : {
	            'ok'     : 'OK',
	            'cancel' : 'Cancel'
	        }
        }));
        var subscription = dojo.subscribe(popUp.id, this, function(result) {

            dojo.unsubscribe(subscription);
            switch (result.option) {
                case 'ok':
                    if(dojo.isFunction(params.onOk)) {
                        params.onOk(result);
                    }
                    break;

                default:
                    if(dojo.isFunction(params.onCancel)) {
                        params.onCancel(result);
                    }
                    break;
            }
            popUp.hide();
            popUp.destroyRecursive();
        });
        popUp.show();

        return popUp;
	},


    create : function(params) {

    	var id = garm.util.UniqId.next();
    	var formId = garm.util.UniqId.next();

    	var buttons = '';

    	for (var buttonId in params.options) {
            buttons +=
                '<button'
                + ' dojoType="dijit.form.Button"'
                + ' type="button"'
                + ' onClick="dojo.publish(\'' + id + '\', [{'
                  + ' option : \'' + buttonId + '\','
                  + ' value : dijit.byId(\'' + id + '\').get(\'value\'),'
                  + ' form  : dijit.byId(\'' + formId + '\')'
                  + '}]);"'
                + ' >'
                + params.options[buttonId]
              + '</button>';
        };

    	var content =
    	    '<form'
    	    + ' id="' + formId + '"'
    	    + ' dojoType="dijit.form.Form"'
    	    + ' encType="multipart/form-data"'
    	    + (params.action ? (' action="' + params.action + '"') : '')
    	    + (params.method ? (' method="' + params.method + '"') : '')
    	    + ' >'
            + '<div'
              + ' class="dijitDialogPaneContentArea"'
              + ' style="min-width: 120px; min-height: 90px; max-width: 600px; max-height: 600px; overflow: auto">'
              + params.content
            + '</div>'
            + '<div class="dijitDialogPaneActionBar">' + buttons + '</div>'
          + '</form>';

    	var result = new dijit.Dialog({
    		id    : id,
    		title : params.title,
            style : "width: auto; height: auto;",
            content : content
    	});
    	return result;
    }
});


garm.components.popup.PopUpFactory.getInstance = function() {

    return garm.components.popup.PopUpFactory.prototype.statics.getInstance();
};