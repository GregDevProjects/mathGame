import Level from './ai/Level'
import Menu from './Menu'


export default class GameplayScene extends Phaser.Scene {
    constructor(test) {
      super({
        key: 'GamePlay'
      });
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
    this.menu = new Menu({scene: this});
    this.menu.showTitleScreen();
    this.paused = true;
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

  showGameOver(){
    this.menu.showGameOver();
    this.paused = true;
  }
  
}
