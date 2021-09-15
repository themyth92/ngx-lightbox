import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LightboxEvent, LightboxWindowRef, LIGHTBOX_EVENT } from './lightbox-event.service';
import { LightboxComponent } from './lightbox.component';

describe('[ Unit - LightboxComponent ]', () => {
  let fixture: ComponentFixture<LightboxComponent>;
  let lightboxEvent: LightboxEvent;
  let mockData: any;

  beforeEach(() => {
    mockData = {
      options: {
        fadeDuration: 1,
        resizeDuration: 0.5,
        fitImageInViewPort: true,
        positionFromTop: 20,
        showImageNumberLabel: false,
        alwaysShowNavOnTouchDevices: false,
        wrapAround: false,
        disableKeyboardNav: false
      },
      currentIndex: 1,
      album: [{
        src: 'src/img/next.png',
        thumb: 'thumb1',
        caption: 'caption1'
      }, {
        src: 'src/img/prev.png',
        thumb: 'thumb2',
        caption: 'caption2'
      }]
    };
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LightboxComponent ],
      providers: [ LightboxEvent, LightboxWindowRef ],
      imports: [ HttpClientTestingModule ]
    });
    createComponent();
  });

  beforeEach(inject([ LightboxEvent ], (lEvent: LightboxEvent) => {
    lightboxEvent = lEvent;
  }));

  it('should initialize component with correct styling and default value', () => {
    expect(fixture.componentInstance.ui).toEqual({
      showReloader: true,
      showLeftArrow: false,
      showRightArrow: false,
      showArrowNav: false,
      showPageNumber: false,
      showCaption: false,
      showZoomButton: false,
      showRotateButton: false,
      showDownloadButton: false,
      classList: 'lightbox animation fadeIn'
    });
    expect(fixture.componentInstance.content).toEqual({ pageNumber: '' });
    expect(fixture.componentInstance.album).toEqual(mockData.album);
    expect(fixture.componentInstance.options).toEqual(mockData.options);
    expect(fixture.componentInstance.currentImageIndex).toEqual(mockData.currentIndex);
  });

  describe('{ method: ngOnDestroy }', () => {
    beforeEach(() => {
      fixture.componentInstance['_event'].keyup = jasmine.createSpy('keyup');
      fixture.componentInstance['_event'].load = jasmine.createSpy('load');
      spyOn(fixture.componentInstance['_event'].subscription, 'unsubscribe');
    });

    it('should call correct method if enable keyboard event', () => {
      fixture.componentInstance.options.disableKeyboardNav = false;
      fixture.componentInstance.ngOnDestroy();
      expect(fixture.componentInstance['_event'].keyup).toHaveBeenCalledTimes(1);
      expect(fixture.componentInstance['_event'].subscription.unsubscribe).toHaveBeenCalledTimes(1);
    });

    it('should not call if keyboard event is disabled', () => {
      fixture.componentInstance.options.disableKeyboardNav = true;
      fixture.componentInstance.ngOnDestroy();
      expect(fixture.componentInstance['_event'].keyup).not.toHaveBeenCalled();
    });
  });

  describe('{ method: close }', () => {
    it('should call `broadcastLightboxEvent` if classlist does contains expected class value', () => {
      const eventMock = {
        stopPropagation: jasmine.createSpy('spy'),
        target: { classList: { contains: jasmine.createSpy('contains').and.callFake(() => true) } }
      };

      spyOn(lightboxEvent, 'broadcastLightboxEvent');
      fixture.componentInstance.close(eventMock);
      expect(eventMock.stopPropagation).toHaveBeenCalledTimes(1);
      expect(lightboxEvent.broadcastLightboxEvent).toHaveBeenCalledTimes(1);
      expect(lightboxEvent.broadcastLightboxEvent).toHaveBeenCalledWith({ id: LIGHTBOX_EVENT.CLOSE, data: null });
    });
  });

  describe('{ method: nextImage }', () => {
    it('should change to correct state', () => {
      mockData.currentIndex = 0;
      createComponent();
      fixture.componentInstance['_event'].load = jasmine.createSpy('load');
      spyOn(lightboxEvent, 'broadcastLightboxEvent');
      fixture.componentInstance.nextImage();
      expect(fixture.componentInstance.ui).toEqual({
        showReloader: true,
        showLeftArrow: false,
        showRightArrow: false,
        showArrowNav: false,
        showPageNumber: false,
        showZoomButton: false,
        showRotateButton: false,
        showCaption: false,
        showDownloadButton: false,
        classList: 'lightbox animation fadeIn'
      });
      expect(lightboxEvent.broadcastLightboxEvent).toHaveBeenCalledTimes(1);
      expect(lightboxEvent.broadcastLightboxEvent).toHaveBeenCalledWith({ id: LIGHTBOX_EVENT.CHANGE_PAGE, data: 1 });
    });

    it('should change to correct state when index is the last image', () => {
      fixture.componentInstance['_event'].load = jasmine.createSpy('load');
      spyOn(lightboxEvent, 'broadcastLightboxEvent');
      fixture.componentInstance.nextImage();
      expect(fixture.componentInstance.ui).toEqual({
        showReloader: true,
        showLeftArrow: false,
        showZoomButton: false,
        showRotateButton: false,
        showRightArrow: false,
        showArrowNav: false,
        showPageNumber: false,
        showCaption: false,
        showDownloadButton: false,
        classList: 'lightbox animation fadeIn'
      });
      expect(lightboxEvent.broadcastLightboxEvent).toHaveBeenCalledTimes(1);
      expect(lightboxEvent.broadcastLightboxEvent).toHaveBeenCalledWith({ id: LIGHTBOX_EVENT.CHANGE_PAGE, data: 0 });
    });
  });

  describe('{ method: prevImage }', () => {
    it('should change to correct state', () => {
      fixture.componentInstance['_event'].load = jasmine.createSpy('load');
      spyOn(lightboxEvent, 'broadcastLightboxEvent');
      fixture.componentInstance.prevImage();
      expect(fixture.componentInstance.ui).toEqual({
        showReloader: true,
        showLeftArrow: false,
        showRightArrow: false,
        showArrowNav: false,
        showZoomButton: false,
        showRotateButton: false,
        showPageNumber: false,
        showCaption: false,
        showDownloadButton: false,
        classList: 'lightbox animation fadeIn'
      });
      expect(lightboxEvent.broadcastLightboxEvent).toHaveBeenCalledTimes(1);
      expect(lightboxEvent.broadcastLightboxEvent).toHaveBeenCalledWith({ id: LIGHTBOX_EVENT.CHANGE_PAGE, data: 0 });
    });

    it('should change to correct state when index is the first image', () => {
      mockData.currentIndex = 0;
      createComponent();
      fixture.componentInstance['_event'].load = jasmine.createSpy('load');
      spyOn(lightboxEvent, 'broadcastLightboxEvent');
      fixture.componentInstance.nextImage();
      expect(fixture.componentInstance.ui).toEqual({
        showReloader: true,
        showLeftArrow: false,
        showRightArrow: false,
        showZoomButton: false,
        showRotateButton: false,
        showArrowNav: false,
        showPageNumber: false,
        showCaption: false,
        showDownloadButton: false,
        classList: 'lightbox animation fadeIn'
      });
      expect(lightboxEvent.broadcastLightboxEvent).toHaveBeenCalledTimes(1);
      expect(lightboxEvent.broadcastLightboxEvent).toHaveBeenCalledWith({ id: LIGHTBOX_EVENT.CHANGE_PAGE, data: 1 });
    });
  });

  function createComponent() {
    fixture = TestBed.createComponent(LightboxComponent);

    // mock options and ref
    fixture.componentInstance.options = mockData.options;
    fixture.componentInstance.album = mockData.album;
    fixture.componentInstance.currentImageIndex = mockData.currentIndex;
    fixture.componentInstance.cmpRef = { destroy: jasmine.createSpy('spy') };
    fixture.detectChanges();
  }
});
