import 'phaser';
import GameplayScene from './GameplayScene';

let config = {
    type: Phaser.AUTO,
    width: window.innerWidth,// * window.devicePixelRatio,
    height: window.innerHeight,// * window.devicePixelRatio,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [
        GameplayScene
    ]
};

let game = new Phaser.Game(config);

/*
https://codepen.io/samme/pen/JMVBeV*/
//https://github.com/nkholski/phaser3-es6-webpack