var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
game = new Phaser.Game(config);

function preload ()
{
	this.load.image('option', 'src/img/option.png');
}

function create ()
{
	
	var question = getAdditionQuestion(20,3, 3);
	var output = question.questions.join(" + ");
	text3 = this.add.text(100, 100, output + ' = ' + question.answer).setFont('64px Arial').setFill('#ffff00');

	optionsGroup = this.physics.add.group();
	getQuestions(question, this);
	createPlayer(this);
	InputHandler.initControlls(this);
}	

function update() {

	optionsGroup.children.entries.forEach(function(anOption){
		//anOption.y++;
		anOption.setVelocityY(160);
		anOption.moveText();
	});

	InputHandler.keyboardControlls(game);
}

//create 3 options 
function getQuestions(question, game){
	var startingPosition = 100;
	for(var i = 0; i<question.options.length; i++){
		createOption(
			startingPosition,
			0,
			question.options[i], 
			(question.options[i] == question.answer),
			game
		);
		startingPosition+=200;
	}
}

function createOption(x,y,optionValue,isCorrectAnswer, game){
	var sprite = optionsGroup.create(x, y, 'option');
	sprite.moveText = function(){
		this.text.x =(this.x);
		this.text.y = (this.y);
	}	
	sprite.resetQuestion = function(optionValue,isCorrectAnswer){
		this.text.destroy();
		this.y = -this.height;
		this.value = optionValue;
		this.isCorrectAnswer = isCorrectAnswer;
		this.text = game.add.text(sprite.x, sprite.y, optionValue, {font: "16px Arial", fill: "#ffffff"});
	}
	sprite.value = optionValue;
	sprite.isCorrectAnswer = isCorrectAnswer;
	sprite.text = game.add.text(sprite.x, sprite.y, optionValue, {font: "16px Arial", fill: "#ffffff"});
}

function createPlayer(game){
	function onPlayerOptionCollision(player, option){
		option.isCorrectAnswer ? resetQuestion(game) : '';
	}
	player = game.physics.add.sprite(300, 600, 'option');
	game.physics.add.overlap(player, optionsGroup, onPlayerOptionCollision);
}

function getAdditionQuestion(max, steps, numberOfoptions){
	var question = [];
	
	var sum = 0;
	for(var i=0; i < steps; i++){
		var numberInQuestion = getRandomInt(0,max);
		question.push(numberInQuestion);
		sum += numberInQuestion;
	}

	var options = [];
	var anserIndex = getRandomInt(0,numberOfoptions - 1);
	for(var i=0; i < numberOfoptions; i++){
		if(anserIndex === i){
			options.push(sum);
			continue;
		}
		var isSubtract = getRandomInt(0,1);
		var offset = getRandomInt(1,max);
		options.push(
			(isSubtract ? sum - offset : sum + offset)
		);
	}

	return {"questions" : question, "answer" : sum, "options": options };
}

//when player collides with the right option 
function resetQuestion(game){
	var question = getAdditionQuestion(20,3, 3);
	var output = question.questions.join(" + ");
	text3.destroy();
	text3 = game.add.text(100, 100, output).setFont('64px Arial').setFill('#ffff00');
	//console.log(question.answer);
	//var game = game;
	optionsGroup.children.entries.forEach(function(anOption, i){
		anOption.resetQuestion(
			question.options[i], 
			(question.options[i] == question.answer)
		);
		
	});
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}