import { Questiontypes, getQuestionText } from './ai/Problem'
import { getRandomValueFromArray, getGameWidth, getGameHeight, getDefaultFontStyleWhite } from './Helper'
import { LocalStorageHandler } from './LocalStorageHandler'
import { Music } from './Music'
import MenuBackground from './MenuBackground'

export default class MenuScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'Menu'
    });

    this.localStorage = new LocalStorageHandler();
  }

  create() {
    this.background = new MenuBackground(this);

    this.spaceStyleAddTitleText();
    this.applyButtonImageTweensAndPointerEvents(this.calcButtonPositionAndSetTweens());
    this.music = new Music(
      { 
        scene: this,
        key:'menu_music'
      }
    ).play();
}

  calcButtonPositionAndSetTweens(){
    //width of a button
    let menuwidth = 100;
    let fistXPosition = (getGameWidth() - menuwidth)/3;
    let secondXPostion = fistXPosition + menuwidth + fistXPosition;

    return [
      { key: 'addition', type: Questiontypes.Addition, x: fistXPosition, y: 300, tweenConfig: {scaleX: 1.2,scaleY: 1.2,yoyo: true,repeat: -1}},
      { angle: 90, key: 'division', type: Questiontypes.Division, x: fistXPosition, y: 450, tweenConfig: {alpha: 0.5,yoyo: true,repeat: -1}},
      { key: 'multiplication', type: Questiontypes.Multiplication, x: secondXPostion, y: 450, tweenConfig: {angle: 360,repeat: -1,duration: 2000}},
      { angle: 20, key: 'subtraction', type: Questiontypes.Subtraction, x: secondXPostion, y: 300, tweenConfig: {angle: -20, yoyo: true,repeat: -1}}
    ];

  }

  spaceStyleAddTitleText(){
    let textSpace = this.add.text(getGameWidth()/2, 10, 'SPACE', this.getMenuTextFontStyle());
    let textMath = this.add.text(getGameWidth()/2, 10, 'MATH',this.getMenuTextFontStyle());
    textSpace.x=getGameWidth()/2 - textSpace.width/2;
    textMath.x=getGameWidth()/2 - textMath.width/2;
    textMath.y= textSpace.y + textSpace.height;
  }

  getMenuTextFontStyle(){
    return { font: "90px Helvetica", fill: "#ffffff", fontWeight : 'bolder' };
  }

  applyButtonImageTweensAndPointerEvents(buttons){
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
      this.music.stop();
      this.scene.stop();
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
      getGameWidth(), 
      getGameHeight() - 30, 
      'PLAY ' + getQuestionText(questionType -1).toUpperCase() + ' TO UNLOCK', 
      getDefaultFontStyleWhite() 
    );
    this.tweens.add(
      {duration: 3000, x: -this.text.width, targets: this.text}
    )
  }

  update(time, delta) {
    this.background.tickCounter--
    if(this.background.tickCounter < 0){
      this.background.resetTileSpriteScrollDirection();
    }
    this.background.moveToDirection();
  }

}