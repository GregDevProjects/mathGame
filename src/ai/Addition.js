import Helper from '../Helper.js'
//TODO: template for exporting question types 
export default class Addition{
	static getAdditionQuestion(config){

		// { choices: 3, complexity: 2, maxNumber:20 }

		var max = config.maxNumber;
		var steps = config.complexity;
		var numberOfoptions = config.choices;

		var question = [];

		var sum = 0;
		for(var i=0; i < steps; i++){
			var numberInQuestion = this.Helper.getRandomInt(0,max);
			question.push(numberInQuestion);
			sum += numberInQuestion;
		}
		let displayQuestion = questions.join(" + ");
		var options = [];
		var anserIndex = this.Helper.getRandomInt(0,numberOfoptions - 1);
		for(var i=0; i < numberOfoptions; i++){
			if(anserIndex === i){
				options.push(sum);
				continue;
			}
			var isSubtract = this.Helper.getRandomInt(0,1);
			var offset = this.Helper.getRandomInt(1,max);
			options.push(
				(isSubtract ? sum - offset : sum + offset)
			);
		}

		return {"display" : displayQuestion, "answer" : sum, "options": options };
	}



}