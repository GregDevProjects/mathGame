import { getRandomInt } from '../Helper'

//TODO: method for creating text for spprite
export default class Choice extends Phaser.GameObjects.Sprite {
	constructor(config, x){
	 	super(config.scene, config.x, -100, 'blocks'); 
		config.scene.physics.world.enable(this);
		this.isCorrectAnswer = config.isCorrectAnswer;
	 	config.scene.add.existing(this); 	
	 	this.fontStyle = {font: "30px Arial", fill: "#ffffff", fontWeight : 'bolder' };
	 	this.text = this.scene.add.text(this.x, this.y, config.value, this.fontStyle);
	 	this.applyRandomTexture();
	}

	update(){
		this.body.setVelocityY(160);
		this.text.x = this.x - this.text.width/2;
		this.text.y = this.y - 12;
		
	}

	playKaboom(){
		this.text.destroy();
		return this.anims.play('kaboom',true);
	}

	changeTextAndMoveToTop(newText, isCorrectAnswer){
		this.visible = true;
		
		//FIXME: reword instead of destroy 
		this.text.destroy();
		this.text = this.scene.add.text(this.x, this.y, newText, this.fontStyle);
		this.applyRandomTexture();
		this.y = -this.height;    
		this.isCorrectAnswer = isCorrectAnswer;  
		
    }

    applyRandomTexture(){
    	if(this.texture.key !== 'blocks'){
    		this.texture.manager.setTexture(this, 'blocks', 0);
    	}
    	let newFrame = getRandomInt(0,3);
    	newFrame == 0 ? this.text.setColor('black') : null;
    	this.setFrame(newFrame);
    }
}