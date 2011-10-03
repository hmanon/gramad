<?php
require_once(dirname(__FILE__).'/config.php');


function getSelectedForkPath() {

    if (!array_key_exists(COOKIE_FORK, $_COOKIE)) {
        return getCurrentForkPath();
    }
    $fork = $_COOKIE[COOKIE_FORK];
    forkShouldExists($fork);
    return DATAS_PATH.'/'.$fork;
}


function getCurrentForkPath() {
    
    return DATA_PATH;
}


function getDefaultForkPath() {
    
    return DATAS_PATH.'/'.DATA_DEFAULT;
}


function checkForkName($fork) {
    
    if (!preg_match(FORK_PREG, $fork)) { 
        throw new Exception('Fork`s name contains wrong characters');
    }
} 


function createFork($fork) {

    $path = DATAS_PATH.'/'.$fork;
    if (is_file($path)) {
        throw new Exception("Fork '$fork' already exists");
    }
    fclose(fopen($path, 'x'));
}


function selectFork($fork) {

    if (!setcookie(COOKIE_FORK, $fork)) {
        throw new Exception("Can`t select fork '$fork'");
    }
    $_COOKIE[COOKIE_FORK] = $fork;
}


function switchFork($fork) {

    clearstatcache();
    $link = getCurrentForkPath();
    if (file_exists($link)) {
        if (unlink($link)) {
            symlink(realpath(DATAS_PATH.'/'.$fork), $link);
        }
    }
    else {
        symlink(realpath(DATAS_PATH.'/'.$fork), $link);
    }
}


function isForkExists($fork) {

    $dirs = getForks();
    return array_key_exists($fork, $dirs);
}


function forkShouldExists($fork) {

    if (!isForkExists($fork)) {
        throw new Exception("Fork '$fork' not exists");
    }
}


function getForks($needlePath=null) {

    $datasPath  = realpath(DATAS_PATH);
    $needlePath = realpath($needlePath);

    $result = array();
    $handle = opendir($datasPath);
    if ($handle !== false) {
        while (false !== ($file = readdir($handle))) {
            $absPath = realpath("$datasPath/$file");
            if (is_readable($absPath) && is_file($absPath)) {
                $result[$file] = ($absPath == $needlePath);
            }
        }
        closedir($handle);
    }
    return $result;
}


function newtempnam($dir, $prefix, $postfix){

    $trailing_slash = ($dir[strlen($dir) - 1] == '/') ? "" : "/";
    if (   !is_dir(realpath($dir))
        || filetype(realpath($dir)) != "dir"
    ) {
        return false;
    }
    if (!is_writable($dir)){
        return false;
    }
    do {
        $seed = substr(md5(microtime().getmypid()), 0, 8);
        $filename = $dir . $trailing_slash . $prefix . $seed . $postfix;
    }
    while (file_exists($filename));
    fclose(fopen($filename, "w"));
    return $filename;
}
?>