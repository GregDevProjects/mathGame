import { Questiontypes } from './ai/Problem'

export class LocalStorageHandler {
    constructor() {
        if(!localStorage.getItem('SpaceMathGameProgress')) {
            this.saveGameProgress(Questiontypes.Addition);  
        }
    }

    getGameProgress(){
        try{
            return localStorage.getItem('SpaceMathGameProgress');
        } catch(e) {
            console.log('cant get game progress', e);
            return Questiontypes.Addition;
        }
    }

    saveGameProgress(gameProgress){
        if(gameProgress => 4){
            return;
        }
        try{
            localStorage.setItem('SpaceMathGameProgress', gameProgress)
        } catch(e) {
            console.log('cant save game prgress', e);
        }
    }
}