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
  selector: "app-euromafia-new",
  templateUrl: "./euromafia-new.component.html",
  styleUrls: ["./euromafia-new.component.scss"]
})

export class EuromafiaNewComponent implements OnInit {
  constructor(
    private uploadService: UploaderService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    ) {
      
    }
    formData: FormData;
    
    imageSrc: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    sizeAvailable: string;
    quantityAvailable: number;
    category: CATEGORY;
    
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
        productName: this.productName,
        productDescription: this.productDescription,
        productPrice: this.productPrice,
        sizeAvailable: this.sizeAvailable,
        quantityAvailable: this.quantityAvailable,
        category: this.category,
      };
      
      if (this.formData) {
        this.formData.append('data', JSON.stringify(
          {
            'productName': model.productName,
            'productDescription': model.productDescription,
            'productPrice': model.productPrice,
            'sizeAvailable': model.sizeAvailable,
            'quantityAvailable': model.quantityAvailable,
            'category': model.category,
          })
          );
          
          this.uploadService.uploader('E', this.formData).then(() => {
            this.router.navigateByUrl('');
          });
        } else {
          console.log("ERROR!");
        }
      }
      
    }
    
