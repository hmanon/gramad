dojo.provide('garm.components.main.form.FormUtil');


garm.components.main.form.FormUtil.PREPARE_COLOR_PICKER = function(label, item, field, defValue) {

    var color = item[field] ? item[field][0] : defValue;
    return '<label>' + label + '</label>'
         + '<div dojoType="dojox.widget.ColorPicker"'
           + ' name="' + field + '"'
           + ' animatePoint="false"'
           + ' value="' + color + '"'
           + '>'
         + '</div>'
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