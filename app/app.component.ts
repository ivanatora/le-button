import {Component} from 'angular2/core';
import {NgClass} from 'angular2/common';

import {Message} from './message';
import {MessageService} from './message.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    providers: [MessageService],
    directives: [NgClass]
})

export class AppComponent {
    iScore: number = 0;
    sMessage: string = 'Click the button';
    bOtherButtonDisabled = false;
    bInvisibleButtonDisabled = false;
    
    constructor(private _messageService: MessageService){ }
    
    doClick(){
        var me = this;
        this.iScore++;
        
        this._messageService.getMessageByScore(this.iScore).then(function(res){
            if (typeof res != 'undefined' && typeof res.content != 'undefined') me.sMessage = res.content;
        });
    }
    
    doClickMystery(){
        this.bOtherButtonDisabled = true;
        this.sMessage = "Why did you do that? I can't believe you are still alive with that adventurous clicking on weird buttons!";
    }
    
    doClickInvisible(){
        this.bInvisibleButtonDisabled = true;
        this.iScore += 10;
        this.sMessage = 'Achievement unlocked: master detective';
    }
    
    doClickDebug(){
        this.iScore = 170;
    }
}