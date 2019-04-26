<?php
	$pagetitle = "Elevator_action";
	require_once("./template/system_header.php");
	$floor = 13;
	$elevator = 6;
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
