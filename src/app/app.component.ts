import { Component, ElementRef, OnInit } from '@angular/core';
import { CountdownComponent } from './components/countdown/countdown.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CountdownComponent, RouterOutlet, RouterLink, RouterLinkActive],
})
export class AppComponent implements OnInit {
  title = 'Date Countdown';

  constructor(
    private elementRef: ElementRef,
    private readonly settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.elementRef.nativeElement.style.color =
      this.settingsService.getSettingsFromLS().color;
    this.settingsService.color.subscribe(
      (color) => (this.elementRef.nativeElement.style.color = color)
    );
  }
}
