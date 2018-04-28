export default class GameOverScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'GameOver'
    });
  }
  preload() {
    // MENU
    this.load.image('retry', 'src/img/80_fa_undo.png');
    this.load.image('menu',' src/img/80_icomoon-home2.png');
  }

  create() {

    var rightAnswer = new Phaser.Geom.Circle(window.innerWidth/2, 200, 120);
    var retry =  new Phaser.Geom.Circle(window.innerWidth/2 - 100, window.innerHeight/2 +200, 60);
    var menu = new Phaser.Geom.Circle(window.innerWidth/2 + 100, window.innerHeight/2 +200, 60);

	var graphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });
    graphics.fillCircleShape(rightAnswer);
    graphics.fillCircleShape(retry);
    graphics.fillCircleShape(menu);
    this.retryImage = this.add.image(retry.x, retry.y, 'retry');
    this.homeImage = this.add.image(menu.x, menu.y, 'menu');

    this.fontStyle = {font: "30px Arial", fill: "#ffffff", fontWeight : 'bolder' };
    this.text = this.add.text(rightAnswer.x, rightAnswer.y, '¯\\_(ツ)_/¯', this.fontStyle);
    this.text.x=rightAnswer.x - this.text.width/2;
    this.text = this.add.text(rightAnswer.x, rightAnswer.y - 50, '2 + 2 + 2 = 4', this.fontStyle); 
    this.text.x=rightAnswer.x - this.text.width/2;
    debugger;
    var scope = this;
    //this seems to respond to every input, need to listen for pointerup event 
    graphics.setInteractive(retry, this.goMenu, this );

  }

  goMenu(){
    this.gameObject.scene.scene.start('Menu');
  }


  update(time, delta) {
    this.retryImage.angle-=2;
  }

}