<?php
include './db.php';
error_reporting(E_ALL & ~E_NOTICE);

class main{
  public function __construct(){
    
  }

  public function SystemInitialize(){

    //データベースを初期化
    try{
      $db = new Database(PDOManager::$SET_DSN);
      $db->initialize("./system_db_initialize.sql");          
    } catch(PDOException $e){
      exit("データベースエラー" . $e->getMessage());
    }
    
  }
}




