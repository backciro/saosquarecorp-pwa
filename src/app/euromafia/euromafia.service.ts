import { APIENDPOINT } from './../entities/api';
import { Product, IndexProduct, ShopBagProduct } from './../entities/product';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class EuromafiaService {
  constructor(
    private localStorage: LocalStorageService,
    private http: HttpClient
  ) {
    this.activeIndex = this.localStorage.retrieve("activeIndex") || 0;
    this.currentProduct = this.localStorage.retrieve('currentProduct') || {};
    this.currentShopbag = this.localStorage.retrieve('currentShopbag') || [];
    this.currentList = this.localStorage.retrieve('currentList')|| [];
  }

  @Output() shopbagEmitter = new EventEmitter

  apiEndPoint = APIENDPOINT;
  apiEMget = '/euromafia';

  activeIndex: number = 0;

  currentList: IndexProduct[];

  currentProduct: Product;

  currentShopbag: ShopBagProduct[];

  getEuro() {
    const httpOptions = {
      withCredentials: false
    };

    let P = new Promise((resolve, reject) => {
      this.http
        .get(this.apiEndPoint + this.apiEMget, httpOptions)
        .toPromise().then(res =>{
          this.setCurrentList(res);
          return resolve(res);
      })
    });
    return P;
  }

  getEuroById(id: number): Promise<any> {
    const httpOptions = {
      withCredentials: false
    };

    let P = new Promise((resolve, reject) => {
      this.http
        .get(this.apiEndPoint + this.apiEMget + '/' + id, httpOptions)
        .toPromise().then((res) =>{
          return resolve(res);
      })
    });
    return P;
  }

  getObservableOf(key) {
    return this.localStorage.observe(key);
  }

  setIndex(activeIndex) {
    this.activeIndex = activeIndex;
    this.localStorage.store("activeIndex", this.activeIndex);
    // console.log('setting... ', this.activeIndex);
  }
  getIndex() {
    // console.log('retrieving... ', this.activeIndex);
    return this.activeIndex;
  }
  resetIndex() {
    this.activeIndex = null;
    this.localStorage.store("activeIndex", this.activeIndex);
  }

  getCurrentList() {
    return this.localStorage.retrieve('currentList') ? this.localStorage.retrieve('currentList').sort(x => x.id) : [];
  }
  setCurrentList(list) {
    this.localStorage.store("currentList", list);
  }

  getCurrentProduct() {
    return this.currentProduct;
  }
  setCurrentProduct(prod) {
    this.currentProduct = prod;
    this.localStorage.store("currentProduct", this.currentProduct);
  }
  destroyProduct() {
    this.currentProduct = null;
    this.localStorage.store("currentProduct", this.currentProduct);
  }

  getCurrentShopbag() {
    return this.currentShopbag;
  }
  addInCurrentShopbag(shop) {
    let added: boolean = false;

    let data = {
      item: shop,
      availableQty: 1.
    }

    if (this.currentShopbag && this.currentShopbag.length > 0)
      this.currentShopbag.forEach(el => {
        if (el.item.productID === shop.productID &&
            el.item.productSelSize === shop.productSelSize) {
          el.availableQty++;
          added = true;
        }
      });

    if (!added || this.currentShopbag.length === 0)
      this.currentShopbag.push(data);

    this.localStorage.store("currentShopbag", this.currentShopbag);
  }
  remFromCurrentShopbag(id) {
    let delSB = this.currentShopbag.find(x => x.item.productID === id);
    this.currentShopbag.splice(this.currentShopbag.indexOf(delSB));
    this.localStorage.store("currentShopbag", this.currentShopbag);
  }
  destroyShopbag() {
    this.currentShopbag = [];
    this.localStorage.store("currentShopbag", this.currentShopbag);
  }
  getCarelCount() {
    let v = 0;

    if(this.currentShopbag.length > 0) {
      this.currentShopbag.forEach(element => {
        v += element.availableQty;
      });
    }
    else
      return 0;

    return v;
  }

  onShoppagEmit() {
    let v = 0;
    if (this.currentShopbag.length > 0) {
      this.currentShopbag.forEach(el => {
        v += el.availableQty;
      })
    }
    this.shopbagEmitter.emit(v);
  }
}
