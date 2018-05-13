import MenuBackground from './MenuBackground'

export default class GameOverScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'GameOver'
    });
  }

  init(data) {
    this.failedQuestion = data.question + ' = ' + data.answer;
    this.questionType = data.questionType;
  }

  preload() {
    // MENU
    this.load.image('retry', 'src/img/80_fa_undo.png');
    this.load.image('menu',' src/img/80_icomoon-home2.png');
    this.load.image('bg', 'src/img/menu_bg.png');
  }

  create() {

    this.background = new MenuBackground(this);
    var rightAnswer = new Phaser.Geom.Circle(window.innerWidth/2, 200, 120);
    var retry =  new Phaser.Geom.Circle(window.innerWidth/2 - 100, window.innerHeight/2 +200, 60);
    var menu = new Phaser.Geom.Circle(window.innerWidth/2 + 100, window.innerHeight/2 +200, 60);

	var graphics = this.add.graphics({ fillStyle: { color: 0xffffff } });
    graphics.fillCircleShape(rightAnswer);
    graphics.fillCircleShape(retry);
    graphics.fillCircleShape(menu);
    this.retryImage = this.add.image(retry.x, retry.y, 'retry').setInteractive().on('pointerdown', (event) => {   
      this.retry();
    }, this);

    this.homeImage = this.add.image(menu.x, menu.y, 'menu').setInteractive().on('pointerdown', (event) => {   
      this.goMenu();
    }, this);

    this.fontStyle = {font: "30px Arial", fill: "#000000", fontWeight : 'bolder' };
    this.text = this.add.text(rightAnswer.x, rightAnswer.y, '¯\\_(ツ)_/¯', this.fontStyle);
    this.text.x=rightAnswer.x - this.text.width/2;
    this.text = this.add.text(rightAnswer.x, rightAnswer.y - 50, this.failedQuestion , this.fontStyle); 
    this.text.x=rightAnswer.x - this.text.width/2;
    var scope = this;

  }

  retry(){
    this.scene.start('gamePlay', {questionType: this.questionType});
  }

  goMenu(){
    this.scene.start('Menu');
  }


  update(time, delta) {
    //FIXME: this shouild be a tween
    this.retryImage.angle-=2;
    this.background.moveToDirection();
  }

}