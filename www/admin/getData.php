<?php
require_once(dirname(__FILE__).'/config.php');
require_once(dirname(__FILE__).'/util.php');

if (array_key_exists('data', $_POST)) {
    $data = str_replace('\"', '"',$_POST['data']);

    if (array_key_exists('fork', $_POST)) {
        $fork = $_POST['fork'];
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
echo $result;
?>