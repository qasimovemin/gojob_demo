<?php 
/**
* Easy Code Framework
* 
* @author  Emin Azeroglu
* @var     @facebook https://www.facebook.com/emin.azeroglu10
* @var     @instagram https://www.instagram.com/azeroglu.emin/
* @var     @web http://codelab.az 
* 
*/

class DataBase
{

	/* Variables */
	protected static $Db, $Query;

	/* Connect Database */
	public function __construct($Host,$DbName,$User,$Password,$Charset)
	{	
		if(!self::$Db){
			try{
				self::$Db 	=	new PDO("mysql:host={$Host}; dbname={$DbName}; charset={$Charset}",$User,$Password);
				self::$Db 	->	query("SET NAMES " . $Charset);
				self::$Db 	->	query("SET CHARACTER SET " . $Charset);
			}
			catch(PDOException $e){
				echo $e->getMessage();
			}
		}
		return self::$Db;
	}

	/* Insert Data Method */
	public static function Insert($Table,$Data,$Sql)
	{
		self::$Query   =    self::$Db -> prepare("INSERT INTO $Table SET $Data");
		self::$Query   ->   execute($Sql);
		if(self::$Query){
			return 1;
		}
		else{
			return 0;
		}
	}

	/* Update Data Method */
	public static function Update($Table,$Data,$Where,$Sql)
	{
		self::$Query 	=	self::$Db -> prepare("UPDATE $Table SET $Data WHERE $Where ORDER BY Id ASC");
		self::$Query 	->	execute($Sql);
		if(self::$Query){
			return 1;
		}
		else{
			return 0;
		}
	}

	/* Delete Data Method */
	public static function Delete($Table,$Where,$Sql)
	{
		self::$Query 	=	self::$Db -> prepare("DELETE FROM $Table WHERE $Where ORDER BY Id ASC");
		self::$Query 	->	execute($Sql);
		if(self::$Query){
			return 1;
		}
		else{
			return 0;
		}
	}

	/* Query Data Method */
	public static function Query($All,$Table,$Order,$Limit = null)
	{
		self::$Query 	=	self::$Db -> query("SELECT $All FROM $Table ORDER BY $Order $Limit");
		return self::$Query;
	}

	/* Prepare Data Method */
	public static function Prepare($All,$Table,$Where,$Sql,$Order,$Limit = null)
	{
		self::$Query 	=	self::$Db -> prepare("SELECT $All FROM $Table $Where ORDER BY $Order $Limit");
		self::$Query 	->	execute($Sql);
		return self::$Query;
	}

	/* Fetch Data Method */
	public static function Fetch()
	{
		if(self::$Query){
			return self::$Query -> fetch(PDO::FETCH_ASSOC);
		}
	}

	/* Count Data Method */
	public static function Count($Table,$Where,$Sql,$Limit = null)
	{
		self::$Query 	=	self::$Db->prepare("SELECT Id FROM $Table $Where ORDER BY Id ASC $Limit");
		self::$Query 	->	execute($Sql);
		if(self::$Query){
			return self::$Query-> rowCount();
		}
		else{
			return false;
		}
	}

	/* Last Order Id Return Method */
	public static function OrderId($Table,$Id = null)
	{	
		if($Id != null)
			self::$Query 	=	self::Prepare("OrderId",$Table,"WHERE Id = ?",array($Id),"OrderId DESC","LIMIT 1");
		else
			self::$Query 	=	self::Query("OrderId",$Table,"OrderId DESC","LIMIT 1");
		$row = self::Fetch();
		return $row["OrderId"];
	}

	/* Last Id Method */
	public static function LastId()
	{	
		return self::$Db->lastInsertId();
	}


	/* Close Database */
	public function __destruct()
	{
		self::$Db 	=	null;	
	}

}