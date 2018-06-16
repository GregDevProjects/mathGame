import { Questiontypes } from './ai/Problem'

export class Music {  
    constructor(config){
        this.scene = config.scene;
        this.musicKey = config.key;
        this.currentSong = this.scene.sound.add(config.key, {loop : true});
        this.addMobilePauseResumeEvents();
    }
    
    addMobilePauseResumeEvents(){
        this.pause = this.pause.bind(this);
        this.resume = this.resume.bind(this);
        document.addEventListener("pause",  this.pause, true);
        document.addEventListener("resume", this.resume, true);
    }

    removeMobilePauseResumeEvents(){
        document.removeEventListener("pause", this.pause, true);
        document.removeEventListener("resume", this.resume, true);  
    }

    play(){
        this.currentSong.play();
        return this;
    }

    stop(){
        this.removeMobilePauseResumeEvents();
        this.currentSong.destroy();
    }

    pause(){
        this.currentSong.pause();
    }

    resume(){
        this.currentSong.resume();
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

