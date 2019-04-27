<?php

class PDOManager extends PDO {

  private $p_SqlQuery;

  public static $SET_DSN = Array( SqlName => "mysql", Host => "localhost", DatabaseName => null, Charset => 'utf8', UserName => 'root', Password => 'root');
  public static function getDSN($obj){ return "${obj['SqlName']}:host=${obj['Host']};dbname=${obj['DatabaseName']};charset=${obj['Charset']}"; }


  public function setSqlFile($filename)
  {
    $this->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);
    $this->p_SqlQuery = file_get_contents($filename);

    return $this->p_SqlQuery;
  }

  public function runSqlFile()
  {
    return $this->query($this->p_SqlQuery);
  }

}
