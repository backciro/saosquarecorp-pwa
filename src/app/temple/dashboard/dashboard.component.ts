import { AppStateService } from './../../app-state.service';
import { User } from './../../entities/user';
import { Component, OnInit, OnChanges, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
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
          console.log(this.loggedUser.role);
           
          switch(this.loggedUser.role) {
            case 'R_CEO':
            this.entities = ['Tape', 'Story', 'Clothing', 'Partner', 'Beat', 'Media', 'Product', 'WebSite'];
            break;
            case 'R_CRTR':
            this.entities = ['Story', 'Media'];
            break;
            case 'R_CSTMR':
            this.entities = ['Story'];
            break;
            case 'R_DSGNR':
            this.entities = ['Story', 'Clothing'];
            break;
            case 'R_DSPTCHR':
            this.entities = ['Story', 'Product'];
            break;
            case 'R_SQR':
            this.entities = ['Story'];
            break;
            case 'R_TRPSTR':
            this.entities = ['Tape', 'Story', 'Beat'];
            break;
            default:
            this.entities = [];
            break;
            
          }
          
        }
      });
    }
    
    loggedUser: User;
    
    route;
    classRoute;
    
    showFiller = false;
    
    entities;
    
    
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
