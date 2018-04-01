InputHandler = {
	keyboardControlls: function(game){
		if (this.cursors.left.isDown)
		{
		    player.setVelocityX(-260);

		 //   player.anims.play('left', true);
		}
		else if (this.cursors.right.isDown)
		{
		    player.setVelocityX(260);

		   // playr.anims.play('right', true);
		}
		else
		{
		    player.setVelocityX(0);

		   // player.anims.play('turn');
		}
	},
	initControlls: function(){
		this.cursors = game.input.keyboard.createCursorKeys();
	}

}