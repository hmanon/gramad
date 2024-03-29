<?php
if (!defined("PATH_SEPARATOR"))
      define("PATH_SEPARATOR", getenv("COMSPEC")? ";" : ":");
ini_set("include_path", ini_get("include_path").PATH_SEPARATOR.dirname(__FILE__));

define('DEFAULT_TZ', 'Europe/Moscow');

//define('DOJO_PATH', '../js/dojo-release-1.6.1-src/release');
define('DOJO_PATH', '../js/dojo-release-1.6.1-src');
//define('DOJO_PATH', '../js/dojo-release-1.7.2-src');

define('RAPH_PATH', '../js/raphael');

define('DATAS_PATH', '../../forks');

define('DATA_PATH',  '../fork');
define('IMAGE_PATH', '../images');
define('SOUND_PATH', '../sounds');

define('IMAGE_PREFIX', 'img');
define('SOUND_PREFIX', 'snd');

define('DATA_DEFAULT', 'default');

define('COOKIE_FORK', 'garm_fork');
define('FORK_PREG', '/(^[a-zA-Z0-9:\-\+ ]+$)/');

date_default_timezone_set(DEFAULT_TZ);


function exception_handler($exception) {
    header('HTTP/1.0 500 Internal Server Error');
    echo "Uncaught exception: {$exception->getMessage()}\nat {$exception->getFile()}({$exception->getLine()})\ntrace: {$exception->getTraceAsString()}";
}
set_exception_handler('exception_handler');


function error_handler($errno, $errstr, $errfile, $errline) {
    header('HTTP/1.0 500 Internal Server Error');
    echo "Error[$errno]: $errstr\nat $errfile($errline)";
    exit();
}
set_error_handler("error_handler");
?>