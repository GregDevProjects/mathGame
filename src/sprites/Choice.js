//TODO: method for creating text for spprite
export default class Choice extends Phaser.GameObjects.Sprite {
	constructor(config, x){
	 	super(config.scene, config.x, -100, 'option'); 
		config.scene.physics.world.enable(this);
		this.isCorrectAnswer = config.isCorrectAnswer;
	 	config.scene.add.existing(this); 	
	 	this.fontStyle = {font: "16px Arial", fill: "#ffffff"};
	 	this.text = this.scene.add.text(this.x, this.y, config.value, this.fontStyle);
	}

	update(){
      this.text.x =(this.x);
      this.text.y = (this.y);
      this.body.setVelocityY(160);
	}

	changeTextAndMoveToTop(newText, isCorrectAnswer){
      this.text.destroy();
      this.text = this.scene.add.text(this.x, this.y, newText, this.fontStyle);
      this.y = -this.height;    
      this.isCorrectAnswer = isCorrectAnswer;  
    }
}