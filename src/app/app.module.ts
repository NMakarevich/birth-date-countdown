import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { InputDateComponent } from './components/input-date/input-date.component';
import { InputColorComponent } from './components/input-color/input-color.component';

@NgModule({
  declarations: [
    AppComponent,
    CountdownComponent,
    InputDateComponent,
    InputColorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
