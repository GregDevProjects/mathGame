import { Level } from './ai/Level'
import { Music } from './Music'
import { getGameWidth, getGameHeight } from './Helper'

export default class GameplayScene extends Phaser.Scene {
    constructor(test) {
      super({
        key: 'gamePlay',
        active: false
      });
    }

    init(data) {
      this.gameType = data.questionType;
    }

  create() {
    this.bg = this.add.tileSprite(
      0, 
      0, 
      getGameWidth() *2, 
      getGameHeight() *2, 
      'bg'
    );

    this.level = new Level({scene: this});
    this.music = new Music(
      { 
        scene: this,
        key: Music.getKeyForQuestionType(this.gameType)
      }
    ).play();
    this.paused = true;
    this.resetGame(this.gameType);
  }

  update(time, delta) {
    //move bg 

    if(this.paused){
      return;
    }
    this.level.update();
    this.bg.tilePositionY -= 1;
  }

  resetGame(questiontype){
    this.paused = false;
    this.level.reset(questiontype);
  }

  showGameOver(isVictorious){
    this.scene.stop();
    this.music.stop();
   this.scene.start(
     'GameOver', 
      {  
        question: this.level.question.currentQuestion.display, 
        answer: this.level.question.currentQuestion.answer,
        type: this.level.questionType,
        score: this.level.score,
        isVictorious: isVictorious
      }
    );

    this.paused = true;
  }
}