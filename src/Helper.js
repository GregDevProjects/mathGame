//random functions used in a bunch of places that I'm too lazy to organize 

export default class Helper{
	/**
	* Returns a random integer between min (inclusive) and max (inclusive)
	* Using Math.round() will give you a non-uniform distribution!
	*/
	static getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	static getArrayOfChoicesForQuestion(numberOfoptions, answer, highestVariable){
		var options = [];
		var anserIndex = this.getRandomInt(0,numberOfoptions - 1);
		for(var i=0; i < numberOfoptions; i++){
			if(anserIndex === i){
			options.push(answer);
			continue;
		}
			var isSubtract = this.getRandomInt(0,1);
			var offset = this.getRandomInt(1,highestVariable);
			options.push(
				(isSubtract ? answer - offset : answer + offset)
			);
		}
		return options;
	}

}