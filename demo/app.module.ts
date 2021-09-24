import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { LightboxModule } from '../src';
import { AppComponent } from './app.component';

@NgModule({
  imports: [ BrowserModule, CommonModule, LightboxModule ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
