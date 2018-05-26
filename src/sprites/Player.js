import { getGameWidth, getGameHeight } from '../Helper'

export default class Player extends Phaser.GameObjects.Sprite {
	constructor(config){
		super(config.scene, getGameWidth()/2 , getGameHeight() - 50, 'player1'); 
		config.scene.physics.world.enable(this); 
		this.body.setCollideWorldBounds(true);
		this.level = config.level;
		config.scene.add.existing(this);

	    this.keys = {
			left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
			right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
    	};

		
	}
	//FIXME: keyboard is a setting 
	//FIXME: refactor control methods 
	update(){
			
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
				this.scene.input.x,
				getGameHeight() - 50,
				300
			);
			return;
	    } 
    	this.body.setVelocityX(0);
    	this.body.setVelocityY(0);	    
	}
}