import { ShopBagProduct } from './../entities/product';
import { Component, ViewChild, OnInit, AfterContentInit } from "@angular/core";
import { EuromafiaService } from './euromafia.service';
import { EUROMAFIA_IDENTIFIER } from './euromafia.component';


@Component({
  selector: "app-euromafia-checkout",
  templateUrl: "./euromafia-checkout.component.html",
  styleUrls: ["./euromafia-checkout.component.scss"]
})

export class EuromafiaCheckoutComponent implements AfterContentInit {

  constructor(
    public euromafia: EuromafiaService
  ) {
    this.checkout = this.euromafia.getCurrentShopbag();
  }

  checkout: ShopBagProduct[];
  displayedColumns: string[] = window.innerWidth < 555 ?  ['productImage', 'productName', 'productPrice', 'productSelSize', 'qty'] : ['productImage', 'productBarcode', 'productName', 'productPrice', 'productSelSize', 'qty'];

  identifier;
  TOTALQTY = 0;
  TOTALCOST = 0;

  ngOnInit() {
    this.identifier = EUROMAFIA_IDENTIFIER;
    if (this.checkout){
      this.checkout.forEach((el)=>{
        this.TOTALQTY += el.availableQty;
        this.TOTALCOST += el.item.productPrice;
      })
    }
  }

  ngAfterContentInit() {
  }

  destroyShopbag() {
    this.euromafia.destroyShopbag();
    this.checkout = this.euromafia.getCurrentShopbag();
    this.euromafia.onShoppagEmit();

  }
}
