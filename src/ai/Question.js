import Choice from '../sprites/Choice'
import Addition from './Addition'
import { getGameWidth, getGameHeight } from '../Helper'

//FIXME: use seperate class for actions that trigger game changes 
export default class Question extends Phaser.GameObjects.Group {
	constructor(config){
    super(config.scene); 
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.choices = config.choices;
    this.currentQuestion = config.problem;
    this.level = config.level;
    this.resetQuestion(this.currentQuestion);
	}

	update(){
    this.children.iterate((anOption) => {anOption.update();});
	}

  createChoices(){
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
    let totalChoiceWidth = choiceWidth * this.choices;
    return (getGameWidth() - totalChoiceWidth)/4;// 4 will change if more choices are added 
  }


  /* create the choices, or move them to the top of screen 
  * can't create/destroy them all the time as this can cause visual hitches
  */
  resetQuestion(nextQuestion){
    this.currentQuestion = nextQuestion;
    var currentQuestion = this.currentQuestion;
    if(this.children.size <= 0){
      this.createChoices();
    } else {
      this.moveChoicesToTop(currentQuestion);
    }
    
    this.displayCurrentQuestion();
  }

  moveChoicesToTop(currentQuestion){
    this.children.iterate((anOption, i) => {
      anOption.changeTextAndMoveToTop(
        currentQuestion.options[i], 
        (currentQuestion.options[i] == currentQuestion.answer)
      );
    });
  }

  //probably shouldn't be in this class
  displayCurrentQuestion(){
    if(this.displayText){
      this.displayText.setText('');
    } else {
      this.displayText = this.scene.add.text().setFont('40px Arial').setFill('#ffff00');
      this.displayText.y =50;
    }

    this.displayText.setText(this.currentQuestion.display);
 
    this.displayText.x = (getGameWidth() - this.displayText.width)/2;

  }
}