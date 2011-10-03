dojo.provide('garm.components.main.form.FormController');

dojo.require('garm.app.Constants');
dojo.require('garm.components.main.form.FormStub');
dojo.require('garm.components.main.form.FormEmpty');
dojo.require('garm.components.main.form.FormAbout');
dojo.require('garm.components.main.form.FormCredits');
dojo.require('garm.components.main.form.FormContacts');
dojo.require('garm.components.main.form.FormCatalog');
dojo.require('garm.components.main.form.FormContinent');
dojo.require('garm.components.main.form.FormCountry');
dojo.require('garm.components.main.form.FormImage');

dojo.require('dijit.layout.ContentPane');
dojo.require('dijit.layout.TabContainer');


dojo.declare('garm.components.main.form.FormController', null, {

    _parent : null,

    _container : null,

    _forms : null,

    _lastForm : null,


    constructor : function(parent) {

        this._parent = parent;

        this._createUI();

        dojo.subscribe(
            garm.app.Constants.TOPIC_EDT_ITEM, this, this._onEditItem
        );
        dojo.subscribe(
            garm.app.Constants.TOPIC_UPDATE_UI, this, this._updateUI
        );
    },


    commitChanges : function() {

        if (this._lastForm != null) {
            return this._lastForm.commitChanges();
        }
        return true;
    },


    _updateUI : function() {

        this._switchForm(garm.app.Constants.TYPE_NOTHING);
    },


    _createUI : function() {

        this._container = new dijit.layout.TabContainer({
            style: 'height: 100%; width: 100%;'
        }).placeAt(this._parent.domNode);

        this._forms  = this._createForms();
        for (type in this._forms) {
            var form = this._forms[type];
            form.init();
        }
    },


    _createForms : function() {

        var generalParam = {
            style   : "height: 100%; width: 100%;",
            encType : "multipart/form-data"
        };
        var result = {};
        result[garm.app.Constants.TYPE_UNKNOWN]   = new garm.components.main.form.FormStub     (generalParam);
        result[garm.app.Constants.TYPE_NOTHING]   = new garm.components.main.form.FormEmpty    (generalParam);
        result[garm.app.Constants.TYPE_ABOUT]     = new garm.components.main.form.FormAbout    (generalParam);
        result[garm.app.Constants.TYPE_CREDITS]   = new garm.components.main.form.FormCredits  (generalParam);
        result[garm.app.Constants.TYPE_CONTACTS]  = new garm.components.main.form.FormContacts (generalParam);
        result[garm.app.Constants.TYPE_CATALOG]   = new garm.components.main.form.FormCatalog  (generalParam);
        result[garm.app.Constants.TYPE_CONTINENT] = new garm.components.main.form.FormContinent(generalParam);
        result[garm.app.Constants.TYPE_COUNTRY]   = new garm.components.main.form.FormCountry  (generalParam);
        result[garm.app.Constants.TYPE_IMAGE]     = new garm.components.main.form.FormImage    (generalParam);
        return result;
    },


    _onEditItem : function(item) {

        if (   (this._lastForm != null)
            && (this._lastForm._lastItem == item)) {
            return;
        }
        if (this.commitChanges()) { // commit old
            this._switchForm(item.type);
            this._lastForm.setItem(item);
        }
    },


    _switchForm : function(type) {

        if (this._lastForm != null) {
            this._container.removeChild(this._lastForm);
        }
        this._lastForm = this._forms[type];
        if (this._lastForm == undefined) {
            this._lastForm = this._forms[garm.app.Constants.TYPE_UNKNOWN];
        }
        this._container.addChild(this._lastForm);

        setTimeout(dojo.hitch(this, function() {
            this._container.layout();
        }), 10);
    }
});