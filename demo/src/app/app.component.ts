import { Component } from '@angular/core';
import { Lightbox, LightboxConfig, LightboxEvent, LIGHTBOX_EVENT, IEvent, IAlbum } from 'ngx-lightbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
    <div class="column has-text-centered">
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
      const src = 'assets/img/image' + i + '.jpg';
      const caption = 'Image ' + i + ' caption here';
      const thumb = 'assets/img/image' + i + '-thumb.jpg';
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
    this._lightbox.open(this.albums, index, { wrapAround: true, showImageNumberLabel: true });
  }

  private _onReceivedEvent(event: IEvent): void {
    if (event.id === LIGHTBOX_EVENT.CLOSE) {
      this._subscription.unsubscribe();
    }
  }
}
