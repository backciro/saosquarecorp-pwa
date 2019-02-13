import { TapeService } from './../tapes/tapes.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private tape: TapeService
  ) { }

  REGIONS = [
    { name: 'tapes' , coords: '80,39,16,37,19,236,363,425,453,258' },
    { name: 'newsfeed' , coords: '273,596,361,425,18,238,19,404,27,461' },
    { name: 'history' , coords: '614,353,697,212,551,114,556,105,465,38,419,130,387,112,389,108,349,85,347,77,344,72,340,66,331,64,323,65,317,67,312,72,310,82,311,93,316,100,321,105,289,162' },
    { name: 'solutions' , coords: '274,598,439,690,614,351,455,258' },
    { name: 'euromafia' , coords: '615,353,762,440,682,547,630,702,629,790,442,691' },
    { name: 'outlook' , coords: '618,351,748,126,781,89,873,190,876,187,882,185,888,185,893,185,899,189,904,195,905,200,905,207,902,215,901,219,911,231,882,285,863,309,817,372,764,439' },
    { name: 'privacy' , coords: '183,776,169,803,285,803,307,759,287,748,271,774,271,753,245,752,246,775' },
    { name: 'terms' , coords: '540,788,615,786,630,793,629,786,678,786,678,805,629,807,629,813,575,813,533,814' },
    { name: 'compton' , coords: '723,854,756,858,871,861,878,828,869,830,785,803,824,718,841,687,844,673,847,666,903,587,910,486,860,556,848,550,726,720' },
    { name: 'grand-g', coords: '152,803,169,803,238,667,245,656,272,598,108,508,47,627,98,656,128,596,134,595,143,611,84,725,84,782,74,804' },
    { name: 'cocacola' , coords: '922,240,909,229,883,285,806,382,764,440,863,509,848,536,844,541,846,547,859,556,911,482,913,468,896,457,921,409,920,375,893,359,921,327,909,313,921,296' },
    { name: 'walnut' , coords: '630,785,724,785,726,719,847,549,844,544,844,539,864,509,763,443,683,546,629,703' },
    { name: 'mettler-t', coords: '353,854,434,697,433,855' },
    { name: 'staple' , coords: '340,66,342,70,345,74,348,78,348,83,350,85,391,108,388,110,420,129,459,51,429,37,401,93,397,90,425,37,415,28,387,88,382,84,410,25,401,20,375,80,369,74,397,18,386,12,362,70,356,67,381,12,367,11' }
  ];
  private activeRegion: 'root' | 'tapes' | 'solutions' | 'euromafia' | 'news' | 'history' | 'outlook';
  public playing;

  ngOnInit() {
    if (this.tape.getTrack() !== null && !this.tape.getTrack().paused) {
      this.playing = true;
    }
  }
  log(event) {
    console.log(event);
  }



}
