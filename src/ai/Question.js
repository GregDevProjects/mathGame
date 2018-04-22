import Choice from '../sprites/Choice'
import Addition from './Addition'

//FIXME: use seperate class for actions that trigger game changes 
export default class Question extends Phaser.GameObjects.Group {
	constructor(config){
    super(config.scene); 
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.choices = config.choices;
    this.currentQuestion = config.problem;
    this.level = config.level;
    this.createChildren();
    this.displayCurrentQuestion();
	}

	update(){
    this.children.iterate((anOption) => {anOption.update();});
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
  resetQuestion(problem){
    this.currentQuestion = problem;
    var currentQuestion = this.currentQuestion;

    this.children.iterate((anOption, i) => {
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

    this.displayText.setText(this.currentQuestion.display);
    let height = this.scene.scene.manager.game.renderer.height;
    let width = this.scene.scene.manager.game.renderer.width;   
    this.displayText.x = (width - this.displayText.width)/2;

  }
}