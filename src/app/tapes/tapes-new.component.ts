import { UploaderService } from './../../core/uploader.service';
import { Album } from './../entities/album';
import { Tape, TopTape } from './../entities/tape';
import { Component, ViewChild, ElementRef, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TapeService } from "./tapes.service";
import { HttpRequest } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "app-tapes-new",
  templateUrl: "./tapes-new.component.html",
  styleUrls: ["./tapes-new.component.scss"]
})
export class TapesNewComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private tapeService: TapeService,
    private uploadService: UploaderService,
    private router: Router,
    public doms: DomSanitizer, 
    ) { }
    
    atselector:
    { value: string, viewValue: string }[] = [
      {value: 'Tape', viewValue: 'Tape'},
      {value: 'Album', viewValue: 'Album'}
    ];
    
    selectedType = 'Tape';
    imageSrc: string;
    mp3Src: string;
    
    formData: FormData;
    
    tape;
    tapeList: Array<{
      titleList: string,
      artistList: string
    }> = [
      { titleList: '', artistList: '' }
    ];
    
    title;
    artist;
    href;
    
    lockContent = true;
    
    ngOnInit() {
      
    }
    
    addTrack() {
      this.tapeList.push({titleList: '', artistList: ''});
    }
    
    deleteItem(item) {
      this.tapeList.splice(this.tapeList.indexOf(item), 1);
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
          
          if (this.formData)
          this.formData.append('cover', fileCurrent, fileCurrent.name);
          else {
            let formData: FormData = new FormData();
            
            formData.append('cover', fileCurrent, fileCurrent.name);
            this.formData = formData;
          }
        }
      }
    }
    
    loadMp3(event) {
      let fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        
        let fileCurrent: File = fileList[0];
        this.mp3Src = fileCurrent.name;
        
        if (this.formData) {  
          this.formData.append('mp3', fileCurrent, fileCurrent.name);
        } else {
          let formData: FormData = new FormData();
          
          formData.append('mp3', fileCurrent, fileCurrent.name);
          this.formData = formData;
        }
      }
    } 
    
    hideHint(item) {
      console.log(item);
    }
    
    save() {
      let model = {
        selectedType: this.selectedType,
        artist: this.artist,
        title: this.title,
        imageSrc: this.imageSrc,
        href: this.href,
        tapeList: this.tapeList
      };
      
      if (this.formData) {
        this.formData.append('data', JSON.stringify(
          {
            'type': model.selectedType,
            'artist': model.artist,
            'title': model.title,
            'href': model.href,
            'tapelist': model.tapeList
          }));
          this.uploadService.uploader('T', this.formData);
        }
        
        else {
          console.log("ERROR!")
        }
      }
    }
