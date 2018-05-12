//title menu
import { Questiontypes } from './ai/Problem'
import { Helper, GAME_PROGRESS } from './Helper'
import { LocalStorageHandler } from './LocalStorageHandler'

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
    this.titleSpriteDirectionTime = 5*60;

    this.tickCounter = this.titleSpriteDirectionTime;
    this.tileSpriteDirectionX = -1;
    this.tileSpriteDirectionY = -1;


    this.bg = this.add.tileSprite(
      0, 
      0, 
      this.scene.manager.game.config.width *2, 
      this.scene.manager.game.config.height *2, 
      'bg'
    );

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

    let fontStyle = {font: "30px Helvetica", fill: "#ff0000", fontWeight : 'bolder' };
    this.text = this.add.text(-444, window.innerHeight - 50, 'YOU MUST UNLOCK ADDITION', fontStyle );
    
    
   
}

  spaceStyleAddTitleText(){
    let fontStyle = {font: "90px Helvetica", fill: "#ffffff", fontWeight : 'bolder' };
    let textSpace = this.add.text(window.innerWidth/2, 10, 'SPACE', fontStyle);
    let textMath = this.add.text(window.innerWidth/2, 10, 'MATH',fontStyle);
    textSpace.x=window.innerWidth/2 - textSpace.width/2;
    textMath.x=window.innerWidth/2 - textMath.width/2;
    textMath.y= textSpace.y + textSpace.height;
  }

  setupButtons(buttons){
    this.menuButtons = [];
    for (let aButton of buttons) {

      let img = this.add.image(aButton.x, aButton.y, aButton.key).setInteractive().on('pointerdown', (event, test) => {
        
        if(this.tweeny === undefined ||  !this.tweeny.isPlaying()){
          this.onButtonHit(event);
          //show error text 
          let x = LocalStorage('yo');//.getGameProgress();

        }
        //START THE GAME
       //this.scene.start('gamePlay', {questionType: aButton.type});

      }, this);

      aButton.tweenConfig.targets = img;

      img.setAngle(aButton.angle ? aButton.angle : 0);
      img.gameType = aButton.type;
      this.tweens.add(
        aButton.tweenConfig
      );
      
      this.menuButtons.push(img);
    }
  }

  onButtonHit(event){
    for (let aButton of this.menuButtons) {
      if(aButton.getBounds().contains(event.x, event.y)){
          console.log(aButton.gameType);

      }
    }
    this.tweeny = this.tweens.add(
      {x: 444, targets: this.text, onComplete: () => {this.text.x=-444;}}
    )
  }

  update(time, delta) {

    this.tickCounter--
    if(this.tickCounter < 0){
      this.resetTileSpriteScrollDirection();
    }

    this.bg.tilePositionY += this.tileSpriteDirectionX;
    this.bg.tilePositionX += this.tileSpriteDirectionY;

  }

  resetTileSpriteScrollDirection(){
    let values = [-1,1];
    this.tileSpriteDirectionX = Helper.getRandomValueFromArray(values);
    this.tileSpriteDirectionY = Helper.getRandomValueFromArray(values);
    this.tickCounter = this.titleSpriteDirectionTime;
  }

}