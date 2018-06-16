import './styles/style.css';
import 'phaser';
import GameplayScene from './GameplayScene';
import MenuScene from './MenuScene';
import GameOverScene from './GameOverScene';
import LoaderScene from './LoaderScene';
import { getGameWidth, getGameHeight } from './Helper'

let config = {
    type: Phaser.CANVAS,
    width: getGameWidth(),// * window.devicePixelRatio,
    height: getGameHeight(),// * window.devicePixelRatio,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [
        LoaderScene,     
        MenuScene,
        GameOverScene,
        GameplayScene
        
    ]
};

let game = new Phaser.Game(config);
// /*
// https://codepen.io/samme/pen/JMVBeV*/
//https://github.com/nkholski/phaser3-es6-webpack