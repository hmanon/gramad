/**
 * Administration Part dojo Layer
 */

dojo.provide("garm.adminlayer");


dojo.require("dojo.html");
dojo.require("dojo.io.iframe");
dojo.require('dojo.data.ItemFileWriteStore');

dojo.require('dijit.Dialog');
dojo.require("dijit.Menu");
dojo.require("dijit.MenuItem");
dojo.require("dijit.Tree");
dojo.require("dijit.tree.ForestStoreModel");
dojo.require("dijit.tree.dndSource");
dojo.require('dijit.form.Form');
dojo.require('dijit.form.ValidationTextBox');
dojo.require('dijit.form.RadioButton');
dojo.require('dijit.form.Button');
dojo.require("dijit.form.DropDownButton");
dojo.require('dijit.form.SimpleTextarea');
dojo.require('dijit.layout.ContentPane');
dojo.require('dijit.layout.BorderContainer');
dojo.require('dijit.layout.TabContainer');

dojo.require("dojox.widget.ColorPicker");

dojo.require('uuid.UUID');

dojo.require('garm.app.Constants');
dojo.require("garm.app.AdminController");
dojo.require('garm.components.popup.PopUpFactory');
dojo.require("garm.components.main.MainController");
dojo.require('garm.components.main.MainStore');
dojo.require('garm.components.main.MainMenuController');
dojo.require('garm.components.main.form.FormBase');
dojo.require('garm.components.main.form.FormStub');
dojo.require('garm.components.main.form.FormEmpty');
dojo.require('garm.components.main.form.FormAbout');
dojo.require('garm.components.main.form.FormCredits');
dojo.require('garm.components.main.form.FormContacts');
dojo.require('garm.components.main.form.FormCatalog');
dojo.require('garm.components.main.form.FormContinent');
dojo.require('garm.components.main.form.FormCountry');
dojo.require('garm.components.main.form.FormImage');
dojo.require("garm.components.main.tree.ContextMenu");
dojo.require('garm.components.main.tree.TreeController');
dojo.require('garm.components.main.form.FormController');


/*
dojo.require("dojo.parser");
dojo.require("dojo.NodeList-fx");
dojo.require("dojo.data.ItemFileReadStore");
dojo.require("dojox.data.AndOrReadStore");
dojo.require("dojo.back");
dojo.require("dojox.fx._base");
dojo.require("dojo.cookie");
*/