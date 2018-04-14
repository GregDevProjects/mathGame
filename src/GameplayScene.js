import Player from './sprites/Player'
import Level from './ai/Level'


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
    this.load.image('bg','src/img/bg.png');
    //this.showMenu();
  }

  create() {

    this.bg = this.add.tileSprite(
      0, 
      0, 
      this.scene.manager.game.config.width *2, 
      this.scene.manager.game.config.height *2, 
      'bg'
    );

    this.level = new Level({scene: this});
   
    this.paused = false;
  }

  update(time, delta) {
    //move bg 
   this.bg.tilePositionY -= 1;
    if(this.paused){
      this.pauseGame();
      return;
    }
    this.level.update();
  }

  pauseGame(){
    this.level.pause();
  }

  resetGame(){
    //this.level.reset();
    this.paused = false;
    this.level.reset();
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
