import { Questiontypes } from './ai/Problem'
//TODO - remove click listeners when the menu changes 
//FIXME - change font to sans serif 
// FLOW
// text jitters on gameover 
// - add explosion 
// - change flow so non-contact choices go past player 
export default class Menu {

	constructor(config){
		this.jquery = require('jquery');
		this.scene = config.scene;

		this.menu = this.jquery('#menu');
		this.title = this.jquery('#title');
		this.selection1 = this.jquery('#selection-1');
		this.selection2 = this.jquery('#selection-2');
		this.selection3 = this.jquery('#selection-3');
		this.selection4 = this.jquery('#selection-4');
	}

	showMenu(){
		this.menu.css('z-index','1');
	}

	hideMenu(){
		this.menu.css('z-index','-1');     
		this.resetMenuText();
  	}

  	showTitle(){
  		this.title.css('display','inline'); 

  		this.menu.width('100%')
			.height('100%')
			.css('right',0)
			.css('z-index','1');

		this.selection1.css('top', 300)
			.text('Addition');

		this.selection2.css('top', 400)
			.text('Subtraction');

		this.selection3.css('top', 500)
			.text('Multiplication');

		this.selection4.css('top', 600)
			.text('Division');

		var scope =  this;
		this.selection1.click(function(){
			scope.hideMenu();
			scope.scene.resetGame(Questiontypes.Addition);
		});

		this.selection2.click(function(){
			scope.hideMenu();
			scope.scene.resetGame(Questiontypes.Subtraction);
		});

		this.selection3.click(function(){
			scope.hideMenu();
			scope.scene.resetGame(Questiontypes.Multiplication);
		});

		this.selection4.click(function(){
			scope.hideMenu();
			scope.scene.resetGame(Questiontypes.Division);
		});

  	}	

	showGameOver(){

		this.showMenu();
		this.title.css('display','none'); 

		this.selection1.text('Give Up').css('top', 50);
		this.selection2.text('Retry').css('top', 150);

		this.menu.css('width', '50%')
			.css('height', '50%')
			.css('right', '25%')

		var scope =  this;

		this.selection1.click(function(){
			scope.hideMenu();
			scope.showTitle();
			scope.scene.pauseGame();
		});

		this.selection2.click(function(){
			scope.hideMenu();
			scope.scene.resetGame();
		});
	}

	resetMenuText(){
		this.selection1.text('');
		this.selection2.text('');
	}

	showTitleScreen(){
		this.showMenu();
		this.showTitle();
		this.title.text('SPACE MATH');
	}
}