import { getRandomValueFromArray } from './Helper'

export default class MenuBackground extends Phaser.GameObjects.TileSprite {
    constructor(scene){
        super(scene, 0, 0, window.innerWidth *2, window.innerHeight *2, 'menu_bg');
        scene.add.existing(this);
        this.direction = {x: -1, y: -1};
        this.titleSpriteDirectionTime = 5*60;
        this.tickCounter = this.titleSpriteDirectionTime;
    }

    moveToDirection(){
        this.tilePositionY +=  this.direction.x;
        this.tilePositionX +=  this.direction.y;
    }

    changeDirection(){

    }

    resetTileSpriteScrollDirection(){
        let values = [-1,1];
        this.direction.x = getRandomValueFromArray(values);
        this.direction.y = getRandomValueFromArray(values);
        this.tickCounter = this.titleSpriteDirectionTime;
    }
}