//TODO: template for exporting question types 
export default class Addition{
	static getAdditionQuestion(max, steps, numberOfoptions){
		var question = [];

		var sum = 0;
		for(var i=0; i < steps; i++){
			var numberInQuestion = this.getRandomInt(0,max);
			question.push(numberInQuestion);
			sum += numberInQuestion;
		}

		var options = [];
		var anserIndex = this.getRandomInt(0,numberOfoptions - 1);
		for(var i=0; i < numberOfoptions; i++){
			if(anserIndex === i){
				options.push(sum);
				continue;
			}
			var isSubtract = this.getRandomInt(0,1);
			var offset = this.getRandomInt(1,max);
			options.push(
				(isSubtract ? sum - offset : sum + offset)
			);
		}

		return {"questions" : question, "answer" : sum, "options": options };
	}

	/**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
  static getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}