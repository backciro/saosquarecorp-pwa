import { OutlookNewComponent } from './outlook/outlook-new.component';
import { UploaderService } from './../core/uploader.service';
import { DashboardRouterComponent } from './temple/dashboard/dashboard-router/dashboard-router.component';
import { DashboardComponent } from './temple/dashboard/dashboard.component';
import { TempleService } from './temple/temple.service';
import { TempleComponent } from './temple/temple.component';

// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MglTimelineModule } from 'angular-mgl-timeline';
import { AudioContextModule } from 'angular-audio-context';


import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatBottomSheetModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';


//VideoGular
import { CommonModule } from '@angular/common';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from "videogular2/overlay-play";
import { SmartPlaylistComponent } from './outlook/smart-playlist/smart-playlist.component';
import { VgBufferingModule } from 'videogular2/buffering';

//Gallery
import { NgxImageGalleryModule } from 'ngx-image-gallery';

//Material
import { DragDropModule } from "@angular/cdk/drag-drop";

// EuroMafia
import { EuromafiaComponent } from './euromafia/euromafia.component';
import { EuromafiaDetailComponent } from './euromafia/euromafia-detail.component';
import { EuromafiaCheckoutComponent } from 'src/app/euromafia/euromafia-checkout.component';
import { EuromafiaNewComponent } from './euromafia/euromafia-new.component';
import { EuromafiaService } from './euromafia/euromafia.service';

import {_SwiperComponent } from 'src/app/euromafia/swiper/_swiper.component';
import { LavaLampComponent } from './euromafia/lava-lamp/lava-lamp.component';
import { NgxBarcodeModule } from 'ngx-barcode';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
// import { ScrollerDirective } from 'src/core/stop-propagation.directive';

// APP
import { AppComponent } from './app.component';

// TAPES
import { TapesComponent } from './tapes/tapes.component'
import { TapesNewComponent } from './tapes/tapes-new.component'

// COMPONENTS
import { MapComponent } from './map/map.component';
import { StoriesComponent } from './stories/stories.component';
import { StoriesNewComponent } from './stories/stories-new.component';
import { HistoryComponent } from './history/history.component';
import { OutlookComponent } from './outlook/outlook.component';

import { SolutionsComponent } from './solutions/solutions.component';
import { WebitComponent } from './solutions/webit/webit.component';
import { WebitNewComponent } from './solutions/webit/webit-new.component';
import { BeatcookComponent } from './solutions/beatcook/beatcook.component';
import { BeatcookNewComponent } from './solutions/beatcook/beatcook-new.component';
import { BigDistComponent } from './solutions/bigdist/bigdist.component';
import { BigDistNewComponent } from './solutions/bigdist/bigdist-new.component';

import { VisualizerComponent } from './tapes/visualizer/visualizer.component';
import { SmartGalleryComponent } from './outlook/smart-gallery/smart-gallery.component';

// SERVICES
import { AppStateService } from './app-state.service';
import { TapeService } from './tapes/tapes.service';
import { StoriesService } from './stories/stories.service';
import { OutlookService } from './outlook/outlook.service';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'vertical',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true
};

const ROUTES: Routes = [
  {path: 'templebank/dashboard/product', component: DashboardComponent},
  {path: 'templebank/dashboard/partner', component: DashboardComponent},
  {path: 'templebank/dashboard/beat', component: DashboardComponent},
  {path: 'templebank/dashboard/media', component: DashboardComponent},
  {path: 'templebank/dashboard/website', component: DashboardComponent},
  {path: 'templebank/dashboard/clothing', component: DashboardComponent},
  {path: 'templebank/dashboard/story', component: DashboardComponent},
  {path: 'templebank/dashboard/tape', component: DashboardComponent},
  {path: 'templebank/dashboard', component: DashboardComponent},
  {path: 'templebank', component: TempleComponent},
  {path: 'outlook', component: OutlookComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'euromafia/checkout', component: EuromafiaCheckoutComponent },
  {path: 'euromafia/:id', component: EuromafiaDetailComponent},
  {path: 'euromafia', component: EuromafiaComponent},
  {path: 'solutions/bigdistribution', component: BigDistComponent},
  {path: 'solutions/beatcookin', component: BeatcookComponent},
  {path: 'solutions/webit', component: WebitComponent},
  {path: 'solutions', component: SolutionsComponent},
  {path: 'stories', component: StoriesComponent},
  {path: 'tapes', component: TapesComponent},
  // {path: 'dashboard', component: AdminLayoutComponent, children: [{path: '', loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'}]},
  {path: '', component: MapComponent},
  {path: '*', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,

    MapComponent,
    TapesComponent,
    TapesNewComponent,
    StoriesComponent,
    StoriesNewComponent,
    SolutionsComponent,
    HistoryComponent,
    OutlookComponent,
    OutlookNewComponent,

    VisualizerComponent,
    SmartPlaylistComponent,
    SmartGalleryComponent,

    // SOLComponents
    WebitComponent,
    WebitNewComponent,
    BeatcookComponent,
    BeatcookNewComponent,
    BigDistComponent,
    BigDistNewComponent,

    // EMComponents
    EuromafiaComponent,
    EuromafiaDetailComponent,
    EuromafiaCheckoutComponent,
    EuromafiaNewComponent,
    _SwiperComponent,
    LavaLampComponent,
    // ScrollerDirective,
    // TypingAnimationDirective

    // TEMPLEComponents
    TempleComponent,
    DashboardComponent,
    DashboardRouterComponent
  ],
  imports: [
    BrowserModule,

    RouterModule.forRoot(ROUTES),
    FormsModule,
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    MglTimelineModule,
    AudioContextModule.forRoot("balanced"),

    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,

    CommonModule,
    VgCoreModule,
    VgOverlayPlayModule,
    VgControlsModule,
    VgBufferingModule,

    NgxImageGalleryModule,
    SwiperModule,
    BrowserModule,
    FlexLayoutModule,
    NgxBarcodeModule,

  ],
  providers: [
    AppStateService,
    TapeService,

    EuromafiaService,
    OutlookService,
    StoriesService,
    TempleService,
    UploaderService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
