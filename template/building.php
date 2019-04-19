<?php
?>
<div class ="building">
	<div class ="gates">
		<?php
			for($i = 0; $i <$floor ; ++$i){
				echo '<div class ="gate" id ="' . ($floor - $i ) .'F"></div>';
			}
			?>
	</div>
	<div class ="elevators">
		<?php
			for($i = 0; $i <$elevator ; ++$i){
				echo '<div class ="elevator" id ="elevator'. $i .'">';
				echo '<div class ="standby" id ="stand'. $i .'"></div>';
				echo '<ul class="floors">';
				for($j = 0; $j < $floor; ++$j){
					echo '<li id ="' . ($floor - $j ) .'F"></li>';
				}
				echo '</ul></div>';
			}
		?>
	</div>
</div>
