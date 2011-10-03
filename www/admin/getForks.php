<?php
require_once(dirname(__FILE__).'/config.php');
require_once(dirname(__FILE__).'/util.php');


if (array_key_exists('switch', $_POST)) {
    $fork = $_POST['switch'];
    forkShouldExists($fork);
    switchFork($fork);
}
if (array_key_exists('select', $_POST)) {
    $fork = $_POST['select'];
    forkShouldExists($fork);
    selectFork($fork);
}

$needlePath = null;
if (array_key_exists('mark', $_POST)) {
    $mark = $_POST['mark'];
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
echo json_encode(getForks($needlePath));
?>