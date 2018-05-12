import { GAME_PROGRESS } from './Helper.js'

export class LocalStorageHandler {
    constructor() {
        let savedProgress = localStorage.getItem('SpaceMathGameProgress');

        if(!savedProgress) {
            this.saveGameProgress(GAME_PROGRESS.NOTHING);  
        }

    }

    getGameProgress(){
        try{
            return localStorage.getItem('SpaceMathGameProgress');
        } catch(e) {
            console.log('cant get game progress', e);
            return GAME_PROGRESS.NOTHING;
        }
    }

    saveGameProgress(gameProgress){
        try{
            localStorage.setItem('SpaceMathGameProgress', gameProgress)
        } catch(e) {
            console.log('cant save game prgress', e);
        }
    }
}