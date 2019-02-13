import { IndexProduct } from './../entities/product';
import {
  Component,
  ViewChild,
  OnInit,
  AfterContentInit,
  ChangeDetectorRef
} from "@angular/core";
import { EuromafiaService } from "./euromafia.service";

export const EUROMAFIA_IDENTIFIER = 387034174;
@Component({
  selector: "app-euromafia",
  templateUrl: "./euromafia.component.html",
  styleUrls: ["./euromafia.component.scss"]
})
export class EuromafiaComponent implements OnInit, AfterContentInit {
  constructor(
    public euromafia: EuromafiaService,
    private cdRef: ChangeDetectorRef
  ) {
  }

  swiperLock: boolean = true;
  lockContent = true;

  products: IndexProduct[] = [];
  swiperProducts: IndexProduct[] = [];

  activeTileIndex: number;

  ngOnInit() {
    if (this.euromafia.getCurrentList() == null) {
      this.euromafia.getEuro().then((res) => {
        this.products = <IndexProduct[]>res;
        this.euromafia.setCurrentList(this.products);
      });
    } else {
      this.products = this.euromafia.getCurrentList();

      this.lockContent = false;
    }

    this.euromafia.destroyProduct();
  }

  ngOnDestroy(): void {
    this.products = [];
  }


  ngAfterContentInit() {
  }

  ngAfterViewInit() {
    this.swiperLock = false;
    this.activeTileIndex = this.euromafia.getIndex();
  }
}
