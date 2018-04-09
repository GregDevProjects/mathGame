export default class Player extends Phaser.GameObjects.Sprite {
	constructor(config){

		//really have to do all this just to get game height!?
		let height = config.scene.scene.manager.game.renderer.height - 100;
		let width = config.scene.scene.manager.game.renderer.width;
		super(config.scene, width/2 , height, 'player1'); 
		config.scene.physics.world.enable(this); 
		this.body.setCollideWorldBounds(true);
		this.height = height;
		this.optionsGroup = this.scene.question;
		config.scene.add.existing(this);

		
	}
	//FIXME: keyboard is a settings 
	//FIXME: refactor control methods 
	update(keys, time, delta){
		this.scene.physics.overlap(this, this.optionsGroup, this.onPlayerOptionCollision);
		
		if (keys.left.isDown)
		{
		    this.body.setVelocityX(-260);
		}
		else if (keys.right.isDown)
		{
		    this.body.setVelocityX(260);
		}
		else
		{
		    this.body.setVelocityX(0);
		}

	    if(this.scene.input.activePointer.isDown){
	    	let pointerPlayerDistance = Math.abs(this.scene.input.x - this.x);

	    	if(pointerPlayerDistance < 8){
	    		return;
	    	}

			this.scene.physics.moveTo(
				this,  
				this.scene.input.x,// + this.scene.cameras.main.scrollX, 
				this.height,
				300
			);
			return;
	    } 
    	this.body.setVelocityX(0);
    	this.body.setVelocityY(0);
	    
	}

	onPlayerOptionCollision(player, option){
		option.isCorrectAnswer ? player.scene.question.resetQuestion() : player.scene.showGameOver();
    }

}