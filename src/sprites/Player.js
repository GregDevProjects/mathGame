import { getGameWidth, getGameHeight, getPlayerBottomOffset } from '../Helper'

export default class Player extends Phaser.GameObjects.Sprite {
	constructor(config){
		super(config.scene, getGameWidth()/2 , getGameHeight() - getPlayerBottomOffset(), 'player1'); 
		this.scene = config.scene;
		this.scene.physics.world.enable(this); 
		this.body.setCollideWorldBounds(true);
		this.level = config.level;
		this.scene.add.existing(this);
		this.moveSpeed = 300;
	    this.keys = {
			left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
			right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
    	};

		this.emitter = config.scene.add.particles('red').createEmitter({
			speed: 80,
			scale: { start: 1, end: 0 },
			blendMode: 'ADD',
			gravityY: 700
		});
	
		this.emitter.startFollow(this).followOffset = {x: 0, y: 30};
		this.flyingToTop = false;
		this.victoryAnimationPromise = new Promise((resolve, reject)=>{
			this.victoryAnimationFinished = resolve;
		});

	  
	}

	death(){
		this.emitter.setVisible(false);
		this.destroy();
	}

	update(){
		if(!this.active){
			return;
		}
		if(!this.flyingToTop){
			if(!this.isPlayerPressingKey()){
				this.handleTouchControlls();
			}
			return;
		}		
		this.y-=7;
		if(this.body.blocked.up){
			this.destroy();
			this.victoryAnimationFinished();
		}
		
	}

	growAndShrink(){
		this.scene.tweens.add(
			{ targets: this, duration: 300, scaleX: 1.5,scaleY: 1.5,yoyo: true } 
		);
	}

	handleTouchControlls(){
	    if(this.scene.input.activePointer.isDown){
	    	let pointerPlayerDistance = Math.abs(this.scene.input.x - this.x);

	    	if(pointerPlayerDistance < 6){
	    		return;
	    	}

			this.scene.physics.moveTo(
				this,  
				this.scene.input.x,
				getGameHeight() - getPlayerBottomOffset(),
				this.moveSpeed
			);
			return;
		} 
		this.body.setVelocityX(0);
    	this.body.setVelocityY(0);	
	}

	isPlayerPressingKey(){
		if (this.keys.left.isDown){		
			this.body.setVelocityX(-this.moveSpeed);
			return true;
		}else if (this.keys.right.isDown){
			this.body.setVelocityX(this.moveSpeed);
			return true;
		}
		this.body.setVelocityX(0);
		return false;
	}

	disableControllsAndFlyToTop(){
		this.flyingToTop = true;
		return this.victoryAnimationPromise;
	}
}