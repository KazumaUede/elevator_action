<div class ="buildings">
	<div class ="gates">
	</div>
	<div class ="building">
		<div class ="floorplate">
		<?php
			for($j = 0; $j <$option["floor"] ; ++$j){
			echo	'<div class ="plate">'.($option["floor"] - $j) .'</div>';
			}
		?>
		</div>
		<div class ="elevators">
			<?php
				for($i = 0; $i <$option["elevator"] ; ++$i){
					echo '<div class ="elevator">';
					echo '<div class="floors">';
					for($j = 0; $j <$option["floor"] ; ++$j){
						echo '<div class="flame"><div class="floor">';
						if($j === 0){
							for($k = 0; $k <$option["capacity"] ; ++$k){
								echo '<div class ="people"></div>';
							}
						}
						echo '<div class ="door">';
						echo '<div class ="doorleft"></div><div class ="doorright"></div></div>';
						echo '</div></div>';
					}
					echo '</div></div>';
				}
			?>
		</div>
	</div>
</div>
