<?php


 function getCounter()
{
	$fileName = "counter.dat"; 

	if( file_exists($fileName) ) {
		list($numVisitors)=file($fileName); // Read contents from the file
	} else {
		$numVisitors=0; // This is the first time the page is accessed
	}

	$numVisitors=$numVisitors+1; // Increase the count

	$fil=fopen($fileName,"w"); 	// Open the file to replace old value
	fputs($fil,$numVisitors);  	// Write the new count to the file
	fclose($fil);				// Close the file
	return $numVisitors;		// Return the new count
}

$count = getCounter();

echo $count;
?>
