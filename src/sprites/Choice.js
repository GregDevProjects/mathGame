//TODO: method for creating text for spprite
export default class Choice extends Phaser.GameObjects.Sprite {
	constructor(config, x){
	 	super(config.scene, config.x, -100, 'option'); 
		config.scene.physics.world.enable(this);
		this.isCorrectAnswer = config.isCorrectAnswer;
	 	config.scene.add.existing(this);
	 	this.text = this.scene.add.text(this.x, this.y, config.value).setFont('32px Arial').setFill('#ffff00');
	}

	update(){
      this.text.x =(this.x);
      this.text.y = (this.y);
      this.body.setVelocityY(160);
	}

	changeTextAndMoveToTop(newText, isCorrectAnswer){
      this.text.destroy();
      this.text = this.scene.add.text(this.x, this.y, newText, {font: "16px Arial", fill: "#ffffff"});
      this.y = -this.height;    
      this.isCorrectAnswer = isCorrectAnswer;  
    }
}