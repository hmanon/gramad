<?php
require_once(dirname(__FILE__).'/config.php');
require_once(dirname(__FILE__).'/util.php');

$result = json_encode(treatImages($_FILES['imageURL']));
?>

<html>
  <body>
    <textarea>
<?php echo $result; ?>    
    </textarea>
  </body>
</html>

<?php
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
?>