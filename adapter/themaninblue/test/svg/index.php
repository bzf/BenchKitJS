<?php




header("Content-type: text/xml");

$fileName = "index.xml";

$filePointer = fopen($fileName, "r");
$xmlData = fread($filePointer, filesize($fileName));
fclose($filePointer);

print($xmlData);

return true;




?>