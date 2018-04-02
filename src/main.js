import 'phaser';
import GameplayScene from './GameplayScene';

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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