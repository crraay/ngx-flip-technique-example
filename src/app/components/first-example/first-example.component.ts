import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-first-example',
    templateUrl: './first-example.component.html',
    styleUrls: ['./first-example.component.scss']
})
export class FirstExampleComponent implements OnInit {

    items = [
        {
            color: 'red',
            extended: false,
        },
        {
            color: 'green',
            extended: true,
        },
        {
            color: 'blue',
            extended: false,
        }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
