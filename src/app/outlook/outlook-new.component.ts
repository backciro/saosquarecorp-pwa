import { UploaderService } from '../../core/uploader.service';
import { Album } from '../entities/album';
import { Tape, TopTape } from '../entities/tape';
import { Component, ViewChild, ElementRef, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

const enum CATEGORY {
  top = 1,
  bottom = 2,
  outwear = 3,
  limited = 4,
  customs = 5
}

@Component({
  selector: "app-outlook-new",
  templateUrl: "./outlook-new.component.html",
  styleUrls: ["./outlook-new.component.scss"]
})

export class OutlookNewComponent implements OnInit {
  constructor(
    private uploadService: UploaderService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {

  }
  formData: FormData;

  typeSelector:
    { value: string, viewValue: string }[] = [
      { value: 'photo', viewValue: 'Photo' },
      { value: 'video', viewValue: 'Video' }
    ];

  mediaSrc: string;
  caption: string;
  type: 'photo' | 'video';

  lockContent = true;

  ngOnInit() {

  }

  previewImage(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.mediaSrc = reader.result.toString();

      reader.readAsDataURL(file);

      let fileList: FileList = event.target.files;
      if (fileList.length > 0) {

        let fileCurrent: File = fileList[0];
        let formData: FormData = new FormData();

        formData.append('file', fileCurrent, fileCurrent.name);
        this.formData = formData;
      }
    }
  }

  hideHint(item) {
    console.log(item);
  }

  save() {
    this.uploadService.uploader('O', this.formData);
  }

}
