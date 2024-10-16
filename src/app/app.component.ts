import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '@lib/loader/loader.component';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgIf, RouterOutlet, AsyncPipe, LoaderComponent],
})
export class AppComponent {
  constructor(public srv: AppService) {}
}
