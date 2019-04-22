<div class ="buildings">
	<div class ="gates">
		<?php
			for($i = 0; $i <$floor ; ++$i){
				// echo '<div class ="gate" id ="F' . ($floor - $i ) .'">'. ($floor - $i ) .'F</div>';
				if (($floor - $i ) !==1){
					echo '<div class ="gate" id ="F' . ($floor - $i ) .'">';
						echo '<div class ="floorname" >'. ($floor - $i ) .'F</div>';
						echo '<div class ="count" id ="count' . ($floor - $i ) .'"></div>';
						echo '<div class ="sum" id ="sum' . ($floor - $i ) .'"></div>';
					echo '</div>';
				}else{
					echo '<div class ="gate" id ="F' . ($floor - $i ) .'">';
						echo '<div class ="floorname" >合計</div>';
						echo '<div class ="sum" id ="sum' . ($floor - $i ) .'"></div>';
					echo '</div>';
				}
			}
			?>
	</div>
	<div class ="building">
		<div class ="elevators">
			<?php
				for($i = 0; $i <$elevator ; ++$i){
					echo '<div class ="elevator" id ="elevator'. $i .'">';
					echo '<div class ="standby" id ="stand'. $i .'"></div>';
					echo '<ul class="floors">';
					for($j = 0; $j < $floor; ++$j){
						echo '<li id ="F' . ($floor - $j ) .'"></li>';
					}
					echo '</ul></div>';
				}
			?>
		</div>
	</div>
</div>
