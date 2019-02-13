import { OutlookService } from './outlook/outlook.service';
import { TapeService } from './tapes/tapes.service';
import { IndexProduct } from './entities/product';
import { Component, OnInit, OnChanges, AfterViewInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized, Scroll } from '@angular/router'
import { AppStateService } from './app-state.service';
import * as moment from 'moment';
import { EuromafiaService } from './euromafia/euromafia.service';
import TypeIt from 'typeit';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
  // animations: [fadeAnimation]
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    public activeRoute: ActivatedRoute,
    private router: Router,
    private appState: AppStateService,
    private euromafiaServ: EuromafiaService,
    private tapesServ: TapeService,
    private outlookServ: OutlookService
  ) {
    setInterval(() => {
      this.time = moment()
        .format("h:mm:ss a")
        .toUpperCase();
    }, 500);

    this.appState.onChangeIntercept.subscribe((res) => {
      this.onIntercept(res);
    });

    this.euromafiaServ.shopbagEmitter.subscribe((res) => {
      this.carelCount = res;
    })

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart && !this._inited) {
        this.contentLocked = true;
      }

      if (val instanceof NavigationEnd) {
        this.activeRegion =
          <"root" | "tapes" | "solutions" | "euromafia" | "news" | "history" | "outlook" | "templebank">
          val.url.split('/')[1];
        if (val.url.split('/')[1] === '')
          this.activeRegion = 'root';
        this.appState.setActiveRegion(this.activeRegion);
      }
    });

  }

  public date = new Date();


  public active: "black" | "white" = "white";
  public activeRegion:
    | "root"
    | "tapes"
    | "solutions"
    | "euromafia"
    | "news"
    | "history"
    | "outlook"
    | "templebank";

  public contentLocked: boolean;
  public _inited: boolean;
  public footer;

  public time;
  public title = "S S C";
  public loaded: boolean = false;
  public carelCount = 0;

  display: "block" | "none" = "block";
  width; height;

  ngOnInit() {
    if (window.innerWidth < 555)
      this.footer = 'SSC ' + '\xAE ' + this.date.getFullYear() + ' ';
    else
      this.footer = 'SSC ' + '\xAE ' + this.date.getFullYear() + ' All Rights Reserved. SAO SQUARE CORPORATION Ltd. ';

    this.euromafiaServ.setIndex(0);
    this.carelCount = this.euromafiaServ.getCarelCount();


    // init euromafia
    this.euromafiaServ.getEuro().then((res) => {
      this.euromafiaServ.setCurrentList(<IndexProduct[]>res);
    });

    // init tapes
    this.tapesServ.getTapes().then(res => {
      this.tapesServ.setAlbumBox(res);
    });

    // init outlook
    this.outlookServ.getOutlook().then(res => {
      this.outlookServ.setGallery((res as Array<any>).filter(a => a.type === 'photo'));
      this.outlookServ.setPlaylist((res as Array<any>).filter(a => a.type === 'video'));
    });

    setTimeout(() => {
      this.contentLocked = false;
      this._inited = true;
    }, 1000);
  }

  ngAfterViewInit() {
    if (window.innerWidth < 555) {
      new TypeIt("#typewriter", {
        strings: "sao square corp."
      });
      this.footer = 'SSC ' + '\xAE ' + this.date.getFullYear() + ' ';
    }
    else {
      new TypeIt("#typewriter", {
        strings: "sao square corporation"
      });
      this.footer = 'SSC ' + '\xAE ' + this.date.getFullYear() + ' All Rights Reserved. SAO SQUARE CORPORATION Ltd. ';
    }
  }

  onIntercept(value) {
    if (value) {
      this.display = 'block';
    } else {
      this.display = 'none';
    }
  }

  getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : "";
  }

}
