import { Questiontypes } from './ai/Problem'

export class Music {  
    constructor(config){
        this.scene = config.scene;
        this.musicKey = config.key;
        this.currentSong = this.scene.sound.add(config.key, {loop : true});
    }

    play(){
        this.currentSong.play();
        return this;
    }

    stop(){
        this.currentSong.destroy();
    }

    static getKeyForQuestionType(questionType){
        switch(questionType){
            case Questiontypes.Addition:
                return 'addition_music';
            case Questiontypes.Subtraction:
                return 'subtraction_music';
            case Questiontypes.Division:
                return 'division_music';
            case Questiontypes.Multiplication:
                return 'multiplication_music';
        }
    }
}

