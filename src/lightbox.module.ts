import { Lightbox } from './lightbox.service';
import { LightboxComponent } from './lightbox.component';
import { LightboxConfig } from './lightbox-config.service';
import { LightboxEvent, LightboxWindowRef } from './lightbox-event.service';
import { LightboxOverlayComponent } from './lightbox-overlay.component';
import { NgModule } from '@angular/core';
import { FileSaverModule } from 'ngx-filesaver';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ LightboxOverlayComponent, LightboxComponent ],
  providers: [
    Lightbox,
    LightboxConfig,
    LightboxEvent,
    LightboxWindowRef
  ],
  entryComponents: [ LightboxOverlayComponent, LightboxComponent ],
  imports: [ FileSaverModule, HttpClientModule ]
})
export class LightboxModule { }
