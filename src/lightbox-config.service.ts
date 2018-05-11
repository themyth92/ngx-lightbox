import { Injectable } from '@angular/core';

@Injectable()
export class LightboxConfig {
  public fadeDuration: number;
  public resizeDuration: number;
  public fitImageInViewPort: boolean;
  public positionFromTop: number;
  public showImageNumberLabel: boolean;
  public alwaysShowNavOnTouchDevices: boolean;
  public wrapAround: boolean;
  public disableKeyboardNav: boolean;
  public disableScrolling: boolean;
  public centerVertically: boolean;
  constructor() {
    this.fadeDuration = 0.7;
    this.resizeDuration = 0.5;
    this.fitImageInViewPort = true;
    this.positionFromTop = 20;
    this.showImageNumberLabel = false;
    this.alwaysShowNavOnTouchDevices = false;
    this.wrapAround = false;
    this.disableKeyboardNav = false;
    this.disableScrolling = false;
    this.centerVertically = false;
  }
}
