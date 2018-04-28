//title menu
import { Questiontypes } from './ai/Problem'
export default class MenuScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'Menu'
    });
  }
  preload() {
    this.load.image('addition', 'src/img/100_fa_plus.png');
    this.load.image('division', 'src/img/menu_division.png');
    this.load.image('multiplication', 'src/img/100_fa_times.png');
    this.load.image('subtraction', 'src/img/100_fa_minus.png');
    this.load.image('bg', 'src/img/menu_bg.png');
  }

  create() {

    this.bg = this.add.tileSprite(
      0, 
      0, 
      this.scene.manager.game.config.width *2, 
      this.scene.manager.game.config.height *2, 
      'bg'
    );


    this.fontStyle = {font: "90px Helvetica", fill: "#ffffff", fontWeight : 'bolder' };
    this.textSpace = this.add.text(window.innerWidth/2, 10, 'SPACE', this.fontStyle);
    this.textMath = this.add.text(window.innerWidth/2, 10, 'MATH', this.fontStyle);
    this.textSpace.x=window.innerWidth/2 - this.textSpace.width/2;
    this.textMath.x=window.innerWidth/2 - this.textMath.width/2;
    this.textMath.y= this.textSpace.y + this.textSpace.height;

    let menuwidth = 100;

    let fistXPosition = (window.innerWidth - menuwidth)/3;

    let secondXPostion = fistXPosition + menuwidth + fistXPosition;

    this.addition = this.add.image(fistXPosition, 300, 'addition').setInteractive();
    this.division = this.add.image(fistXPosition, 450, 'division').setInteractive();
    this.multiplication = this.add.image(secondXPostion, 450, 'multiplication').setInteractive();
    this.subtraction = this.add.image(secondXPostion, 300, 'subtraction').setInteractive();

    this.division.on('pointerdown', () => {
      this.scene.start('gamePlay', {questionType: Questiontypes.Division});
    }, this);
 
    this.addition.on('pointerdown', function () {
      this.scene.start('gamePlay', {questionType: Questiontypes.Addition});
    }, this);

    this.multiplication.on('pointerdown', function () {
      this.scene.start('gamePlay', {questionType: Questiontypes.Multiplication});
    }, this);

    this.subtraction.on('pointerdown', function () {
      this.scene.start('gamePlay', {questionType: Questiontypes.Subtraction});
    }, this);    

    this.tweens.add({
      targets: this.addition,
      scaleX: 1.2,
      scaleY: 1.2,
      yoyo: true,
      repeat: -1
  });

  this.tweens.add({
      targets: this.division,
      alpha: 0.7,
      yoyo: true,
      repeat: -1
  });

  this.tweens.add({
    targets: this.multiplication,
    angle: 360,
    repeat: -1
  });

  this.tweens.add({
    targets: this.subtraction,
    angle: 20,
    yoyo: true,
    repeat: -1
  });

  }

  update(time, delta) {

    this.bg.tilePositionY -= 1;
    this.bg.tilePositionX -= 1;

  }

}