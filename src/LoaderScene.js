import { getGameWidth } from './Helper'

export default class MenuScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'Loader'
    });

  }
  preload() {

    var progress = this.add.graphics();
    var loadingText = this.add.text(this.add.text(10, 10, 'LOADING...', { font: "40px Helvetica", fill: "#ffffff", fontWeight : 'bolder' }));
    loadingText.x=getGameWidth() - loadingText.width;
    this.load.on('progress', function (value) {

        progress.clear();
        progress.fillStyle(0xffffff, 1);
        progress.fillRect(0, 270, 800 * value, 60);

    });

    this.load.on('complete', function () {
        progress.destroy();
        loadingText.destroy();
    });
    this.load.audio('win', 'src/img/win.mp3');
    this.load.audio('fail', 'src/img/fail.mp3');
    this.load.audio('addition_music', 'src/img/addition.mp3');
    this.load.audio('subtraction_music', 'src/img/subtraction.mp3');
    this.load.audio('multiplication_music', 'src/img/multiplication.mp3');
    this.load.audio('division_music', 'src/img/division.mp3');
    this.load.audio('menu_music', 'src/img/menu.mp3');

    this.load.image('addition', 'src/img/100_fa_plus.png');
    this.load.image('division', 'src/img/menu_division.png');
    this.load.image('multiplication', 'src/img/100_fa_times.png');
    this.load.image('subtraction', 'src/img/100_fa_minus.png');
    this.load.image('menu_bg', 'src/img/menu_bg.png');
    this.load.image('player1', 'src/img/player1.png');
    this.load.image('bg','src/img/bg.png');
    this.load.image('red', 'src/img/red.png');
    this.load.image('retry', 'src/img/80_fa_undo.png');
    this.load.image('menu',' src/img/80_icomoon-home2.png');
    this.load.image('bg', 'src/img/menu_bg.png');
    this.load.image('trophy', 'src/img/30-trophy.png');
    this.load.image('thumbs', 'src/img/100-thumbs-up.png');

    this.load.spritesheet('blocks', 'src/img/blocks.png', {frameWidth:80, 'frameHeight':60});
    this.load.spritesheet('explosion', 'src/img/explosion.png', { 'frameWidth': 96, 'frameHeight': 96 });
  }

  create() {
    this.anims.create({
      key: 'kaboom',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 11 }),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });
    this.scene.start('Menu');
  }

}