import { AppStateService } from './../../app-state.service';
import { User } from './../../entities/user';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnChanges {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private appState: AppStateService
  ) {
    this.loggedUser = this.appState.getUser();

    this.activeRoute.url.subscribe((res) => {
      if (res.length != 0) {
        this.route = res[res.length - 1].path;
        this.classRoute = this.route.replace('new','');
        this.entities = ['Tape', 'Story', 'Clothing', 'Partner', 'Beat', 'Media', 'Product', 'WebSite'];
        console.log(this.route);
      }
    });
   }

  route;
  classRoute;

  showFiller = false;

  entities;

  loggedUser: User;

  lockContent = true;

  ngOnInit() {
    if (this.loggedUser) { // && AUTHENTICATION SKIPPED LOGIN && !R_CSTMR 
      this.lockContent = false;
    }
    else if (this.loggedUser.role != 'R_CSTMR') {

    }
    else if (!this.loggedUser){
      this.router.navigateByUrl('templebank');
    }  
  }

  ngOnChanges() {
    if (this.loggedUser) { // && AUTHENTICATION SKIPPED LOGIN!
      // 
    } else
      this.router.navigateByUrl('templebank');
  }

  onClick(event){
    // console.log(event);
  }

  logout() {
    this.loggedUser = null;
    this.appState.destroyUser();
    this.router.navigateByUrl('templebank');
  }

}
