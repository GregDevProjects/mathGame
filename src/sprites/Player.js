export default class Player extends Phaser.GameObjects.Sprite {
	constructor(config){
		 super(config.scene, 300 , 600 , 'option'); 
		 config.scene.physics.world.enable(this);  
		 this.optionsGroup = this.scene.question;
		 config.scene.add.existing(this);
	}

	update(keys, time, delta){
		this.scene.physics.overlap(this, this.optionsGroup, this.onPlayerOptionCollision);

		if (keys.left.isDown)
		{
		    this.body.setVelocityX(-260);

		 //   player.anims.play('left', true);
		}
		else if (keys.right.isDown)
		{
		    this.body.setVelocityX(260);

		   // playr.a.nims.play('right', true);
		}
		else
		{
		    this.body.setVelocityX(0);

		}
	}

	onPlayerOptionCollision(player, option){
      option.isCorrectAnswer ? player.scene.question.resetQuestion() : '';
    }

}