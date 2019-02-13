import { Product } from './../entities/product';
import { EuromafiaService } from './euromafia.service';
import { EUROMAFIA_IDENTIFIER } from './euromafia.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Component,ViewEncapsulation, ViewChild, OnInit, AfterContentInit, OnDestroy } from "@angular/core";


@Component({
  selector: "app-euromafia-detail",
  templateUrl: "./euromafia-detail.component.html",
  styleUrls: ["./euromafia-detail.component.scss"],
  encapsulation: ViewEncapsulation.None
})

export class EuromafiaDetailComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private euromafia_: EuromafiaService,
  ) {}

  barcode: number;

  currentProduct: Product;

  sizes: { value: string, viewValue: string }[] = [
    { value: '0', viewValue: 'OUT OF STOCK' },
    { value: 'S', viewValue: 'Small' },
    { value: 'M', viewValue: 'Medium' },
    { value: 'L', viewValue: 'Large' },
    { value: 'XL', viewValue: 'XLarge' }
  ]; sizeArray = new Array();
  selectedSize;

  ngOnInit() {
    this.activatedRoute.params.subscribe((param) => {
      this.barcode = param.id;
    });

    //chiamata http by id

    this.euromafia_.getEuroById(this.barcode).then((res) => {

      let found = false, i = 0;
      this.sizeArray = res[0].size.toUpperCase().split(';');
      this.sizes = this.sizes.filter(el => this.sizeArray.includes(el.value.toUpperCase()));

      if (this.sizes.length === 0)
        this.sizes = [{ value: '0', viewValue: 'OUT OF STOCK' }];

      this.currentProduct = {
        productID: this.barcode - EUROMAFIA_IDENTIFIER,
        productName: res[0].product_name,
        productSelSize: '',
        productPrice: res[0].price,
        productImages: [
          { imgSrc: res[0].cover_image },
          { imgSrc: res[0].cover_image },
          { imgSrc: res[0].cover_image }
        ],
      };
      this.euromafia_.setCurrentProduct(this.currentProduct);
    });
  }

  ngAfterContentInit() {
  }

  ngOnDestroy(): void {
    this.euromafia_.setCurrentProduct(null);
  }

  addProductShopbag() {
    this.currentProduct.productSelSize = this.selectedSize;
    this.euromafia_.addInCurrentShopbag(this.currentProduct);
    this.euromafia_.onShoppagEmit();
    this.router.navigateByUrl('/euromafia/checkout');
  }

}
