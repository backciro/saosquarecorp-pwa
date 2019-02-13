import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { GALLERY_IMAGE } from 'ngx-image-gallery';
import { OutlookService } from './outlook.service';

export interface IMEDIA {
  title: string;
  type: string;
  url: string;
}
@Component({
  selector: 'app-outlook',
  templateUrl: './outlook.component.html',
  styleUrls: ['./outlook.component.scss']
})
export class OutlookComponent implements OnInit {

  constructor(
    private outlookServ: OutlookService
  ) { }

  lockContent = true;

  @Output() changeInterceptor = new EventEmitter()

  playlist: IMEDIA[] = [];
  images: GALLERY_IMAGE[] = [];

  ngOnInit() {
    this.playlist = this.outlookServ.getPlaylist();
    this.images = this.outlookServ.getGallery();

    this.lockContent = false;
  }
}
