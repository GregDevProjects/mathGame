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

  preload() {
    this.load.spritesheet('blocks', 'src/img/blocks.png', {frameWidth:80, 'frameHeight':60});
    this.load.spritesheet('explosion', 'src/img/explosion.png', { 'frameWidth': 96, 'frameHeight': 96 });
    this.load.image('player1', 'src/img/player1.png');
    this.load.image('bg','src/img/bg.png');
    this.load.image('red', 'src/img/red.png');

    this.load.audio('addition_music', 'src/img/addition.mp3');
    this.load.audio('subtraction_music', 'src/img/subtraction.mp3');
    this.load.audio('multiplication_music', 'src/img/multiplication.mp3');
    this.load.audio('division_music', 'src/img/division.mp3');
  }

  create() {

    //START ANIMATION
    //FIXME: create a preloader scene so images/animations aren't created every time the scene starts
    //http://www.html5gamedevs.com/topic/36172-returning-to-scenes-how-to-stop-thisanimscreate-attempting-to-create-duplicate-keys/
    if(!this.anims.anims.has("kaboom")){
      let config = {
        key: 'kaboom',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 11 }),
        frameRate: 20,
        repeat: 0,
        hideOnComplete: true
      };

      this.anims.create(config);
    }
    //END ANIMATION

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