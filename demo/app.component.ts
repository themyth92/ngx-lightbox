import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAlbum, IEvent, Lightbox, LIGHTBOX_EVENT, LightboxConfig, LightboxEvent } from '../src';

@Component({
  selector: 'demo',
  template: `
    <div class="column has-text-centered">
      <div class="img-row" *ngFor="let image of albums; let i=index">
        <img class="img-frame" [src]="image.thumb" (click)="open(i)"/>
      </div>
    </div>
    <div class="huge-margin-top column has-text-centered">
        <div class="img-row" *ngFor="let image of albums; let i=index">
            <img class="img-frame" [src]="image.thumb" (click)="open(i)"/>
        </div>
    </div>
  `,
  host: {
    class: 'columns'
  }
})
export class AppComponent {
  public albums: Array<IAlbum>;
  private _subscription: Subscription;
  constructor(
    private _lightbox: Lightbox,
    private _lightboxEvent: LightboxEvent,
    private _lighboxConfig: LightboxConfig
  ) {
    this.albums = [];
    for (let i = 1; i <= 4; i++) {
      const src = 'demo/img/image' + i + '.jpg';
      const caption = 'Image ' + i + ' caption here';
      const thumb = 'demo/img/image' + i + '-thumb.jpg';
      const album = {
         src: src,
         caption: caption,
         thumb: thumb
      };

      this.albums.push(album);
    }

    // set default config
    this._lighboxConfig.fadeDuration = 1;
  }

  open(index: number): void {
    this._subscription = this._lightboxEvent.lightboxEvent$.subscribe((event: IEvent) => this._onReceivedEvent(event));

    // override the default config
    this._lightbox.open(this.albums, index, {
      wrapAround: true,
      showImageNumberLabel: true,
      disableScrolling: true
    });
  }

  private _onReceivedEvent(event: IEvent): void {
    if (event.id === LIGHTBOX_EVENT.CLOSE) {
      this._subscription.unsubscribe();
    }
  }
}
