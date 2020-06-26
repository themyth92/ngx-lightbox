[![Build Status](https://travis-ci.org/themyth92/ngx-lightbox.svg?branch=master)](https://travis-ci.org/themyth92/ngx-lightbox)

# Ngx-Lightbox

A [lightbox2](https://github.com/lokesh/lightbox2) implementation port to use with new Angular without the need for jQuery

## Version

- For Angular 5, 6, 7, please use ngx-lightbox 1.x.x. `npm install ngx-lightbox@1.2.0`
- For Angular >= 8, please use ngx-lightbox 2.x.x. `npm install ngx-lightbox@2.0.0`
- For Angular 2, 4, please use [angular2-lightbox](https://github.com/themyth92/angular2-lightbox)

## [Demo](https://themyth92.com/project/ngx-lightbox)

## Installation

`npm install --save ngx-lightbox`

Update your `angular.json`

```
{
  "styles": [
    "./node_modules/ngx-lightbox/lightbox.css",
    ...
  ],
}
```

## Usage

### Module:

Import `LightboxModule` from `ngx-lightbox`

```javascript
import { LightboxModule } from 'ngx-lightbox';

@NgModule({
  imports: [ LightboxModule ]
})
```

### Component

1. Markup

```html
<div *ngFor="let image of _albums; let i=index">
  <img [src]="image.thumb" (click)="open(i)" />
</div>
```

2. Component method

```javascript
import { Lightbox } from 'ngx-lightbox';

export class AppComponent {
  private _album: Array = [];
  constructor(private _lightbox: Lightbox) {
    for (let i = 1; i <= 4; i++) {
      const src = 'demo/img/image' + i + '.jpg';
      const caption = 'Image ' + i + ' caption here';
      const thumb = 'demo/img/image' + i + '-thumb.jpg';
      const album = {
         src: src,
         caption: caption,
         thumb: thumb
      };

      this._albums.push(album);
    }
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._albums, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
}

```

Each `object` of `album` array inside your component may contains 3 properties :

| Properties | Requirement | Description                                                                                                        |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------ |
| src        | Required    | The source image to your thumbnail that you want to with use lightbox when user click on `thumbnail` image         |
| caption    | Optional    | Your caption corresponding with your image                                                                         |
| thumb      | Optional    | Source of your thumbnail. It is being used inside your component markup so this properties depends on your naming. |

3. Listen to lightbox event

You can listen to 3 events, which are either **CHANGE_PAGE**, **CLOSE** or **OPEN**.

```javascript
import { LightboxEvent, LIGHTBOX_EVENT } from 'ngx-lightbox';
import { Subscription } from 'rxjs';

export class AppComponent {
  private _subscription: Subscription;
  constructor(private _lightboxEvent: LightboxEvent) {}
  open(index: number): void {
    // register your subscription and callback whe open lightbox is fired
    this._subscription = this._lightboxEvent.lightboxEvent$
      .subscribe(event => this._onReceivedEvent(event));
  }

  private _onReceivedEvent(event: any): void {
    // remember to unsubscribe the event when lightbox is closed
    if (event.id === LIGHTBOX_EVENT.CLOSE) {
      // event CLOSED is fired
      this._subscription.unsubscribe();
    }

    if (event.id === LIGHTBOX_EVENT.OPEN) {
      // event OPEN is fired
    }

    if (event.id === LIGHTBOX_EVENT.CHANGE_PAGE) {
      // event change page is fired
      console.log(event.data); // -> image index that lightbox is switched to
    }
  }
}
```

## Lightbox options

Available options based on lightbox2 options

| Properties                  | Default          | Description                                                                                                                                                                                                                                 |
| --------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fadeDuration                | **0.7** seconds  | _duration_ starting when the **src** image is **loaded** to **fully appear** onto screen.                                                                                                                                                   |
| resizeDuration              | **0.5** seconds  | _duration_ starting when Lightbox container **change** its dimension from a _default/previous image_ to the _current image_ when the _current image_ is **loaded**.                                                                         |
| fitImageInViewPort          | **true**         | Determine whether lightbox will use the natural image _width/height_ or change the image _width/height_ to fit the view of current window. Change this option to **true** to prevent problem when image too big compare to browser windows. |
| positionFromTop             | **20** px        | The position of lightbox from the top of window browser                                                                                                                                                                                     |
| showImageNumberLabel        | **false**        | Determine whether to show the image number to user. The default text shown is `Image IMAGE_NUMBER of ALBUM_LENGTH`                                                                                                                          |
| alwaysShowNavOnTouchDevices | **false**        | Determine whether to show `left/right` arrow to user on Touch devices.                                                                                                                                                                      |
| wrapAround                  | **false**        | Determine whether to move to the start of the album when user reaches the end of album and vice versa. Set it to **true** to enable this feature.                                                                                           |
| disableKeyboardNav          | **false**        | Determine whether to disable navigation using keyboard event.                                                                                                                                                                               |
| disableScrolling            | **false**        | If **true**, prevent the page from scrolling while Lightbox is open. This works by settings overflow hidden on the body.                                                                                                                    |
| centerVertically            | **false**        | If **true**, images will be centered vertically to the screen.                                                                                                                                                                              |
| albumLabel                  | "Image %1 of %2" | The text displayed below the caption when viewing an image set. The default text shows the current image number and the total number of images in the set.                                                                                  |
| enableTransition            | **true**         | Transition animation between images will be disabled if this flag set to **false**                                                                                                                                                          |
| showZoom            | **false**         | Zoom Buttons will be shown if this flag set to **true**                                                                                                                                                          |
| showRotate            | **false**         | Rotate Buttons will be shown if this flag set to **true**                                                                                                                                                                                                    |

**NOTE**: You can either override default config or during a specific opening window

1. Override default config

```javascript
import { LightboxConfig } from 'ngx-lightbox';

export class AppComponent {
  constructor(private _lightboxConfig: LightboxConfig) {
    // override default config
    _lightboxConfig.fadeDuration = 1;
  }
}
```

2. Set config in a specific opening window

```javascript
import { LightboxConfig, Lightbox } from 'ngx-lightbox';

export class AppComponent {
  constructor(private _lightboxConfig: LightboxConfig, private _lightbox: Lightbox) {}
  open(index: number) {
    // override the default config on second parameter
    this._lightbox.open(this._albums, index, { wrapAround: true, showImageNumberLabel: true });
  }
}
```

## Angular Universal

For this to work with Angular Universal, you need to have a global window object defined in your `server.js` (the one in your Angular project derived from initiating an ssr project using Angular Universal) using any `window` npm lib like [window](https://www.npmjs.com/package/window) or [domino](https://www.npmjs.com/package/domino)

Add the below to your `server.js`

```js
global['window'] = window;
```

## License

MIT

## Donation

Buy me a beer if you like

BTC: 1MFx5waJ7Sitn961DaXe3mQXrb7pEoSJct

ETH: 0x2211F3d683eB1C2d753aD21D9Bd9110729C80B72

NEO: ARrUrnbq1ogfsoabvCgJ5SHgknhzyUmtuS
