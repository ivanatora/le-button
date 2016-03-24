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
    
    constructor(private _messageService: MessageService){ }
    
    doClick(){
        var me = this;
        this.iScore++;
        
        this._messageService.getMessageByScore(this.iScore).then(function(res){
            if (typeof res != 'undefined' && typeof res.content != 'undefined') me.sMessage = res.content;
        });
    }
}