<?php
	$pagetitle = "Elevator_action";
	require_once("./template/system_header.php");
		try{
			$pdo = new PDO("mysql:host=localhost; dbname=elevator_action2;charset=utf8","sample", "sample");
			$sql = 'SELECT * FROM options ';
			$stmt = $pdo->prepare($sql);
			$stmt->execute();
		}catch (PDOException $e) {
			print('接続失敗:' . $e->getMessage());
			die();
		}
		while($result = $stmt->fetch(PDO::FETCH_ASSOC)){
			$option = $result;
		}
		// echo $option["floor"];
		// echo $option["elevator"];
		// echo $option["capacity"];

?>
<div class ="city">
	<div class ="sky">
		<div class ="left">
			<?php require("./template/building.php"); ?>
		</div>
		<div class ="right">
			<?php require("./template/building.php"); ?>
		</div>
	</div>
	<div class ="ground">
	</div>

</div>
<!-- フッター -->
<?php require_once("./template/system_footer.php"); ?>
