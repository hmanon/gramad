<?php
require_once dirname(__FILE__).'/config.php';


function treat_getData($request) {
    if (array_key_exists('data', $request)) {
        $data = str_replace('\"', '"',$request['data']);
    
        if (array_key_exists('fork', $request)) {
            $fork = $request['fork'];
            checkForkName($fork);
            createFork($fork);
            selectFork($fork);
        }
    	if (file_put_contents(getSelectedForkPath(), $data)) {
    	    chmod(getSelectedForkPath(), 0666);
    	}
    }
    $result = file_get_contents(getSelectedForkPath());
    if ($result === false) {
        $result = file_get_contents(getDefaultForkPath());
    /*    
        if ($result === false) {
            switchFork(getDefaultForkPath());
            $result = file_get_contents(getDefaultForkPath());
        }
    */    
    }
    return $result;
}


function treat_getForks($request) {
    if (array_key_exists('switch', $request)) {
        $fork = $request['switch'];
        forkShouldExists($fork);
        switchFork($fork);
    }
    if (array_key_exists('select', $request)) {
        $fork = $request['select'];
        forkShouldExists($fork);
        selectFork($fork);
    }
    
    $needlePath = null;
    if (array_key_exists('mark', $request)) {
        $mark = $request['mark'];
        switch ($mark) {
            
            case 'selected':
                try {
            	    $needlePath = getSelectedForkPath();
                }
                catch(Exception $e) {
                    $needlePath = getDefaultForkPath();
                }
            	break;
    
            case 'current':
            	$needlePath = getCurrentForkPath();
            	break; 
            
            default:
                $needlePath = null;
        }
    }
    return json_encode(getForks($needlePath));
}


function treat_PostImage($files){ 
    return json_encode(treatImages($files['imageURL']));
}


function treatImages($files) {

    $folder = IMAGE_PATH;

    static $errCodes = array(
        UPLOAD_ERR_OK         => 'There is no error, the file uploaded with success.',
        UPLOAD_ERR_INI_SIZE   => 'The uploaded file exceeds the upload_max_filesize directive in php.ini.',
        UPLOAD_ERR_FORM_SIZE  => 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form.',
        UPLOAD_ERR_PARTIAL    => 'The uploaded file was only partially uploaded.',
        UPLOAD_ERR_NO_FILE    => 'No file was uploaded.',
        UPLOAD_ERR_NO_TMP_DIR => 'Missing a temporary folder.',
        UPLOAD_ERR_CANT_WRITE => 'Failed to write file to disk.',
        UPLOAD_ERR_EXTENSION  => 'A PHP extension stopped the file upload'
    );
    if (empty($files)) {
        return 'Unknown error';
    }
    if (!is_dir(realpath($folder))) {
        if (!mkdir($folder, 0777)) {
            return "Can`t create folder: $folder";
        }
    }

    $response = array();

    foreach ($files['name'] as $i => $name) {

        $error     = $files['error'][$i];
        $name      = $files['name'][$i];
        $extension = pathinfo($name, PATHINFO_EXTENSION);

        $response[$name]['result'] = false;
        $response[$name]['status'] = $errCodes[$error];

        switch ($error) {

            case UPLOAD_ERR_OK:
                $path = newtempnam($folder, 'img', empty($extension) ? '' : ".$extension");
                if ($path === false) {
                    $response[$name]['status'] = 'Can`t create temporary file';
                }
                else if (!move_uploaded_file($files['tmp_name'][$i], $path)) {
                    $response[$name]['status'] = 'Can`t move uploaded file';
                }
                else {
                    $response[$name]['url']    = $path;
                    $response[$name]['result'] = true;
                }
                break;

            default:
                break;
        }
    }
    return (object)$response;
}


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