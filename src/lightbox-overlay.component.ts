import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener, Input,
  OnDestroy,
  Renderer2
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  IEvent, LightboxEvent, LIGHTBOX_EVENT
} from './lightbox-event.service';



@Component({
  selector: '[lb-overlay]',
  template: '',
  host: {
    '[class]': 'classList'
  }
})
export class LightboxOverlayComponent implements AfterViewInit, OnDestroy {
  @Input() options: any;
  @Input() cmpRef: any;
  public classList;
  private _subscription: Subscription;
  constructor(
    private _elemRef: ElementRef,
    private _rendererRef: Renderer2,
    private _lightboxEvent: LightboxEvent
  ) {
    this.classList = 'lightboxOverlay animation fadeInOverlay';
    this._subscription = this._lightboxEvent.lightboxEvent$.subscribe((event: IEvent) => this._onReceivedEvent(event));
  }

  @HostListener('click')
  public close(): void {
    // broadcast to itself and all others subscriber including the components
    this._lightboxEvent.broadcastLightboxEvent({ id: LIGHTBOX_EVENT.CLOSE, data: null });
  }

  public ngAfterViewInit(): void {
    const fadeDuration = this.options.fadeDuration;

    this._rendererRef.setStyle(this._elemRef.nativeElement,
      '-webkit-animation-duration', `${fadeDuration}s`);
    this._rendererRef.setStyle(this._elemRef.nativeElement,
      'animation-duration', `${fadeDuration}s`);
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _onReceivedEvent(event: IEvent): void {
    switch (event.id) {
      case LIGHTBOX_EVENT.CLOSE:
        this._end();
        break;
      default:
        break;
    }
  }

  private _end(): void {
    this.classList = 'lightboxOverlay animation fadeOutOverlay';

    // queue self destruction after the animation has finished
    // FIXME: not sure if there is any way better than this
    setTimeout(() => {
      this.cmpRef.destroy();
    }, this.options.fadeDuration * 1000);
  }
}
