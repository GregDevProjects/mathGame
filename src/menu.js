//TODO - remove click listeners when the menu changes 

// FLOW
// setup starting and stopping the game 
// fine tune addition 
// add sprite for choices 
export default class Menu {

	constructor(config){
		this.jquery = require('jquery');
		this.scene = config.scene;

		this.menu = this.jquery('#menu');
		this.title = this.jquery('#title');
		this.selection1 = this.jquery('#selection-1');
		this.selection2 = this.jquery('#selection-2');
	}

	showMenu(){
		this.menu.css('z-index','1');
	}

	hideMenu(){
		this.menu.css('z-index','-1');     
		this.resetMenuText();
  	}

  	showTitle(){
  		this.menu.width('100%')
			.height('100%')
			.css('right',0)
			.css('z-index','1');

		this.selection1.css('top', 300)
			.text('Addition');

		this.selection2.css('top', 400)
			.text('Subtraction');

		var scope =  this;
		this.selection1.click(function(){
			scope.hideMenu();
			scope.scene.resetGame();
		});
  	}	

	showGameOver(){

		this.showMenu();
		this.selection1.text('Give Up');
		this.selection2.text('Retry');
		var scope =  this;
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