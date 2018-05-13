import {getRandomInt, getArrayOfChoicesForQuestion} from '../Helper'

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
			var numberInQuestion = getRandomInt(0,max);	
			question.push(numberInQuestion);
			if(sum === false) {
				sum = numberInQuestion;
				continue;
			}	
			sum -= numberInQuestion;
		}

		//question + question = sum 
		//options: what the player can select 
		return {
			"display" : question.join(" - "), 
			"answer" : sum, 
			"options": getArrayOfChoicesForQuestion(numberOfoptions, sum, max) 
		};
	}

}