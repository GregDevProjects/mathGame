import Level from './ai/Level'
import Menu from './Menu'


export default class GameplayScene extends Phaser.Scene {
    constructor(test) {
      super({
        key: 'GamePlay'
      });
    }
  preload() {
    this.load.spritesheet('blocks', 'src/img/blocks.png', {frameWidth:80, 'frameHeight':60});
    this.load.spritesheet('explosion', 'src/img/explosion.png', { 'frameWidth': 96, 'frameHeight': 96 });
    this.load.image('player1', 'src/img/player1.png');
    this.load.image('bg','src/img/bg.png');
  }

  create() {

    let config = {
        key: 'kaboom',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 11 }),
        frameRate: 20,
        repeat: 0,
        hideOnComplete: false
    };
    this.anims.create(config);


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
    this.paused = false;
    this.level.reset();
  }

  showGameOver(){
    this.menu.showGameOver();
    this.paused = true;
  }
}