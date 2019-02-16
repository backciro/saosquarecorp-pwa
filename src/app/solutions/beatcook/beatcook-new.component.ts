import { UploaderService } from '../../../core/uploader.service';
import { Album } from '../../entities/album';
import { Tape, TopTape } from '../../entities/tape';
import { Component, ViewChild, ElementRef, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-beatcook-new",
  templateUrl: "./beatcook-new.component.html",
  styleUrls: ["./beatcook-new.component.scss"]
})

export class BeatcookNewComponent implements OnInit {
  constructor(
    private uploadService: UploaderService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    ) {
      
    }
    formData: FormData;
    
    mediaSrc: string;
    title: string;
    author: string;
    price: number;
    sold: boolean;
    
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
      if (this.formData) {
        this.uploadService.uploader('O', this.formData);
      }
    }
    
  }
