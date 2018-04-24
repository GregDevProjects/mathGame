//title menu
import { Questiontypes } from './ai/Problem'
export default class MenuScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'Menu'
    });
  }
  preload() {
    this.load.image('addition', 'src/img/menu_addition.png');
    this.load.image('division', 'src/img/menu_division.png');
    this.load.image('multiplication', 'src/img/menu_multiplication.png');
    this.load.image('subtraction', 'src/img/menu_subtraction.png');
  }

  create() {
    let addition = this.add.image(100, 100, 'addition').setInteractive();
    let division = this.add.image(200, 100, 'division').setInteractive();
    let multiplication = this.add.image(100, 300, 'multiplication').setInteractive();
    let subtraction = this.add.image(200, 300, 'subtraction').setInteractive();

    division.on('pointerdown', function () {
      this.scene.start('gamePlay', {questionType: Questiontypes.Division});
    }, this);
 
    addition.on('pointerdown', function () {
      this.scene.start('gamePlay', {questionType: Questiontypes.Addition});
    }, this);

    multiplication.on('pointerdown', function () {
      this.scene.start('gamePlay', {questionType: Questiontypes.Multiplication});
    }, this);

    subtraction.on('pointerdown', function () {
      this.scene.start('gamePlay', {questionType: Questiontypes.Subtraction});
    }, this);    
  }

  update(time, delta) {

  }

}