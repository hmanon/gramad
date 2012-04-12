<?php
require_once dirname(__FILE__).'/../config.php';
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html dir="ltr">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <style type="text/css" media="screen">
            html, body {
            	width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
                overflow: hidden;
                background: #ff0000;
            }
            #area {
            	width: 100%;
                height: 100%;
            	background: #00ff00;
            }
			#holder {
            	width: 100%;
                height: 100%;
            	background: #0000ff;
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
        <script src="<?php echo DOJO_PATH;?>/dojo/dojo.js" type="text/javascript"></script>
        <script src="<?php echo RAPH_PATH;?>/raphael_2.1.0.js" type="text/javascript" charset="utf-8"></script>
        <script type="text/javascript">
            dojo.require("garm.app.SiteController");

            dojo.addOnLoad(function() {

                var main = new garm.app.SiteController("holder", "area");
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
    </head>

    <body>
	    <div id="preloader"></div>
	    <div id="area">
            <div id="holder"></div>
        </div>    
    </body>
</html>