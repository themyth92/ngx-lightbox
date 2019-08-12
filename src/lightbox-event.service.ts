import { Observable, Subject } from 'rxjs';

import { Injectable } from '@angular/core';

export interface IEvent {
  id: number;
  data?: any;
}

export interface IAlbum {
  src: string;
  caption?: string;
  thumb: string;
}

export const LIGHTBOX_EVENT = {
  CHANGE_PAGE: 1,
  CLOSE: 2,
  OPEN: 3
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
