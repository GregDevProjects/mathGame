import './styles/style.css';
import 'phaser';
import GameplayScene from './GameplayScene';
import MenuScene from './MenuScene';
import GameOverScene from './GameOverScene';
import { getGameWidth, getGameHeight } from './Helper'
//FIXME: create a preloader scene so images/animations aren't created every time the scene starts
//http://www.html5gamedevs.com/topic/36172-returning-to-scenes-how-to-stop-thisanimscreate-attempting-to-create-duplicate-keys/
let config = {
    type: Phaser.CANVAS,
    width: window.innerWidth,// * window.devicePixelRatio,
    height: window.innerHeight,// * window.devicePixelRatio,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [     
        MenuScene,
        GameOverScene,
        GameplayScene
        
    ]
};

let game = new Phaser.Game(config);
// /*
// https://codepen.io/samme/pen/JMVBeV*/
//https://github.com/nkholski/phaser3-es6-webpack