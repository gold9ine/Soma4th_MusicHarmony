<?php
$dbhost = "172.16.100.76";
$dbuser = "mh";
$dbpass = "thak2014";
$dbname = "mh";
  //Connect to MySQL Server
mysql_connect($dbhost, $dbuser, $dbpass);
  //Select Database
mysql_select_db($dbname) or die(mysql_error());
  // Retrieve data from Query String
$age = $_GET['age'];
$sex = $_GET['sex'];
$wpm = $_GET['wpm'];
  // Escape User Input to help prevent SQL Injection
$age = mysql_real_escape_string($age);
$sex = mysql_real_escape_string($sex);
$wpm = mysql_real_escape_string($wpm);
  //build query
$query = "SELECT * FROM ajax_example WHERE sex = '$sex'";
if(is_numeric($age))
  $query .= " AND age <= $age";
if(is_numeric($wpm))
  $query .= " AND wpm <= $wpm";
  //Execute query
$qry_result = mysql_query($query) or die(mysql_error());

  //Build Result String
$display_string = "<table>";
$display_string .= "<tr>";
$display_string .= "<th>Name</th>";
$display_string .= "<th>Age</th>";
$display_string .= "<th>Sex</th>";
$display_string .= "<th>WPM</th>";
$display_string .= "</tr>";

// Insert a new row in the table for each person returned
while($row = mysql_fetch_array($qry_result)){
  $display_string .= "<tr>";
  $display_string .= "<td>$row[name]</td>";
  $display_string .= "<td>$row[age]</td>";
  $display_string .= "<td>$row[sex]</td>";
  $display_string .= "<td>$row[wpm]</td>";
  $display_string .= "</tr>";
  
}
echo "Query: " . $query . "<br />";
$display_string .= "</table>";
echo $display_string;
?>
