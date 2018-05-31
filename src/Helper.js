//random functions used in a bunch of places that I'm too lazy to organize 

/**
* Returns a random integer between min (inclusive) and max (inclusive)
* Using Math.round() will give you a non-uniform distribution!
*/
export function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getArrayOfChoicesForQuestion(numberOfoptions, answer, highestVariable){
	var options = [];
	var anserIndex = getRandomInt(0,numberOfoptions - 1);
	for(var i=0; i < numberOfoptions; i++){
		if(anserIndex === i){
		options.push(answer);
		continue;
	}
		var isSubtract = getRandomInt(0,1);
		var offset = getRandomInt(1,highestVariable);
		options.push(
			(isSubtract ? answer - offset : answer + offset)
		);
	}
	return options;
}

export function getRandomValueFromArray(array) {
	return array[
			getRandomInt(0,array.length - 1)
		];
}

export function getGameWidth(){
	return window.innerWidth;
}

export function getGameHeight(){
	return window.innerHeight;
}

export function getDefaultFontStyleWhite(){
	return {font: "30px Helvetica", fill: "#ffffff", fontWeight : 'bolder' }; 
}

export function getDefaultFontStyleBlack(){
	return {font: "30px Helvetica", fill: "#000000", fontWeight : 'bolder' }; 
}

export function getPlayerBottomOffset(){
	return 70;
}