import {MESSAGES} from 'app/mock-messages';
import {Injectable} from 'angular2/core';

@Injectable()

export class MessageService {
    getMessages(){
        return Promise.resolve(MESSAGES);
    }
    
    getMessageByScore(score: number){
        return Promise.resolve(MESSAGES).then(function(arr){
            for (var i in arr){
                if (arr[i].score >= score) {
                    return arr[i];
                }
            }
            // no message were found, return empty message
//            return {content: ''}; // probably not the brightest method of doing it
        });
    }
}