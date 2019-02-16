import { UploaderService } from './../../core/uploader.service';
import { Album } from '../entities/album';
import { Tape, TopTape } from '../entities/tape';
import { Component, ViewChild, ElementRef, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-stories-new",
  templateUrl: "./stories-new.component.html",
  styleUrls: ["./stories-new.component.scss"]
})
export class StoriesNewComponent implements OnInit {
  constructor(
    private uploadService: UploaderService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    ) {
      
    }
    
    formData: FormData;
    
    imageSrc: string;
    contentText: string;
    titleText: string;
    
    lockContent = true;
    
    ngOnInit() {
      
    }
    
    previewImage(event) {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        
        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result.toString();
        
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
      let model = {
        titleText: this.titleText,
        contentText: this.contentText,
      };
      
      if (this.formData) {
        this.formData.append('data', JSON.stringify(
          {
            'titleText': model.titleText,
            'contentText': model.contentText
          })
          );
          
          this.uploadService.uploader('S', this.formData);
        } else {
          console.log("ERROR!")
        }
      }
      
    }
