export default class Player extends Phaser.GameObjects.Sprite {
	constructor(config){

		//really have to do all this just to get game height!?
		let height = config.scene.scene.manager.game.renderer.height - 100;
		let width = config.scene.scene.manager.game.renderer.width;
		super(config.scene, width/2 , height, 'player1'); 
		config.scene.physics.world.enable(this); 
		this.body.setCollideWorldBounds(true);
		this.height = height;
		//debugger;
		this.level = config.level;
		config.scene.add.existing(this);

	    this.keys = {
			left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
			right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
    	};

		
	}
	//FIXME: keyboard is a settings 
	//FIXME: refactor control methods 
	update(){
		//this.scene.physics.overlap(this, this.level.question, this.onPlayerOptionCollision);
		
		if (this.keys.left.isDown)
		{
		    this.body.setVelocityX(-260);
		}
		else if (this.keys.right.isDown)
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



}