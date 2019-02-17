import { User } from './../../../entities/user';
import { AppStateService } from './../../../app-state.service';
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-router',
  templateUrl: './dashboard-router.component.html',
  styleUrls: ['./dashboard-router.component.scss']
})

export class DashboardRouterComponent implements OnInit, OnChanges {
  
  constructor(
    private router: Router,
    private appState: AppStateService,
    private activeRoute: ActivatedRoute
    ) {
      this.loggedUser = this.appState.getUser();
      
      this.activeRoute.url.subscribe((res) => {
        if (res.length != 0) {
          this.route = res[res.length - 1].path;
          this.classRoute = this.route.replace('new','');
        }
      });
    }
    
    route;        
    classRoute;
    
    loggedUser: User;
    lockContent = true;
    
    ngOnInit() {
      if (this.loggedUser) // && AUTHENTICATION SKIPPED LOGIN!
      this.lockContent = false;
      else
      this.router.navigateByUrl('templebank');
    }
    
    ngOnChanges() {
      if (this.loggedUser) { // && AUTHENTICATION SKIPPED LOGIN!
        
      } else {
        this.router.navigateByUrl('templebank');
      }
    }
    
    onClick(event){
      console.log(event);
    }
    
    logout() {
      this.loggedUser = null;
      this.appState.destroyUser();
      this.router.navigateByUrl('templebank');
    }
    
  }
