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

    new Phaser.Geom.Circle(200,200,100);

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

    //START MENU PROTO
		var circle = new Phaser.Geom.Circle(window.innerWidth/2, window.innerHeight/2, 120);
		var graphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });
    graphics.fillCircleShape(circle);
    
    this.fontStyle = {font: "30px Arial", fill: "#ffffff", fontWeight : 'bolder' };

    this.text = this.add.text(circle.x, circle.y, '¯\\_(ツ)_/¯', this.fontStyle);
    this.text.x=circle.x - this.text.width/2;
    this.text = this.add.text(circle.x, circle.y - 50, '2 + 2 + 2 = 4', this.fontStyle); 
    this.text.x=circle.x - this.text.width/2;
    var dec = this.add.text( 10, 10, '\uf102', { fill : '#fff', font : '32px FontAwesome' });

    dec.setFontFamily('FontAwesome');

    //END MENU PROTO
  }

  update(time, delta) {

  }

}