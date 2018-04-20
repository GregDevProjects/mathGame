import Addition from './Addition'

export const Questiontypes = { Addition: 1, Substraction: 2, Multiplication: 3, Division: 4 }; 

export const Difficulty = {
	s: { choices: 3, complexity: 2, maxNumber:20 },
	m: { choices: 3, complexity: 2, maxNumber:40 },
	l: { choices: 3, complexity: 3, maxNumber:10 },
	xl: { choices: 3, complexity: 3, maxNumber:20 },
	xxl: { choices: 3, complexity: 3, maxNumber:40 }
} 

export class Problem {
	static getQuestion(difficulty, questiontype) {

		switch (questiontype){
			case Questiontypes.Addition:
				return Addition.getAdditionQuestion(difficulty);

			case Questiontypes.Addition:
				return Substraction.getAdditionQuestion(difficulty);

			case Questiontypes.Addition:
				return Multiplication.getAdditionQuestion(difficulty);

			case Questiontypes.Addition:
				return Division.getAdditionQuestion(difficulty);				
		}
	}
}