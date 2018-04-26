import { Questiontypes } from './ai/Problem'

//in game menu 
export default class Menu {

	constructor(config){

	}

	static showGameOver(scene){
		var circle = new Phaser.Geom.Circle(100, 100, 100);
		var graphics = scene.add.graphics({ fillStyle: { color: 0xff0000 } });
		graphics.fillCircleShape(circle);
	}	
}