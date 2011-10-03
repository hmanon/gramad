dojo.provide('garm.components.main.form.FormBase');

dojo.require('garm.app.Constants');

dojo.require('dijit.form.Form');


dojo.declare('garm.components.main.form.FormBase', dijit.form.Form, {

    lastItem : null,


    init : function() {

    },


    setItem : function(item) {

        this.lastItem = item;

        this.set('title', item[garm.app.Constants.FLD_NAME]);

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
    }
});