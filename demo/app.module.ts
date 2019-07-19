import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LightboxModule } from '../src';
import { AppComponent } from './app.component';

@NgModule({
  imports: [ BrowserModule, LightboxModule ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
