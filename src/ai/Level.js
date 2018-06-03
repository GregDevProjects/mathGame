import Question from './Question'
import Player from '../sprites/Player'
import { Problem, Questiontypes, Difficulty } from './Problem'

export const MAX_SCORE = 20;

//holds gameplay logic
//spawns player
//keeps track of correct questions to determine types of questions 
export class Level { 

	constructor(config){
		this.questionType = config.scene.gameType;

	    this.question = new Question({
	        scene: config.scene,
	        choices: 3,
	        level: this,
	        problem: Problem.getQuestion(Difficulty.s, this.questionType)
	    });

	    this.player = new Player({ 
	    	scene: config.scene, 
	    	level: this 
	    });

		this.scene = config.scene;
		this.reset(this.questionType);
		this.allowPlayerQuestionOverlap = true;
	}

	onCorrectAnswer(){
		this.score++;
		if(this.score > MAX_SCORE){
			this.onVictory();
			return;
		}
		this.resetQuestionBasedOnScoreAndType();
	}

	disablePlayerQuestionOverlap(){
		this.allowPlayerQuestionOverlap = false;
	}

	onVictory(){
		this.disablePlayerQuestionOverlap();
		this.player.disableControllsAndFlyToTop().then(
			() => {
				this.scene.showGameOver(true);
			}
		);	
	}

	resetQuestionBasedOnScoreAndType(){
		this.question.resetQuestion(
			Problem.getQuestion(
				this.getDifficultyBasedOnScore(),
				this.questionType
			)
		);
	}

	getDifficultyBasedOnScore(){
		if(this.score < 5 ) {
			return Difficulty.s;
		}

		if(this.score < 10){
			return Difficulty.m;
		}

		if(this.score < 15){
			return Difficulty.l;
		}

		if(this.score <= 20){
			return Difficulty.xl;
		}

		return Difficulty.xxl
	}

	update(){
		if(this.allowPlayerQuestionOverlap){
			this.scene.physics.overlap(this.player, this.question, this.onPlayerQuestionCollision, undefined , this);
		}
		this.player.update()
    	this.question.update();
	}

	onPlayerQuestionCollision(player, option){
		if(option.isCorrectAnswer) {
			player.level.onCorrectAnswer();
			return;			
		}

		option.playKaboom().on('animationcomplete', function() { 
			this.showGameOver(false); 
		}, this.scene);

		player.death();
    }

    //should have pause methods 
	pause(){
		return;
		this.player.body.setVelocityX(0);
		this.question.children.entries.forEach(function(anOption){
			anOption.body.setVelocityY(0);
   		});
	}

	reset(questionType){
		this.questionType = questionType;
		this.score = 0;
		this.resetQuestionBasedOnScoreAndType();
	}
}