dojo.provide('garm.components.main.form.FormEmpty');

dojo.require('garm.components.main.form.FormBase');


dojo.declare('garm.components.main.form.FormEmpty', garm.components.main.form.FormBase, {

    init : function() {

        this.set('title', 'Please, select item to edit');
    }
});