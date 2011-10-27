<?php
require_once dirname(__FILE__).'/../../config.php';
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html dir="ltr">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <style type="text/css">
            html, body {
            	width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
                overflow: hidden;
                font-family: helvetica,arial,sans-serif;
                font-size: 90%;
            }
			#preloader {
			    width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
			    background: #fff
			    url('<?php echo DOJO_PATH;?>/dijit/icons/images/loadingAnimation_rtl.gif') no-repeat center center;
			    position: absolute;
			    z-index: 999;
			}
        </style>

	   <script type="text/javascript">
	        var dojoConfig = {
	            parseOnLoad: true,
	            isDebug: true,
	            debugAtAllCosts: true,
	            locale: 'en-us',
	            modulePaths: {
                    'garm': '../../garm',
                    'uuid': '../../uuid'
                }
	        };
	    </script>
        <script src="<?php echo DOJO_PATH;?>/dojo/dojo.js"></script>
        <script src="<?php echo DOJO_PATH;?>/dojo/garm.adminlayer.js"></script>
        <script type="text/javascript">
            dojo.require("garm.app.AppController");

            dojo.addOnLoad(function() {

                var main = new garm.app.AppController("main");
                main.init();

                setTimeout(function() {
                    dojo.fadeOut({
                        node:"preloader",
                        duration:700,
                        onEnd: function(){
                            dojo.style("preloader", "display", "none");
                        }
                    }).play();
                }, 1000);
            });
        </script>

        <link
            rel="stylesheet" type="text/css"
            href="<?php echo DOJO_PATH;?>/dijit/themes/claro/claro.css"
            />
        <link 
            rel="stylesheet"
            href="<?php echo DOJO_PATH;?>/dojox/widget/ColorPicker/ColorPicker.css"
            />
    </head>

    <body class="claro">
		<div id="preloader"></div>
        <div id="main"></div>
    </body>
</html>