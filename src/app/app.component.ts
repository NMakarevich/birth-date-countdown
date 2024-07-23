import { Component, ElementRef, OnInit } from '@angular/core';
import { InputColorComponent } from './components/input-color/input-color.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CountdownComponent, InputColorComponent, RouterOutlet, RouterLink],
})
export class AppComponent implements OnInit {
  title = 'Date Countdown';

  color!: string;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.style.color = this.color;
  }

  setColor(color: string) {
    this.color = color;
    this.elementRef.nativeElement.style.color = this.color;
  }
}
