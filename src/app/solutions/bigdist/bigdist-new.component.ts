import { UploaderService } from '../../../core/uploader.service';
import { Album } from '../../entities/album';
import { Tape, TopTape } from '../../entities/tape';
import { Component, ViewChild, ElementRef, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-bigdist-new",
  templateUrl: "./bigdist-new.component.html",
  styleUrls: ["./bigdist-new.component.scss"]
})

export class BigDistNewComponent implements OnInit {
  constructor(
    private uploadService: UploaderService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    ) {
      
    }
    formData: FormData;
    
    imageSrc: string;
    pName: string;
    pPrice: number;
    pQty: number;
    
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
        imageSrc: this.imageSrc,
        pName: this.pName,
        pPrice: this.pPrice,
        pQty: this.pQty
      };
      
      if (this.formData) {
        this.formData.append('data', JSON.stringify(
          {
            'imageSrc': model.imageSrc,
            'pName': model.pName,
            'pPrice': model.pPrice,
            'pQty': model.pQty
          }));
          
          this.uploadService.uploader('SP', this.formData).then(() => {
            this.router.navigateByUrl('');
          });
        } else {
          console.log("ERROR!");
        }
    }
  }
