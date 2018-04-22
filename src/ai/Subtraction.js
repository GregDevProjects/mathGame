import Helper from '../Helper.js'

//TODO: template for exporting question types 
export default class Subtraction { 
	static getQuestion(config){

		var max = config.maxNumber;
		var steps = config.complexity;
		var numberOfoptions = config.choices;

		//GET DIPLAY QUESTIONS AND THE ANSWER 
		var question = [];
		var sum = false;
		for(var i=0; i < steps; i++){
			var numberInQuestion = Helper.getRandomInt(0,max);	
			question.push(numberInQuestion);
			if(sum === false) {
				sum = numberInQuestion;
				continue;
			}	
			sum -= numberInQuestion;
		}

		let displayQuestion = question.join(" - ");
		//GET OPTIONS 
		var options = [];
		var anserIndex = Helper.getRandomInt(0,numberOfoptions - 1);
		for(var i=0; i < numberOfoptions; i++){
			if(anserIndex === i){
				options.push(sum);
				continue;
			}
			var isSubtract = Helper.getRandomInt(0,1);
			var offset = Helper.getRandomInt(1,max);
			options.push(
				(isSubtract ? sum - offset : sum + offset)
			);
		}
		//question + question = sum 
		//options: what the player can select 
		return {"display" : displayQuestion, "answer" : sum, "options": options };
	}

}