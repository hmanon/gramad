dojo.provide('garm.components.main.form.FormBase');

dojo.require('garm.app.Constants');

dojo.require('dijit.Menu');
dojo.require('dijit.MenuItem');
dojo.require('dijit.form.Form');
dojo.require('dijit.form.Button');

dojo.require("dojo.html");


dojo.declare('garm.components.main.form.FormBase', dijit.form.Form, {

    menuButton : null,
    menu : null,
    contentNode : null,
    lastItem : null,


    init : function() {
        this.menu = new dijit.Menu({
            style : "display: none;"
        });
        this.menuButton = new dijit.form.DropDownButton({
            label : "Actions",
            dropDown : this.menu
        }).placeAt(this.domNode);

        this.contentNode = dojo.create('div', {
            style : 'width: 100%; height: 100%; overflow: auto;'
        }, this.domNode);
    },


    setItem : function(item) {

        this.lastItem = item;

        this.set('title', item[garm.app.Constants.FLD_NAME]);
        this.menuButton.setAttribute(
            'disabled',
            !garm.app.Constants.PREPARE_ITEM_MENU(this.menu, item)
        );
        var value = {};
        for(field in this.get('value')) {
            value[field] = item[field];
        }
        this.set('value', value);
    },


    commitChanges : function() {

        var isValid = this.validate();
        if (isValid) {
            dojo.publish(
                garm.app.Constants.TOPIC_UPD_ITEM,
                [{  item  : this.lastItem,
                    value : this.get('value')
                }]
            );
        }
        else {
            alert("Please, fix errors at first.");
        }
        return isValid;
    },


    setContent : function(content, params) {
        dojo.html.set(this.contentNode, content, params);
    }
});