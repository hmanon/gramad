dojo.provide('garm.app.SiteController');

dojo.declare('garm.app.SiteController', null, {

    constructor : function(rootNode) {
    	var paper = Raphael(rootNode, 320, 200);
    	var circle = paper.circle(50, 40, 10);
    	// Sets the fill attribute of the circle to red (#f00)
    	circle.attr("fill", "#f00");

    	// Sets the stroke attribute of the circle to white
    	circle.attr("stroke", "#fff");
    },


    init : function() {
    }
});