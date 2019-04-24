<div class ="buildings">
	<div class ="gates">
		<?php
			for($i = 0; $i <$floor ; ++$i){
				// echo '<div class ="gate" id ="F' . ($floor - $i ) .'">'. ($floor - $i ) .'F</div>';
				if (($floor - $i ) !==1){
					echo '<div class ="gate">';
						echo '<div class ="floorname" >'. ($floor - $i ) .'F</div>';
						echo '<div class ="count" ></div>';
						echo '<div class ="sum"></div>';
					echo '</div>';
				}else{
					echo '<div class ="gate">';
						echo '<div class ="floorname" >合計</div>';
						echo '<div class ="sum"></div>';
					echo '</div>';
				}
			}
			?>
	</div>
	<div class ="building">
		<div class ="elevators">
			<?php
				for($i = 0; $i <$elevator ; ++$i){
					echo '<div class ="elevator">';
					echo '<div class ="standby"></div>';
					echo '<div class="floors">';
					for($j = 0; $j < $floor; ++$j){
						echo '<div class="floor"></div>';
					}
					echo '</div></div>';
				}
			?>
		</div>
	</div>
</div>
