import { FileSaverModule } from 'ngx-filesaver';

import { NgModule } from '@angular/core';

import { LightboxConfig } from './lightbox-config.service';
import { LightboxEvent, LightboxWindowRef } from './lightbox-event.service';
import { LightboxOverlayComponent } from './lightbox-overlay.component';
import { LightboxComponent } from './lightbox.component';
import { Lightbox } from './lightbox.service';

@NgModule({
  declarations: [ LightboxOverlayComponent, LightboxComponent ],
  providers: [
    Lightbox,
    LightboxConfig,
    LightboxEvent,
    LightboxWindowRef
  ],
  imports: [ FileSaverModule ]
})
export class LightboxModule { }
