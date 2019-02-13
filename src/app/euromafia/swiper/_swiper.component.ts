import { IndexProduct } from './../../entities/product';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, ViewChild, OnInit, AfterContentInit, Input, ChangeDetectorRef } from "@angular/core";
import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface, SwiperFadeEffectInterface, SwiperFlipEffectInterface, SwiperCubeEffectInterface } from 'ngx-swiper-wrapper';
import { EuromafiaService } from '../euromafia.service';


@Component({
  selector: "app-swiper",
  templateUrl: "./_swiper.component.html",
  styleUrls: ["./_swiper.component.scss"]
})

export class _SwiperComponent implements OnInit, AfterContentInit {

  constructor(
    private sanitizer: DomSanitizer,
    private euromafiaServ: EuromafiaService,
    private cdRef:ChangeDetectorRef
  ) {}

  protected _locker: boolean = false;
  public show: boolean = true;
  public type: string = 'component';
  public disabled: boolean = false;
  public config: SwiperConfigInterface = {
    lazy: true,
    a11y: false,
    direction: 'vertical',
    slidesPerView: 2,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: true,
    simulateTouch: true,
    slideToClickedSlide: true,
    speed: 500,
  };

  private scrollbar: SwiperScrollbarInterface = {
    el: '.swiper-scrollbar',
    hide: true,
    draggable: false
  };

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };

  @ViewChild(SwiperComponent) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;

  @Input() products: IndexProduct[];

  @Input() activeIndex: number;

  ngOnInit(): void {
    if (this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.setIndex(0);
    }

    this.cdRef.detectChanges();
  }

  ngAfterContentInit() {
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.toggleOverlayControls();
    this.toggleOverlayControls();
    this.toggleOverlayControls();
    this.cdRef.detectChanges();
  }

  ngOnChanges() {
    this.cdRef.detectChanges();
  }

  public toggleOverlayControls(): void {
    if (this.config.navigation) {
      this.config.scrollbar = false;
      this.config.navigation = false;

      this.config.pagination = this.pagination;
    } else if (this.config.pagination) {
      this.config.navigation = false;
      this.config.pagination = false;

      this.config.scrollbar = this.scrollbar;
    } else {
      this.config.scrollbar = false;
      this.config.pagination = false;
      this.config.navigation = true;
    }

    if (this.componentRef && this.componentRef.directiveRef)
      this.componentRef.directiveRef.setIndex(0);
  }

  public onIndexChange(event): void {
    this.euromafiaServ.setIndex(event);
    // console.log(event);
  }

  public onImgClick(event) {
    // console.log(this.euromafiaServ.getIndex());
  }

  public onSwiperEvent(e: WheelEvent) {
  }
}
