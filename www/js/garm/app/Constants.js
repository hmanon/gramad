dojo.provide('garm.app.Constants');

dojo.require("dijit.Menu");
dojo.require("dijit.MenuItem");

garm.app.Constants.IMAGE_POST_URL = 'postImage.php';
garm.app.Constants.SOUND_POST_URL = 'postSound.php';

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
garm.app.Constants.SND_EMPTY  = '';

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
garm.app.Constants.FLD_CONTINENT_IMAGE_URL = 'continentImageUrl';
garm.app.Constants.FLD_COUNTRY_DRAPES    = 'countryDrapes';
garm.app.Constants.FLD_IMAGE_PREVIEW_URL = 'imagePreviewUrl';
garm.app.Constants.FLD_IMAGE_FULL_URL    = 'imageFullUrl';
garm.app.Constants.FLD_IMAGE_URL         = 'imageUrl';

garm.app.Constants.FLD_SOUND_URL = 'soundUrl';

garm.app.Constants.FLD_SITE_CLR  = 'siteColor';
garm.app.Constants.FLD_PAGE_CLR  = 'pageColor';
garm.app.Constants.FLD_HEAD_CLR  = 'headColor';

garm.app.Constants.DEF_SITE_CLR = '#BEBEBE';
garm.app.Constants.DEF_PAGE_CLR = '#FFFFFF';
garm.app.Constants.DEF_HEAD_CLR = '#FF6004';

garm.app.Constants.IMAGE_WIDTH  = 768;
garm.app.Constants.IMAGE_HEIGHT = 576;

garm.app.Constants.IMAGE_PREVIEW_WIDTH  = 48;
garm.app.Constants.IMAGE_PREVIEW_HEIGHT = 36;

garm.app.Constants.IMAGE_FULL_WIDTH  = 1024;
garm.app.Constants.IMAGE_FULL_HEIGHT = 768;

garm.app.Constants.COUNTRY_DRAPES_WIDTH  = 256;
garm.app.Constants.COUNTRY_DRAPES_HEIGHT = 192;
garm.app.Constants.COUNTRY_DRAPES_CROP_WIDTH_COUNT  = 5;
garm.app.Constants.COUNTRY_DRAPES_CROP_HEIGHT_COUNT = 4;

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

garm.app.Constants.TOPIC_ADD_CONTINENT       = 'garm.app.Constants.topicAddContinent';
garm.app.Constants.TOPIC_CHA_CONTINENT_IMAGE = 'garm.app.Constants.topicChaContinentImage';
garm.app.Constants.TOPIC_ADD_COUNTRY         = 'garm.app.Constants.topicAddCountry';
garm.app.Constants.TOPIC_CHA_COUNTRY_DRAPES  = 'garm.app.Constants.TOPIC_CHA_COUNTRY_DRAPES';
garm.app.Constants.TOPIC_ADD_IMAGE           = 'garm.app.Constants.topicAddImage';
garm.app.Constants.TOPIC_CHA_IMAGE           = 'garm.app.Constants.topicChaImage';
garm.app.Constants.TOPIC_CHA_PREVIEW         = 'garm.app.Constants.topicChaPreview';
garm.app.Constants.TOPIC_CHA_FULL            = 'garm.app.Constants.topicChaFull';
garm.app.Constants.TOPIC_CHA_SOUND           = 'garm.app.Constants.topicChaSound';

garm.app.Constants.TOPIC_SPREAD_FIELD        = 'garm.app.Constants.TOPIC_SPREAD_FIELD';

garm.app.Constants.TOPIC_SHOW_MESSAGE = 'garm.app.Constants.topicShowMessage';
garm.app.Constants.TOPIC_SHOW_SUCCESS = 'garm.app.Constants.topicShowSuccess';
garm.app.Constants.TOPIC_SHOW_ERROR   = 'garm.app.Constants.topicShowError';

garm.app.Constants.PREPARE_ITEM_MENU = function(menu, item) {

    var children = menu.getChildren();
    for (var i in children) {
        menu.removeChild(children[i]);
    }
    var menuValues = garm.app.Constants.PREPARE_ITEM_MENU_VALUES(item);
    for (var i in menuValues) {
        if (menuValues[i] != null) {
            var menuItem = new dijit.MenuItem({
                label     : menuValues[i].label,
                iconClass : menuValues[i].iconClass
            });
            dojo.connect(menuItem, 'onClick', menuValues[i], function() {
                dojo.publish(this.topic, [this.item]);
            });
            menu.addChild(menuItem);
        }
        else {
            menu.addChild(new dijit.MenuSeparator());
        }
    }
    return (menuValues || []).length > 0;
};


