import Helper from '../Helper.js'
//TODO: template for exporting question types 
export default class Division {
	static getQuestion(config){

		var max = config.maxNumber/2;
		var steps = config.complexity;
		var numberOfoptions = config.choices;

		var possibleQuestion = [];
		var firstDivideVariable = 1;
		
		for(var i=0; i < steps; i++){
			var numberInQuestion = Helper.getRandomInt(1,max);
			possibleQuestion.push(numberInQuestion);
			firstDivideVariable *= numberInQuestion;
		}
		
		let answer =  possibleQuestion.pop();

		let question = [ firstDivideVariable ];
		question = question.concat(possibleQuestion);
		

		return { 
			"display" : question.join(" / "), 
			"answer" : answer, 
			"options": Helper.getArrayOfChoicesForQuestion(numberOfoptions, answer, max)
		};
	}
}