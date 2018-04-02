import Choice from '../sprites/Choice'
import Addition from './Addition'

export default class Question extends Phaser.GameObjects.Group {
	constructor(config){
    super(config.scene); 
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.choices = config.choices;
    this.complexity = config.complexity;
    this.maxNumber = config.maxNumber;
    this.currentQuestion = Addition.getAdditionQuestion(this.maxNumber,this.complexity, this.choices);
    this.createChildren();
    this.displayCurrentQuestion();
	}

	update(){
		this.children.entries.forEach(function(anOption){
			anOption.update();
		});
	}

  createChildren(){
    var startingPosition = 100;
    for(let i = 0; i < this.choices; i++){

  		this.children.entries.push(new Choice({
        scene: this.scene,
  			value: this.currentQuestion.options[i],
  			isCorrectAnswer: (this.currentQuestion.options[i] == this.currentQuestion.answer),
  			x: startingPosition
  		}));

      startingPosition+=200;
    }
  }

  //when player collides with the right option 
  resetQuestion(game){
    this.currentQuestion = Addition.getAdditionQuestion(this.maxNumber,this.complexity, this.choices);

    this.children.entries.forEach(function(anOption, i){
      //probably a better way to do this 
      let currentQuestion = anOption.scene.question.currentQuestion;
      anOption.changeTextAndMoveToTop(
        currentQuestion.options[i], 
        (currentQuestion.options[i] == currentQuestion.answer)
      );
    });

    this.displayCurrentQuestion();
  }

  //probably shouldn't be in this class
  displayCurrentQuestion(){
    if(this.displayText){
       this.displayText.destroy();
    }
    let output = this.currentQuestion.questions.join(" + ");
    this.displayText = this.scene.add.text(100, 100, output + ' = ' + this.currentQuestion.answer).setFont('64px Arial').setFill('#ffff00');
  }
}