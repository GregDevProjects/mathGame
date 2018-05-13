//title menu
import { Questiontypes, getQuestionText } from './ai/Problem'
import { getRandomValueFromArray } from './Helper'
import { LocalStorageHandler } from './LocalStorageHandler'
import MenuBackground from './MenuBackground'

export default class MenuScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'Menu'
    });

    this.localStorage = new LocalStorageHandler();
  }
  preload() {
    this.load.image('addition', 'src/img/100_fa_plus.png');
    this.load.image('division', 'src/img/menu_division.png');
    this.load.image('multiplication', 'src/img/100_fa_times.png');
    this.load.image('subtraction', 'src/img/100_fa_minus.png');
    this.load.image('bg', 'src/img/menu_bg.png');
  }

  create() {

    this.background = new MenuBackground(this);

    this.spaceStyleAddTitleText();

    //width of a button
    let menuwidth = 100;

    let fistXPosition = (window.innerWidth - menuwidth)/3;

    let secondXPostion = fistXPosition + menuwidth + fistXPosition;

    //setAngle(-20)
    let buttons = [
      { key: 'addition', type: Questiontypes.Addition, x: fistXPosition, y: 300, tweenConfig: {scaleX: 1.2,scaleY: 1.2,yoyo: true,repeat: -1}},
      { key: 'division', type: Questiontypes.Division, x: fistXPosition, y: 450, tweenConfig: {alpha: 0.7,yoyo: true,repeat: -1}},
      { key: 'multiplication', type: Questiontypes.Multiplication, x: secondXPostion, y: 450, tweenConfig: {angle: 360,repeat: -1,duration: 2000}},
      { angle: 20, key: 'subtraction', type: Questiontypes.Subtraction, x: secondXPostion, y: 300, tweenConfig: {angle: -20, yoyo: true,repeat: -1}}
    ]

    this.setupButtons(buttons);
}

  spaceStyleAddTitleText(){
    let textSpace = this.add.text(window.innerWidth/2, 10, 'SPACE', this.getMenuTextFontStyle());
    let textMath = this.add.text(window.innerWidth/2, 10, 'MATH',this.getMenuTextFontStyle());
    textSpace.x=window.innerWidth/2 - textSpace.width/2;
    textMath.x=window.innerWidth/2 - textMath.width/2;
    textMath.y= textSpace.y + textSpace.height;
  }

  getMenuTextFontStyle(){
    return { font: "90px Helvetica", fill: "#ffffff", fontWeight : 'bolder' };
  }

  setupButtons(buttons){
    this.menuButtons = [];
    for (let aButton of buttons) {

      let img = this.add.image(aButton.x, aButton.y, aButton.key).setInteractive().on('pointerdown', (event) => {   
          this.onButtonHit(event);
      }, this);

      aButton.tweenConfig.targets = img;
      img.setAngle(aButton.angle ? aButton.angle : 0);
      img.questionType = aButton.type;
      this.tweens.add(
        aButton.tweenConfig
      );
      
      this.menuButtons.push(img);
    }
  }

  onButtonHit(event){
    for (let aButton of this.menuButtons) {
      if(aButton.getBounds().contains(event.x, event.y)){
        this.startGameOrShowErrorMessage(aButton);
      }
    }

  }

  startGameOrShowErrorMessage(aButton){
    if(this.isGameModeUnlocked(aButton.questionType)) {
      this.scene.start('gamePlay', {questionType: aButton.questionType});
    } else {
      this.showErrorText(aButton.questionType);
    }
  }

  isGameModeUnlocked(questionType){
    return (this.localStorage.getGameProgress() >= questionType);
  }

  showErrorText(questionType){
    if (this.text){
      this.text.destroy();
    }   
    this.text = this.add.text(
      window.innerWidth, 
      window.innerHeight - 50, 
      'PLAY ' + getQuestionText(questionType -1).toUpperCase() + ' TO UNLOCK', 
      this.getErrorTextFontStyle() 
    );
    this.tweens.add(
      {duration: 3000, x: -this.text.width, targets: this.text}
    )
  }

  getErrorTextFontStyle(){
    return {font: "30px Helvetica", fill: "#ff0000", fontWeight : 'bolder' };
  }

  update(time, delta) {
    this.background.tickCounter--
    if(this.background.tickCounter < 0){
      this.background.resetTileSpriteScrollDirection();
    }
    this.background.moveToDirection();
  }

}