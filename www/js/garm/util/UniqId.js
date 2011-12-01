dojo.provide('garm.util.UniqId');

garm.util.UniqId.next = (function() {
    var value = 0;
    return function() {
        return 'UniqId' + (++value);
    };
})();