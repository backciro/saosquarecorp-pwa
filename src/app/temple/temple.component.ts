import { TempleService } from './temple.service';
import { User } from './../entities/user';
import { AppStateService } from './../app-state.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material'

@Component({
  selector: 'app-temple',
  templateUrl: './temple.component.html',
  styleUrls: ['./temple.component.scss']
})

export class TempleComponent implements OnInit {
  
  constructor(
    private router: Router,
    private appState: AppStateService,
    private temple: TempleService
    ) {
      this.loggedUser = this.appState.getUser();
    }
    
    loggedUser: User;
    username: string;
    password: string;
    
    lockContent = true;
    showSpinner = false;
    
    ngOnInit() {
      
      if (this.loggedUser)
      this.router.navigateByUrl('templebank/dashboard');
      else
      this.lockContent = false;
    }
    
    login(): void {
      this.showSpinner = true;
      
      try {
        this.temple.authService(this.username, this.password).then(loggedUsr => {
          
          if (loggedUsr) {
            console.log(loggedUsr);
            
            this.router.navigateByUrl('templebank/dashboard');
            // let dbUser = new User();
            
            this.appState.setUser(loggedUsr);
          }
        });
        setTimeout(() => {
          this.showSpinner = false;
        }, 500);
        
      } catch(e) {
        console.log(e);
      }
    }
    
  }
