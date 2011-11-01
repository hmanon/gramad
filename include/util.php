<?php
require_once dirname(__FILE__).'/../config.php';
require_once 'libs/Zebra/Zebra_Image.php';


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


function treat_postImage($files, $request) {
    try {
        $images = $files['imageURL'];
        $images = treatImages ($images, $request);
        $images = resizeImages($images, $request);
        $images = cropImages  ($images, $request);
        return json_encode((object)$images);
    }
    catch(Exception $e) {
        throw $e;
    }
}


function resizeImages(&$images, $request) {
    foreach($images as &$image) {
        resizeImage($image, $request);
    }
    return $images;
}


function resizeImage(&$image, $request) {
    if (!$image['result']) {
        return;
    }
    $resizeWidth  = array_key_exists('resizeWidth',  $request) ? $request['resizeWidth']  : false;
    $resizeHeight = array_key_exists('resizeHeight', $request) ? $request['resizeHeight'] : false;
    if (   ($resizeWidth  === false) 
        && ($resizeHeight === false)
    ) {
        return;
    }
    $zebraImage = new Zebra_Image();
    $zebraImage->source_path = $image['url'];
    $zebraImage->target_path = $image['url'];
    $zebraImage->jpeg_quality = 100;
    
    $image['result'] = $zebraImage->resize($resizeWidth, $resizeHeight, ZEBRA_IMAGE_CROP_CENTER);
    $image['status'] = extractZebraError($zebraImage);
}


function cropImages(&$images, $request) {
    foreach($images as &$image) {
        cropImage($image, $request);
    }
    return $images;
}


function cropImage(&$image, $request) {
    if (!$image['result']) {
        return;
    }
    $cropWidthCount  = array_key_exists('cropWidthCount',  $request) ? $request['cropWidthCount']  : false;
    $cropHeightCount = array_key_exists('cropHeightCount', $request) ? $request['cropHeightCount'] : false;
    if (   ($cropWidthCount  === false) 
        && ($cropHeightCount === false)
    ) {
        return;
    }
    list($width, $height) = getimagesize($image['url']);
    for($h = 0; $h < $cropHeightCount; ++$h) {
        for($w = 0; $w < $cropWidthCount; ++$w) {
            $zebraImage = new Zebra_Image();
            $zebraImage->source_path = $image['url'];
            $zebraImage->target_path = 
            	dirname($image['url'])
              . DIRECTORY_SEPARATOR
              . basename($image['url'], '.'.pathinfo($image['url'], PATHINFO_EXTENSION))
              . "_{$w}_{$h}"
              . '.'.pathinfo($image['url'], PATHINFO_EXTENSION)
              ;
            $zebraImage->jpeg_quality = 100;
            
            $image['result'] = $zebraImage->crop(
                ($w + 0) * $width  / $cropWidthCount,
                ($h + 0) * $height / $cropHeightCount,
                ($w + 1) * $width  / $cropWidthCount,
                ($h + 1) * $height / $cropHeightCount
            );
            $image['status'] = extractZebraError($zebraImage);
            if (!array_key_exists('crop', $image)) {
                $image['crop'] = array();
            }
            if (!array_key_exists($h, $image['crop'])) {
                $image['crop'][$h] = array();
            }
            $image['crop'][$h][$w] = array(
                'url' => $zebraImage->target_path
            );
        }
    }
}


function extractZebraError($zebraImage) {
    static $errCodes = array(
        0 => 'There is no error, the file resized with success.',
        1 => 'Source file could not be found.',
        2 => 'Source file is not readable.',
        3 => 'Could not write target file.',
        4 => 'Unsupported source file format.',
        5 => 'Unsupported target file format.',
        6 => 'GD library version does not support target file format.',
        7 => 'GD library is not installed.',
        8 => '"chmod" command is disabled via configuration'
    );
    return array_key_exists($zebraImage->error, $errCodes)
        ? $errCodes[$zebraImage->error] 
        : 'Unknown error status'
        ;
}


function treatImages($files, $request) {
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
    
    $folder = IMAGE_PATH;

    if (empty($files)) {
        throw new Exception('Unknown error');
    }
    if (!is_dir(realpath($folder))) {
        if (!mkdir($folder, 0777)) {
            throw new Exception("Can`t create folder: $folder");
        }
    }
    $response = array();
    foreach ($files['name'] as $i => $name) {
        $error     = $files['error'][$i];
        $name      = $files['name'] [$i];
        $extension = pathinfo($name, PATHINFO_EXTENSION);

        $response[$name]['result'] = false;
        $response[$name]['status'] = array_key_exists($error, $errCodes)
            ? $errCodes[$error] 
            : 'Unknown error status'
            ;

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
    return $response;
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