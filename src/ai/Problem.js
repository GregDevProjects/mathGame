import Addition from './Addition'
import Substraction from './Subtraction'
import Multiplication from './Multiplication'
import Division from './Division'

export const Questiontypes = { Addition: 1, Subtraction: 2, Multiplication: 3, Division: 4 }; 

export const Difficulty = {
	s: { choices: 3, complexity: 2, maxNumber:20 },
	m: { choices: 3, complexity: 2, maxNumber:40 },
	l: { choices: 3, complexity: 3, maxNumber:10 },
	xl: { choices: 3, complexity: 3, maxNumber:20 },
	xxl: { choices: 3, complexity: 3, maxNumber:40 }
}; 

export class Problem {
	static getQuestion(difficulty, questiontype) {

		switch (questiontype){
			case Questiontypes.Addition:
				return Addition.getQuestion(difficulty);

			case Questiontypes.Subtraction:
				return Substraction.getQuestion(difficulty);

			case Questiontypes.Multiplication:
				return Multiplication.getQuestion(difficulty);

			case Questiontypes.Division:
				return Division.getQuestion(difficulty);				
		}
	}
}