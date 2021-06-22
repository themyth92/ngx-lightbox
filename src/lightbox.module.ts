import { Lightbox } from './lightbox.service';
import {LightboxComponent, SafePipe} from './lightbox.component';
import { LightboxConfig } from './lightbox-config.service';
import { LightboxEvent, LightboxWindowRef } from './lightbox-event.service';
import { LightboxOverlayComponent } from './lightbox-overlay.component';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ LightboxOverlayComponent, LightboxComponent, SafePipe ],
  providers: [
    Lightbox,
    LightboxConfig,
    LightboxEvent,
    LightboxWindowRef
  ],
  entryComponents: [ LightboxOverlayComponent, LightboxComponent ]
})
export class LightboxModule { }
