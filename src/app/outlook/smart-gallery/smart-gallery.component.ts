import { AppStateService } from './../../app-state.service';
import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from "ngx-image-gallery";

@Component({
  selector: 'app-smart-gallery',
  templateUrl: './smart-gallery.component.html',
  styleUrls: ['./smart-gallery.component.scss']
})

export class SmartGalleryComponent implements OnInit {
  // get reference to gallery component
  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;

  // gallery configuration
  conf: GALLERY_CONF = {
    imageOffset: '20px',
    showDeleteControl: false,
    showImageTitle: false,
    showExtUrlControl: false,
    reactToMouseWheel: false,
    imagePointer: true
  };

  // gallery images
  @Input() images: GALLERY_IMAGE[];

  constructor(
    private appState: AppStateService,
   ){
  }

  ngOnInit() {
  }

  // METHODS
  // open gallery
  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
    this.appState.onChangeIntercept.emit(false);
  }

  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
    this.appState.onChangeIntercept.emit(true);
  }

  // set new active(visible) image in gallery
  newImage(index: number = 0) {
    this.ngxImageGallery.setActiveImage(index);
  }

  // next image in gallery
  nextImage(index: number = 0) {
    this.ngxImageGallery.next();
  }

  // prev image in gallery
  prevImage(index: number = 0) {
    this.ngxImageGallery.prev();
  }

  // EVENTS
  // callback on gallery opened
  galleryOpened(index) {
  }

  // callback on gallery closed
  galleryClosed() {
  }

  // callback on gallery image clicked
  galleryImageClicked(index) {
    this.closeGallery();
  }

  galleryImageChanged(index) {
  }

}
