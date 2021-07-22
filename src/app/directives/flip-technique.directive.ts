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
        this.element.nativeElement.style.transformOrigin = 'left';
        this.lastBounds = this.element.nativeElement.getBoundingClientRect();

        const animationFrame$ = interval(0, animationFrameScheduler);

        animationFrame$.pipe(
            filter(() => !this.processing),
            switchMap(() => {
                const el = this.element.nativeElement;
                // TODO find out no-reflow approach
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

                        el.style.transition = '';
                        this.lastBounds = newBounds;
                        this.processing = false;
                    });
            });
    }

    animateFLIP(element: HTMLElement, newBounds: DOMRectReadOnly): void {
        const deltaX = this.lastBounds.x - newBounds.x;
        const deltaY = this.lastBounds.y - newBounds.y;
        const deltaScaleX = this.lastBounds.width / newBounds.width;

        element.style.transform = `translate(${deltaX}px, ${deltaY}px) scaleX(${deltaScaleX})`;
        element.style.transition = 'transform 0ms';

        // next frame callback
        requestAnimationFrame(() => {
            element.style.transform = '';
            element.style.transition = 'transform 1000ms linear';
        });
    }
}
