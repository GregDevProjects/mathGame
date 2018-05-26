import Level from './ai/Level'
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

  preload() {
    this.load.spritesheet('blocks', 'src/img/blocks.png', {frameWidth:80, 'frameHeight':60});
    this.load.spritesheet('explosion', 'src/img/explosion.png', { 'frameWidth': 96, 'frameHeight': 96 });
    this.load.image('player1', 'src/img/player1.png');
    this.load.image('bg','src/img/bg.png');
  }

  create() {

    //START ANIMATION
    let config = {
      key: 'kaboom',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 11 }),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    };

    this.anims.create(config);
    //END ANIMATION

    this.bg = this.add.tileSprite(
      0, 
      0, 
      getGameWidth() *2, 
      getGameHeight() *2, 
      'bg'
    );

    this.level = new Level({scene: this});
    this.paused = true;
    this.resetGame(this.gameType);
  }

  update(time, delta) {
    //move bg 
   
    if(this.paused){
      this.pauseGame();
      return;
    }
    this.level.update();
    this.bg.tilePositionY -= 1;
  }

  pauseGame(){
    this.level.pause();
  }

  resetGame(questiontype){
    this.paused = false;
    this.level.reset(questiontype);
  }

  showGameOver(){
    debugger;
   this.scene.start(
     'GameOver', 
      {  
        question: this.level.question.currentQuestion.display, 
        answer: this.level.question.currentQuestion.answer,
        type: this.level.questionType
      }
    );

    this.paused = true;
  }
}