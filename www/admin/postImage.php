<?php
require_once dirname(__FILE__).'/../../include/config.php';
require_once 'util.php';

$result = treat_PostImage($_FILES);
?>

<html>
  <body>
    <textarea>
<?php echo $result; ?>    
    </textarea>
  </body>
</html>