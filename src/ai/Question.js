import Choice from '../sprites/Choice'
import Addition from './Addition'

//FIXME: use seperate class for actions that trigger game changes 
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

  setComplexity(complexity) {
    this.complexity = complexity;
  }

	update(){
		this.children.entries.forEach(function(anOption){
			anOption.update();
		});
	}

  createChildren(){
    var choiceWidth = 100;
    var spacing = this.calcChoiceSpacing(choiceWidth);
    var startingPosition = spacing + choiceWidth/2;
    for(let i = 0; i < this.choices; i++){

  		this.children.entries.push(new Choice({
        scene: this.scene,
  			value: this.currentQuestion.options[i],
  			isCorrectAnswer: (this.currentQuestion.options[i] == this.currentQuestion.answer),
  			x: startingPosition
  		}));

      startingPosition+=spacing + choiceWidth;
    }
  }

  calcChoiceSpacing(choiceWidth){
    let height = this.scene.scene.manager.game.renderer.height;
    let width = this.scene.scene.manager.game.renderer.width;   
    let totalChoiceWidth = choiceWidth * this.choices;
    return (width - totalChoiceWidth)/4;// 4 will change if more choices are added 
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
      this.displayText.setText('');
    } else {
      this.displayText = this.scene.add.text().setFont('40px Arial').setFill('#ffff00');
      this.displayText.y =50;
    }
    let output = this.currentQuestion.questions.join(" + ");
    this.displayText.setText(output);// + ' = ' + this.currentQuestion.answer);
    let height = this.scene.scene.manager.game.renderer.height;
    let width = this.scene.scene.manager.game.renderer.width;   
    this.displayText.x = (width - this.displayText.width)/2;

  }
}