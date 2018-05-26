import MenuBackground from './MenuBackground'
import { getGameWidth, getGameHeight } from './Helper'
import { LocalStorageHandler } from './LocalStorageHandler'
import { Questiontypes, getQuestionText } from './ai/Problem'

export default class GameOverScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'GameOver'
    });
  }

  init(data) {
    this.failedQuestion = data.question + ' = ' + data.answer;
    this.questionType = data.type;
    this.score = data.score;
  }

  preload() {
    // MENU
    this.load.image('retry', 'src/img/80_fa_undo.png');
    this.load.image('menu',' src/img/80_icomoon-home2.png');
    this.load.image('bg', 'src/img/menu_bg.png');
  }

  create() {
    this.background = new MenuBackground(this);
    this.localStorage = new LocalStorageHandler();
    this.createTextAndGraphics();
  }

  createTextAndGraphics(){
    var rightAnswer = new Phaser.Geom.Circle(getGameWidth()/2, 150, 120);
    var score = new Phaser.Geom.Circle(getGameWidth()/2, 350, 60);
    var retry =  new Phaser.Geom.Circle(getGameWidth()/2 - 100, getGameHeight()/2 +200, 60);
    var menu = new Phaser.Geom.Circle(getGameWidth()/2 + 100, getGameHeight()/2 +200, 60);

	  var graphics = this.add.graphics({ fillStyle: { color: 0xffffff } });
    graphics.fillCircleShape(rightAnswer);
    graphics.fillCircleShape(retry);
    graphics.fillCircleShape(menu);
    graphics.fillCircleShape(score);

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

    this.scoreText = this.add.text(score.x, score.y, this.score + '/10', this.fontStyle);
    this.scoreText.x= score.x - this.scoreText.width/2;
    this.scoreText.y = score.y - this.scoreText.height/2;

    this.unlockText = this.add.text(-getGameWidth(), getGameHeight() - 30 ,'',{font: "20px Arial", fill: "#ffffff", fontWeight : 'bolder' })
    this.showUnlocks();
  }

  showUnlocks(){
    if(this.questionType == this.localStorage.getGameProgress()){
      if(this.score > 5){
        console.log('level up');
        this.unlockText.setText((getQuestionText(this.questionType+1) + ' Unlocked!').toUpperCase());
      } else {
        this.unlockText.setText(('6/10 or higher to unlock').toUpperCase());
      }
      this.unlockText.x = getGameWidth() - this.unlockText.width - ( getGameWidth() - this.unlockText.width )/2;
    }
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