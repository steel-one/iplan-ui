import { Component } from '@angular/core';
import { AppService } from './app.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        RouterOutlet,
        AsyncPipe,
    ],
})
export class AppComponent {
  constructor(public srv: AppService) {}
}
