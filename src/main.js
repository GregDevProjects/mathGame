
import './styles/style.css';
import './styles/fa-regular-400.ttf'

// import './styles/fa-regular-400'
import 'phaser';
import GameplayScene from './GameplayScene';
import MenuScene from './MenuScene';




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
        GameplayScene
    ]
};

let game = new Phaser.Game(config);
/*
https://codepen.io/samme/pen/JMVBeV*/
//https://github.com/nkholski/phaser3-es6-webpack