garm.app.Constants.PREPARE_ITEM_MENU_VALUES = function(item) {

    var itemLabel = item[garm.app.Constants.FLD_NAME];
    var separator = null;
    var editItem = {
        label : 'Edit "' + itemLabel + '"',
        topic : garm.app.Constants.TOPIC_EDT_ITEM,
        iconClass: "dijitIcon dijitIconEditTask",
        item  : item
    };
    var renameItem = {
        label : 'Rename "' + itemLabel + '"',
        topic : garm.app.Constants.TOPIC_REN_ITEM,
        iconClass: "dijitIcon dijitIconEdit",
        item  : item
    };
    var deleteItem = {
        label : 'Delete "' + itemLabel + '"',
        topic : garm.app.Constants.TOPIC_DEL_ITEM,
        iconClass: "dijitIcon dijitIconDelete",
        item  : item
    };
    var changeSound = {
        label : 'Change Sound',
        topic : garm.app.Constants.TOPIC_CHA_SOUND,
        iconClass: "dijitIcon dijitIconFile",
        item  : item
    };
    var result = {};
    result[garm.app.Constants.TYPE_CONFIG] = [
        { label : 'Save changes',
          topic : garm.app.Constants.TOPIC_SAVE_DATA,
          iconClass: "dijitIcon dijitIconSave",
          item  : item
        },
        separator,
        { label : 'Discard changes',
          topic : garm.app.Constants.TOPIC_LOAD_DATA,
          iconClass: "dijitIcon dijitIconUndo",
          item  : item
        },
        separator,
        { label : 'Create Version',
          topic : garm.app.Constants.TOPIC_FORK_CREATE,
          iconClass: "dijitIcon dijitIconUndo",
          item  : item
        },
        { label : 'Select Version',
          topic : garm.app.Constants.TOPIC_FORK_SELECT,
          iconClass: "dijitIcon dijitIconUndo",
          item  : item
        },
        { label : 'Activate Version',
          topic : garm.app.Constants.TOPIC_FORK_SWITCH,
          iconClass: "dijitIcon dijitIconUndo",
          item  : item
        }
    ];
    result[garm.app.Constants.TYPE_ABOUT] = [
        //editItem
    ];
    result[garm.app.Constants.TYPE_CREDITS] = [
        //editItem
    ];
    result[garm.app.Constants.TYPE_CONTACTS] = [
        //editItem
    ];
    result[garm.app.Constants.TYPE_CATALOG] = [
        //editItem,
        separator,
        { label : 'Add Continent',
          topic : garm.app.Constants.TOPIC_ADD_CONTINENT,
          iconClass: "dijitIcon dijitLeaf",
          item  : item
        }
    ];
    result[garm.app.Constants.TYPE_CONTINENT] = [
        //editItem,
        renameItem,
        separator,
        deleteItem,
        separator,
        { label : 'Change Image',
          topic : garm.app.Constants.TOPIC_CHA_CONTINENT_IMAGE,
          iconClass: "dijitIcon dijitIconFile",
          item  : item
        },
        changeSound,
        separator,
        { label : 'Add Country',
          topic : garm.app.Constants.TOPIC_ADD_COUNTRY,
          iconClass: "dijitIcon dijitLeaf",
          item  : item
        }
    ];
    result[garm.app.Constants.TYPE_COUNTRY] = [
        //editItem,
        renameItem,
        { label : 'Change Drapes',
          topic : garm.app.Constants.TOPIC_CHA_COUNTRY_DRAPES,
          iconClass: "dijitIcon dijitLeaf",
          item  : item
        },
        changeSound,
        separator,
        deleteItem,
        separator,
        { label : 'Add Images',
          topic : garm.app.Constants.TOPIC_ADD_IMAGE,
          iconClass: "dijitIcon dijitLeaf",
          item  : item
        }
    ];
    result[garm.app.Constants.TYPE_IMAGE] = [
        //editItem,
        renameItem,
        { label : 'Change Preview Image',
          topic : garm.app.Constants.TOPIC_CHA_PREVIEW,
          iconClass: "dijitIcon dijitIconFile",
          item  : item
        },
        { label : 'Change Normal Image',
          topic : garm.app.Constants.TOPIC_CHA_IMAGE,
          iconClass: "dijitIcon dijitIconFile",
          item  : item
        },
        { label : 'Change Fullscreen Image',
          topic : garm.app.Constants.TOPIC_CHA_FULL,
          iconClass: "dijitIcon dijitIconFile",
          item  : item
        },
        separator,
        deleteItem
    ];
    return result[item.type];
};