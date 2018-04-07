import Player from './sprites/Player'
import Question from './ai/Question'



export default class GameplayScene extends Phaser.Scene {
    constructor(test) {
      super({
        key: 'GamePlay'
      });
      // debugger; 
      // this.height = this.scene.manager.game.renderer.height;
      // this.width = this.scene.manager.game.renderer.width;
      this.jquery = require('jquery');
    }
  preload() {
    this.load.image('option', 'src/img/option.png');
    this.load.image('player1', 'src/img/player1.png');

    //this.showMenu();
  }

  create() {
    this.question = new Question({
        scene: this,
        choices: 3,
        complexity: 3,
        maxNumber: 20
    });

    this.player = new Player({ scene: this });

    this.keys = {
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
    };

    this.paused = false;
  }

  update(time, delta) {
    if(this.paused){
      this.pauseGame();
      return;
    }
    this.player.update(this.keys, time, delta)
    this.question.update();
  }

  pauseGame(){
    this.player.body.setVelocityX(0);
    this.question.children.entries.forEach(function(anOption){
      anOption.body.setVelocityY(0);
    });
  }

  resetGame(){
    this.paused = false;
    this.question.resetQuestion();

  }

  showMenu(){
    let x = this.jquery('#menu');
    x.css('z-index','1');
  }

  hideMenu(){
    let x = this.jquery('#menu');
    x.css('z-index','-1');     
    this.resetMenuText();
  }

  showGameOver(){
    this.showMenu();
    let left = this.jquery('#left');
    let right = this.jquery('#right');
    left.text('Give Up');
    right.text('Retry');
    var scene =  this;
    right.click(function(){
      scene.resetGame();
      scene.hideMenu();
    });

    this.paused = true;
  }
  
  resetMenuText(){
    let left = this.jquery('#left');
    let right = this.jquery('#right');
    left.text('');
    right.text('');
  }
}
