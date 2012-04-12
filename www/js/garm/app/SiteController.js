dojo.provide('garm.app.SiteController');


dojo.declare('garm.app.SiteController', null, {

	_widthToHeight : 1024 / 768,

	_gameCanvas : null,
	_gameArea : null,

	_paper : null,


    constructor : function(holder, area) {
    	this._gameCanvas = dojo.byId(holder);
    	this._gameArea   = dojo.byId(area);
    	this._paper = Raphael(holder, '100%', '100%');
    },


    init : function() {
    	var rect = this._paper.rect(0, 0, '100%', '100%');
    	var circle = this._paper.circle('50%', '50%', '10%');

    	this._onResize();

    	dojo.connect(window, 'onresize', this, this._onResize);
    	dojo.connect(window, 'orientationchange', this, this._onResize);
    },


    _onResize : function() {
        var newWidth  = window.innerWidth;
        var newHeight = window.innerHeight;
        var newWidthToHeight = newWidth / newHeight;
        if (newWidthToHeight > this._widthToHeight) {
            newWidth = newHeight * this._widthToHeight;
        }
        else {
            newHeight = newWidth / this._widthToHeight;
        }
        dojo.style(this._gameArea, {
            //"fontSize" : (newWidth / 400) + 'em',
            "width"  : newWidth  + 'px',
            "height" : newHeight + 'px',
            "marginTop"  : ((window.innerHeight - newHeight) / 2) + 'px',
            "marginLeft" : ((window.innerWidth  - newWidth)  / 2) + 'px'
        });
        dojo.style(this._gameCanvas, {
            "width"  : newWidth + 'px',
            "height" : newHeight + 'px'
        });
    }
});