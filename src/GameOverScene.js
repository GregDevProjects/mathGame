import MenuBackground from './MenuBackground'
import { getGameWidth, getGameHeight, getDefaultFontStyleWhite, getDefaultFontStyleBlack } from './Helper'
import { LocalStorageHandler } from './LocalStorageHandler'
import { getQuestionText } from './ai/Problem'
import { MAX_SCORE } from './ai/Level'

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
    this.isVictorious = data.isVictorious;
  }

  preload() {
    this.load.image('retry', 'src/img/80_fa_undo.png');
    this.load.image('menu',' src/img/80_icomoon-home2.png');
    this.load.image('bg', 'src/img/menu_bg.png');
    this.load.image('trophy', 'src/img/30-trophy.png');
    this.load.image('thumbs', 'src/img/100-thumbs-up.png');
  }

  create() {
    this.background = new MenuBackground(this);
    this.localStorage = new LocalStorageHandler();
    this.createTextAndGraphics();
    this.pause = false;
  }

  createTextAndGraphics(){
    var graphics = this.add.graphics({ fillStyle: { color: 0xffffff } });
    this.fontStyle = {font: "30px Arial", fill: "#000000", fontWeight : 'bolder' };
    this.showUnlocksAndSaveProgress();
    this.createButtons(graphics);
    this.createRightAnswerAndScoreDisplay(graphics);

  }

  createRightAnswerAndScoreDisplay(graphics){
    var rightAnswer = new Phaser.Geom.Circle(getGameWidth()/2, 150, 120);
    graphics.fillCircleShape(rightAnswer);
    if(this.isVictorious){
      this.add.image(rightAnswer.x, rightAnswer.y, 'thumbs');
      this.createScoreDisplay(rightAnswer.x, rightAnswer.y);
      return;
    }

    let shrugDude = this.add.text(rightAnswer.x, rightAnswer.y, '¯\\_(ツ)_/¯', getDefaultFontStyleBlack());
    shrugDude.x=rightAnswer.x - shrugDude.width/2;

    let rightAnswerText = this.add.text(rightAnswer.x, rightAnswer.y - 50, this.failedQuestion , getDefaultFontStyleBlack()); 
    rightAnswerText.x=rightAnswer.x - rightAnswerText.width/2;
    this.createScoreDisplay(rightAnswer.x, rightAnswer.y);

  }

  createScoreDisplay(x,y){
    let scoreText = this.add.text(x, y + 50, this.score + '/'+ MAX_SCORE, getDefaultFontStyleBlack());
    this.add.image(scoreText.x, scoreText.y+50, 'trophy');
    scoreText.x= x - scoreText.width/2;
  }

  createButtons(graphics){
    var retry =  new Phaser.Geom.Circle(getGameWidth()/2 - 100, getGameHeight() - 100, 60);
    var menu = new Phaser.Geom.Circle(getGameWidth()/2 + 100, getGameHeight() - 100, 60);
    graphics.fillCircleShape(retry);
    graphics.fillCircleShape(menu);

    var retryImage = this.add.image(retry.x, retry.y, 'retry').setInteractive().on('pointerdown', (event) => {   
      this.retry();
    }, this);

    this.tweens.add(
      { duration: 100000, angle: -360, targets: retryImage, repeat: -1 }
    );

    this.add.image(menu.x, menu.y, 'menu').setInteractive().on('pointerdown', (event) => {   
      this.goMenu();
    }, this);
  }

  showUnlocksAndSaveProgress(){
    if(this.questionType != this.localStorage.getGameProgress() || this.questionType >= 4 ){
      if(this.isVictorious){
        this.createBottomScrollingText("GOOD JOB!!!");
      }
      return;
    } 
    
    var nextQuestionLevel = this.questionType+1;
    if(this.score > 5){
      var bottomTextDisplay = (getQuestionText(nextQuestionLevel) + ' Unlocked!').toUpperCase();
      this.localStorage.saveGameProgress(nextQuestionLevel);
    } else {
      var bottomTextDisplay = ('6/'+ MAX_SCORE +' or higher to unlock ' +  getQuestionText(nextQuestionLevel)).toUpperCase();
    }

    this.createBottomScrollingText(
      this.isVictorious ? bottomTextDisplay + ' GOOD JOB!!!' : bottomTextDisplay
    )
    
  }

  createBottomScrollingText(text){
    let unlockText = this.add.text(-getGameWidth(), getGameHeight() - 30 ,text,getDefaultFontStyleWhite());

    unlockText.x = getGameWidth();
    this.tweens.add(
      { duration: 3000, x: -unlockText.width, targets: unlockText, repeat: -1 }
    );
  }

  retry(){
    this.scene.start('gamePlay', {questionType: this.questionType});
  }

  goMenu(){
    this.pause = true;
    this.scene.stop();
    this.scene.start('Menu');
  }

  update(time, delta) {
      this.background.moveToDirection();
  }
}