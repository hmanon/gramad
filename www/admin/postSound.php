<?php
require_once dirname(__FILE__).'/../../config.php';
require_once 'include/util.php';

$result = treat_postSound($_FILES, $_POST);
?>

<html>
  <body>
    <textarea>
<?php echo $result; ?>    
    </textarea>
  </body>
</html>