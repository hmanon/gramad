dojo.provide('garm.app.Constants');

garm.app.Constants.IMAGE_POST_URL = 'postImage.php';

garm.app.Constants.STORE_FORK_URL = 'getForks.php';

garm.app.Constants.STORE_GET_URL  = 'getData.php';
garm.app.Constants.STORE_POST_URL = 'getData.php';
garm.app.Constants.STORE_STRUCT = {
    data : {
        "identifier": "id",
        "label": "name",
        "items": [
              {
            	"id"  : 1,
            	"name": "Config",
                "type": garm.app.Constants.TYPE_CONFIG
              }
        ]
    },
    clearOnClose : true
};

garm.app.Constants.IMG_LOADER = dojo.moduleUrl('dijit', 'icons/images/loadingAnimation_rtl.gif');
garm.app.Constants.IMG_EMPTY  = dojo.moduleUrl('dijit', '../../../../assets/question.jpeg');

garm.app.Constants.TYPE_CONFIG    = 'config';
garm.app.Constants.TYPE_ABOUT     = 'about';
garm.app.Constants.TYPE_CREDITS   = 'credits';
garm.app.Constants.TYPE_CONTACTS  = 'contacts';
garm.app.Constants.TYPE_CATALOG   = 'catalog';
garm.app.Constants.TYPE_CONTINENT = 'continent';
garm.app.Constants.TYPE_COUNTRY   = 'country';
garm.app.Constants.TYPE_IMAGE     = 'image';
garm.app.Constants.TYPE_UNKNOWN   = 'unknown';
garm.app.Constants.TYPE_NOTHING   = '';

garm.app.Constants.FLD_ID        = 'id';
garm.app.Constants.FLD_PID       = 'pid';
garm.app.Constants.FLD_CHILDREN  = 'children';
garm.app.Constants.FLD_TYPE      = 'type';
garm.app.Constants.FLD_NAME      = 'name';
garm.app.Constants.FLD_ABOUT     = 'aboutText';
garm.app.Constants.FLD_CREDITS   = 'creditsText';
garm.app.Constants.FLD_CONTACTS  = 'contactsText';
garm.app.Constants.FLD_IMAGE_PREVIEW_URL = 'imagePreviewUrl';
garm.app.Constants.FLD_IMAGE_URL         = 'imageUrl';
garm.app.Constants.FLD_IMAGE_CLR         = 'imageColor';

garm.app.Constants.IMAGE_WIDTH  = 1024;
garm.app.Constants.IMAGE_HEIGHT = 768;

garm.app.Constants.IMAGE_PREVIEW_WIDTH  = 48;
garm.app.Constants.IMAGE_PREVIEW_HEIGHT = 36;

garm.app.Constants.STORE_META = (function() {

    var meta = {};

    meta[garm.app.Constants.TYPE_COUNTRY] = {};
    meta[garm.app.Constants.TYPE_COUNTRY]
        [garm.app.Constants.TYPE_IMAGE] = {min : 0, max : 25, defName : 'Image'};

    meta[garm.app.Constants.TYPE_CONTINENT] = {};
    meta[garm.app.Constants.TYPE_CONTINENT]
        [garm.app.Constants.TYPE_COUNTRY] = {min : 5, max : 5, defName : 'Country'};

    meta[garm.app.Constants.TYPE_CATALOG] = {};
    meta[garm.app.Constants.TYPE_CATALOG]
        [garm.app.Constants.TYPE_CONTINENT] = {min : 5, max : 5, defName : 'Continent'};

    return function() { return meta; };
})()();


garm.app.Constants.TOPIC_LOAD_DATA = 'garm.app.Constants.topicLoadData';
garm.app.Constants.TOPIC_SAVE_DATA = 'garm.app.Constants.topicSaveData';

garm.app.Constants.TOPIC_FORK_CREATE = 'garm.app.Constants.topicForkCreate';
garm.app.Constants.TOPIC_FORK_SELECT = 'garm.app.Constants.topicForkSelect';
garm.app.Constants.TOPIC_FORK_SWITCH = 'garm.app.Constants.topicForkSwitch';

garm.app.Constants.TOPIC_UPDATE_UI = 'garm.app.Constants.topicUpdateUI';

garm.app.Constants.TOPIC_EDT_ITEM = 'garm.app.Constants.topicEdtItem';
garm.app.Constants.TOPIC_REN_ITEM = 'garm.app.Constants.topicRenItem';
garm.app.Constants.TOPIC_DEL_ITEM = 'garm.app.Constants.topicDelItem';
garm.app.Constants.TOPIC_UPD_ITEM = 'garm.app.Constants.topicUpdItem';

garm.app.Constants.TOPIC_ADD_CONTINENT = 'garm.app.Constants.topicAddContinent';
garm.app.Constants.TOPIC_ADD_COUNTRY   = 'garm.app.Constants.topicAddCountry';
garm.app.Constants.TOPIC_ADD_IMAGE     = 'garm.app.Constants.topicAddImage';
garm.app.Constants.TOPIC_CHA_IMAGE     = 'garm.app.Constants.topicChaImage';
garm.app.Constants.TOPIC_CHA_PREVIEW   = 'garm.app.Constants.topicChaPreview';

garm.app.Constants.TOPIC_SHOW_MESSAGE = 'garm.app.Constants.topicShowMessage';
garm.app.Constants.TOPIC_SHOW_SUCCESS = 'garm.app.Constants.topicShowSuccess';
garm.app.Constants.TOPIC_SHOW_ERROR   = 'garm.app.Constants.topicShowError';