import Player from './sprites/Player'
import Question from './ai/Question'



export default class GameplayScene extends Phaser.Scene {
    constructor(test) {
      super({
        key: 'GamePlay'
      });

      // var $;
      // $ = 
      this.jquery = require('jquery');
    }
  preload() {
    this.load.image('option', 'src/img/option.png');

    this.showMenu();
  }

  create() {
    this.question = new Question({
        scene: this,
        choices: 3,
        complexity: 3,
        maxNumber: 20
    });

    this.player = new Player({ scene: this });

    this.keys = {
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
    };

  }

  update(time, delta) {

    this.player.update(this.keys, time, delta)
    this.question.update();
    }

    showMenu(){
      let x = this.jquery('#menu');
      x.css('z-index','1');
    }

    hideMenu(){
      let x = this.jquery('#menu');
      x.css('z-index','-1');     
    }
    
}
