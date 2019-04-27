<?php 

if($_POST){
  print_r($_POST);
}else if($_GET){
  print_r($_GET);
}else{
  print("Not Data Request");
}