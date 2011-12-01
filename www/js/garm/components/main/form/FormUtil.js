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
           + '>'
         + '</div>'
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


garm.components.main.form.FormUtil.PREPARE_IMAGE = function(label, item, field, width, height, defValue) {

    var url = item[field]
            ? item[field]
            : (defValue ? defValue : garm.app.Constants.IMG_EMPTY)
            ;
    return '<label>' + label + '</label>'
         + '<br>'
         + '<img'
           + ' style="width: ' + width + 'px; height: ' + height + 'px;"'
           + ' src="' + url +'"'
           + ' alt="' + url +'"'
           + ' title="' + label +'"'
         + '/>'
         ;
};


garm.components.main.form.FormUtil.PREPARE_DRAPES = function(label, item, field, defValue) {

    var drapes = item[field]
               ? item[field]
               : (defValue ? defValue : [[{ url : garm.app.Constants.IMG_EMPTY }]])
               ;
    var content = '<label>' + label + '</label>';

    content += '<table style="cellspacing:0px">';
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
    content += '</table>';
    return content;
};


garm.components.main.form.FormUtil.PREPARE_SOUND = function(label, item, field) {

    var url = item[field]
            ? item[field]
            : ''
            ;
    return '<label>' + label + '</label>'
         + '<br>'
         + '<input type="text"'
           + ' name="' + field + '"'
           + ' value="' + url + '"'
           + '>'
           + '</input>'
         ;
};