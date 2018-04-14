import Question from './Question'
import Player from '../sprites/Player'
import Addition from './Addition'

//FIXME: enumify this
const QuestionTypes = { Addition: 1, Substraction: 2 };
//holds gameplay logic
//spawns player
//keeps track of correct questions to determine types of questions 
export default class Level { 

	constructor(config){
		//super(config.scene); 

	    this.question = new Question({
	        scene: config.scene,
	        choices: 3,
	        level: this,
	        problem: Addition.getAdditionQuestion(difficulty.s)
	    });
	    //debugger;
	    this.player = new Player({ 
	    	scene: config.scene, 
	    	level: this 
	    });

	    this.scene = config.scene;
	    this.score = 0;
	}

	onCorrectAnswer(){
		this.score++;
		this.question.resetQuestion(Addition.getAdditionQuestion(this.getDifficultyBasedOnScore()));
	}

	getDifficultyBasedOnScore(){
		if(this.score < 5 ) {
			return difficulty.s;
		}

		if(this.score < 10){
			return difficulty.m;
		}

		if(this.score < 15){
			return difficulty.l;
		}

		if(this.score < 20){
			return difficulty.xl;
		}

		return difficulty.xxl
	}

	update(){
		this.scene.physics.overlap(this.player, this.question, this.onPlayerQuestionCollision);
		this.player.update()
    	this.question.update();
	}

	onPlayerQuestionCollision(player, option){
		option.isCorrectAnswer ? player.level.onCorrectAnswer() : player.scene.showGameOver();
    }

    //should have pause methods 
	pause(){
		this.player.body.setVelocityX(0);
		this.question.children.entries.forEach(function(anOption){
			anOption.body.setVelocityY(0);
   		});
	}
	
	reset(){
		this.score = 0;
		this.question.resetQuestion(Addition.getAdditionQuestion(this.getDifficultyBasedOnScore()));
	}
	

}


//levelsettings 
const difficulty = {
	s: { choices: 3, complexity: 2, maxNumber:20 },
	m: { choices: 3, complexity: 2, maxNumber:40 },
	l: { choices: 3, complexity: 3, maxNumber:10 },
	xl: { choices: 3, complexity: 3, maxNumber:20 },
	xxl: { choices: 3, complexity: 3, maxNumber:40 }
} 