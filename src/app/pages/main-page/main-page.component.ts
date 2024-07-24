import { Component } from '@angular/core';
import { CountdownComponent } from '../../components/countdown/countdown.component';
import { RouterLink } from '@angular/router';
import { SettingsService } from '../../services/settings.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  standalone: true,
  imports: [CountdownComponent, RouterLink, AsyncPipe, NgIf],
})
export class MainPageComponent {
  constructor(private readonly settingsService: SettingsService) {}

  get countdownIsFinished() {
    return this.settingsService.countdownIsFinished;
  }

  get event() {
    return this.settingsService.getSettingsFromLS().event;
  }

  get afterEvent() {
    return this.settingsService.getSettingsFromLS().afterEvent;
  }
}
