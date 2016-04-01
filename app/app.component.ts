import {Component, Directive, ElementRef, OnInit} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {AnimationBuilder} from 'angular2/src/animate/animation_builder';

import {Message} from './message';
import {MessageService} from './message.service';

@Directive({
  selector : '[animate-button]',
  exportAs : 'ab'
})

class AnimateButton implements OnInit {
    constructor(private _ab: AnimationBuilder, private _e: ElementRef) { }

    toggle(isVisible: boolean = false) {
        let animation = this._ab.css();
        animation
            .setDuration(1000);

        if (!isVisible) { // Goes up!
            animation.setFromStyles({ height: '0', width: '50%', overflow: 'hidden' })
                .setToStyles({ height: '300px' })
        } else { // Goes down!
            animation.setFromStyles({ height: '300px', width: '50%' })
                .setToStyles({ height: '0' })
        }
        animation.start(this._e.nativeElement);
    }
    
    run() {
        let animation = this._ab.css();
        animation.setDuration(500);
        animation.setFromStyles({ transform: "scale(0, 0)", opacity: 0 });
        animation.setToStyles({ transform: "scale(1.1, 1.5)", opacity: 1 });
        animation.start(this._e.nativeElement).onComplete(() => {
            animation.setDuration(500);
            animation.setFromStyles({ transform: "scale(1.1, 1.5)" });
            animation.setToStyles({ transform: "scale(1, 1)" });
            animation.start(this._e.nativeElement);
        });
    }
    
    jump() {
        let animation = this._ab.css();
        console.log('juimp!', animation.browserDetails)
        var top = Math.random() * 100 - 10; // leave some space for the button width itself
        var left = Math.random() * 100;
        animation.setDuration(1000);
        animation.setFromStyles({
            top: '0px',
            left: '0px',
        });
        animation.setToStyles({
            top: top+'%',
            left: left+'%',
        })
        animation.start(this._e.nativeElement).onComplete(() => {
            this.jump();
        });
    }
    
    ngOnInit(){
        console.log('ab init')
        this.jump();
    }
}

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    providers: [MessageService],
    directives: [NgClass, AnimateButton]
})

export class AppComponent {
    iScore: number = 0;
    iJumpyScore: number = 100;
    sMessage: string = 'Click the button';
    
    bOtherButtonDisabled = false;
    bInvisibleButtonDisabled = false;
    bJumpyButtonDisabled = false;
    
    visible = true;
    
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
        this.sMessage = 'Achievement unlocked: Master detective!';
    }
    
    doClickJumpy(){
        this.bJumpyButtonDisabled = true;
        this.iScore += this.iJumpyScore;
        this.sMessage = 'Achievement unlocked: Button hunter!';
    }
    
    doClickDebug(){
        this.iScore = 215;
    }
}
