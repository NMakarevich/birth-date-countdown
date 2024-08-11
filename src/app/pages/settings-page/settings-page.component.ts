import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import toISOStringWithTZ from '../../utils/utils';
import { AsyncPipe } from '@angular/common';

interface Form {
  event: FormControl<string>;
  afterEvent: FormControl<string>;
  date: FormControl<string>;
  color: FormControl<string>;
  hideTitle: FormControl<boolean>;
}

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  imports: [RouterLink, ReactiveFormsModule, AsyncPipe],
  standalone: true,
})
export class SettingsPageComponent {
  settings = this.settingsService.getSettingsFromLS();

  minDate = toISOStringWithTZ(new Date());

  form: FormGroup<Form> = this.fb.nonNullable.group({
    event: [
      this.settings.event,
      [Validators.required, Validators.minLength(4), Validators.maxLength(128)],
    ],
    afterEvent: [this.settings.afterEvent, [Validators.maxLength(128)]],
    date: [this.settings.date, [Validators.required]],
    color: [this.settings.color],
    hideTitle: [this.settings.hideTitle],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly settingsService: SettingsService,
    private readonly router: Router
  ) {}

  get date() {
    return this.form.controls.date;
  }

  get color() {
    return this.form.controls.color;
  }

  changeColor(event: Event) {
    const color = (event.target as HTMLInputElement).value;
    this.settingsService.color.next(color);
  }

  saveSettings() {
    const data = this.form.getRawValue();
    this.settingsService.saveToLS(data);
    this.router.navigate(['/']);
  }

  resetSettings(event: Event) {
    event.preventDefault();
    this.settingsService.resetSettings();
    this.form.reset({ ...this.settingsService.defaultSettings });
  }
}
