import Helper from '../Helper.js'
//TODO: template for exporting question types 
export default class Addition {
	static getQuestion(config){

		var max = config.maxNumber;
		var steps = config.complexity;
		var numberOfoptions = config.choices;

		var question = [];
		var sum = 0;
		
		for(var i=0; i < steps; i++){
			var numberInQuestion = Helper.getRandomInt(0,max);
			question.push(numberInQuestion);
			sum += numberInQuestion;
		}

		return { 
			"display" : question.join(" + "), 
			"answer" : sum, 
			"options": Helper.getArrayOfChoicesForQuestion(numberOfoptions, sum, max)
		};
	}
}