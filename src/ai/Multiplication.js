import Helper from '../Helper.js'

//TODO: template for exporting question types 
export default class Multiplication {
	static getQuestion(config){

		var max = config.maxNumber/2;
		var steps = config.complexity;
		var numberOfoptions = config.choices;

		var question = [];
		var sum = 1;
		
		for(var i=0; i < steps; i++){
			var numberInQuestion = Helper.getRandomInt(0,max);
			question.push(numberInQuestion);
			sum *= numberInQuestion;
		}

		return { 
			"display" : question.join(" X "), 
			"answer" : sum, 
			"options": Helper.getArrayOfChoicesForQuestion(numberOfoptions, sum, max)
		};
	}



}