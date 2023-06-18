import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
