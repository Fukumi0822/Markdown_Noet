<?php
include './database_lib.php';

  // データベース設定
  PDOManager::$SET_DSN['SqlName']       = 'mysql';
  PDOManager::$SET_DSN['Host']          = 'localhost';
  PDOManager::$SET_DSN['DatabaseName']  = 'docms';
  PDOManager::$SET_DSN['Charset']       = 'utf8';
  PDOManager::$SET_DSN['UserName']      = 'root';
  PDOManager::$SET_DSN['Password']      = 'root';




class Database{

  private $Database; 

  public function __construct($DSN)
  {
    $this->Database = new PDOManager(PDOManager::getDSN($DSN), 'root', 'root',
    Array(PDO::ATTR_EMULATE_PREPARES => false));

  }

  public function initialize($filename)
  {
    $this->Database->setSqlFile($filename);
    $this->Database->runSqlFile();
  }

  

}