import { UploaderService } from '../../../core/uploader.service';
import { Album } from '../../entities/album';
import { Tape, TopTape } from '../../entities/tape';
import { Component, ViewChild, ElementRef, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-webit-new",
  templateUrl: "./webit-new.component.html",
  styleUrls: ["./webit-new.component.scss"]
})

export class WebitNewComponent implements OnInit {
  constructor(
    private uploadService: UploaderService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    ) {}
    formData: FormData;
    
    logoSite: string;
    siteName: string;
    clientName: string;
    description: string;
    technology: string;
    siteRef: string;
    
    lockContent = true;
    
    ngOnInit() {
      
    }
    
    previewImage(event) {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        
        const reader = new FileReader();
        reader.onload = e => this.logoSite = reader.result.toString();
        
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
        logoSite: this.logoSite,
        siteName: this.siteName,
        clientName: this.clientName,
        description: this.description,
        technology: this.technology,
        siteRef: this.siteRef
      };
      
      if (this.formData) {
        this.formData.append('data', JSON.stringify(
          {
            'logoSite': model.logoSite,
            'siteName': model.siteName,
            'clientName': model.clientName,
            'description': model.description,
            'technology': model.technology,
            'siteRef': model.siteRef
          }));
          
          this.uploadService.uploader('SW', this.formData).then(() => {
            this.router.navigateByUrl('');
          });
        } else {
          console.log("ERROR!");
        }
    }
  }
