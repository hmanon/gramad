dojo.provide('garm.components.main.form.FormUtil');
dojo.require('dijit.form.Button');


garm.components.main.form.FormUtil.PREPARE_COLOR_PICKER = function(label, item, field, defValue, buttons) {

    var color = item[field] ? item[field][0] : defValue;
    var pickerId = garm.util.UniqId.next();
    return '<label>' + label + '</label>'
         + '<table><tr><td>'
         + '<div dojoType="dojox.widget.ColorPicker"'
           + ' id="' + pickerId + '"'
           + ' name="' + field + '"'
           + ' animatePoint="false"'
           + ' webSafe="false"'
           + ' value="' + color + '"'
           + '/>'
         + '</td><td>'
         + (buttons && buttons['spreadLabel']
           ?
             ( '<button dojoType="dijit.form.Button">'
               + buttons['spreadLabel']
               + '<script type="dojo/method" data-dojo-event="onClick" data-dojo-args="evt">'
                 + 'dojo.publish(\'' + garm.app.Constants.TOPIC_SPREAD_FIELD + '\', [{'
                   + ' parentId: \'' + item['id'] + '\','
                   + ' field: \'' + field + '\','
                   + ' value: dijit.byId(\'' + pickerId + '\').get(\'value\')'
                 + '}]);'
               + '</script>'
             + '</button>'
             )
           : ''
           )
         + '</td></tr></table>'
         ;
};


garm.components.main.form.FormUtil.PREPARE_IMAGE = function(label, item, field, width, height, defValue, buttons) {

    var url = item[field]
            ? item[field]
            : (defValue ? defValue : garm.app.Constants.IMG_EMPTY)
            ;
    return '<label>' + label + '</label>'
    	 + '<table><tr><td>'
           + '<img'
             + ' style="width: ' + width + 'px; height: ' + height + 'px;"'
             + ' src="' + url +'"'
             + ' alt="' + url +'"'
             + ' title="' + label +'"'
           + '/>'
         + '</td><td>'
           + garm.components.main.form.FormUtil.PREPARE_BUTTONS(buttons, item)
         + '</td></tr></table>'
         ;
};


garm.components.main.form.FormUtil.PREPARE_DRAPES = function(label, item, field, defValue, buttons) {

    var drapes = item[field]
               ? item[field]
               : (defValue ? defValue : [[{ url : garm.app.Constants.IMG_EMPTY }]])
               ;
    var content = '<table style="cellspacing:0px">';
    dojo.forEach(drapes, function(row) {
        content += '<tr>';
        dojo.forEach(row, function(cell) {
            content += '<td>'
                     + '<img src="' + cell['url'] + '" alt="' + cell['url'] + '">'
                     + '</td>'
                     ;
        });
        content += '</tr>';
    });
    content += '</table>'
             ;
    return '<label>' + label + '</label>'
         + '<table><tr><td>'
         + content
         + '</td><td>'
           + garm.components.main.form.FormUtil.PREPARE_BUTTONS(buttons, item)
         + '</td></tr></table>'
         ;
};


garm.components.main.form.FormUtil.PREPARE_SOUND = function(label, item, field, buttons) {

    var url = item[field]
            ? item[field]
            : ''
            ;
    return '<label>' + label + '</label>'
         + '<table><tr><td>'
           + '<input type="text"'
             + ' name="' + field + '"'
             + ' value="' + url + '"'
             + '/>'
         + '</td><td>'
           + garm.components.main.form.FormUtil.PREPARE_BUTTONS(buttons, item)
         + '</td></tr></table>'
         ;           
};


garm.components.main.form.FormUtil.PREPARE_BUTTONS = function(buttons, item) {
    return (dojo.map(buttons ? buttons : [], function(button) {
        return '<button dojoType="dijit.form.Button">'
                + button['label']
                + '<script type="dojo/method" data-dojo-event="onClick" data-dojo-args="evt">'
                + 'dojo.publish(\'' + button['topic'] + '\', [\'' + item['id'] + '\']);'
                + '</script>'
              + '</button>'
              ;
    }).join(''));
}