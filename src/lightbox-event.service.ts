import { Observable, Subject } from 'rxjs';

import { Injectable} from '@angular/core';

export interface IEvent {
  id: number;
  data?: any;
}

export interface IAlbum {
  src: string;
  caption?: string;
  thumb: string;
  downloadUrl?: string;
}

export const LIGHTBOX_EVENT = {
  CHANGE_PAGE: 1,
  CLOSE: 2,
  OPEN: 3,
  ZOOM_IN: 4,
  ZOOM_OUT: 5,
  ROTATE_LEFT: 6,
  ROTATE_RIGHT: 7
};

@Injectable()
export class LightboxEvent {
  private _lightboxEventSource: Subject<Object>;
  public lightboxEvent$: Observable<Object>;
  constructor() {
    this._lightboxEventSource = new Subject<Object>();
    this.lightboxEvent$ = this._lightboxEventSource.asObservable();
  }

  broadcastLightboxEvent(event: any): void {
    this._lightboxEventSource.next(event);
  }
}

function getWindow (): any {
  return window;
}

@Injectable()
export class LightboxWindowRef {
  get nativeWindow (): any {
      return getWindow();
  }
}
