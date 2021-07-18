import { Directive, ElementRef, OnInit } from '@angular/core';
import { interval, of, animationFrameScheduler, fromEvent } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

@Directive({
    selector: '[flipTechnique]',

})
export class FlipTechniqueDirective implements OnInit {
    lastBounds: any;
    processing = false;

    constructor(private element: ElementRef) {}

    ngOnInit() {
        this.lastBounds = this.element.nativeElement.getBoundingClientRect();

        const animationFrame$ = interval(0, animationFrameScheduler);

        animationFrame$.pipe(
            filter(() => !this.processing),
            switchMap(() => {
                const el = this.element.nativeElement;
                // TODO ???
                const newBounds = el.getBoundingClientRect();

                return of(newBounds);
            }),
            filter((newBounds) => {
                // return (JSON.stringify(this.lastBounds) !== JSON.stringify(newBounds));
                return (
                    (this.lastBounds.x !== newBounds.x)
                    || (this.lastBounds.y !== newBounds.y)
                    || (this.lastBounds.height !== newBounds.height)
                    || (this.lastBounds.width !== newBounds.width)
                );
            }),
        )
            .subscribe((newBounds) => {
                // console.log('lastBounds', this.lastBounds);
                // console.log('newBounds', newBounds);

                const el = this.element.nativeElement;
                this.processing = true;

                this.animateFLIP(el, newBounds);

                fromEvent(this.element.nativeElement, 'transitionend')
                    .pipe(take(1))
                    .subscribe(() => {
                        // console.log('transitionend callback');

                        this.lastBounds = newBounds;
                        this.processing = false;
                    });
            });
    }

    // TODO fix signature
    animateFLIP(element: any, newBounds: any) {
        // TODO check width/height changing?
        // const deltaX = this.lastBounds.left - bounds.left;
        const deltaX = this.lastBounds.x - newBounds.x;
        // const deltaY = this.lastBounds.top  - bounds.top;
        const deltaY = this.lastBounds.y - newBounds.y;

        element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        element.style.transition = 'transform 0ms linear';

        requestAnimationFrame(() => {
            element.style.transform = '';
            element.style.transition = 'transform 1000ms linear';
        });
    }
}
