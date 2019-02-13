import { User } from './entities/user';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppState } from './app-state'
import { LocalStorageService } from 'ngx-webstorage';

// import { Observable } from 'rxjs';

@Injectable()

export class AppStateService {

  constructor(
    private localStorage: LocalStorageService,
    private httpService: HttpClient
  ){
    this.state = this.localStorage.retrieve('state') || new AppState();
    this.activeRegion = this.localStorage.retrieve('activeRegion') || ('root');
  }

  public loggedUser: User;
  public activeRegion: 'root' | 'tapes' | 'solutions' | 'euromafia' | 'news' | 'history' | 'outlook';



  state: AppState = new AppState();

  @Output() onChangeIntercept = new EventEmitter();
  changeIntercept(status: boolean) {
    this.onChangeIntercept.emit(status);
  }

  getStorageObservable(key: string) {
    return this.localStorage.observe(key);
  }
  preload(): Promise<any> {

    let promises = [
      new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 1000);
      })
    ];

    return Promise.all(promises);
  }


  getUser() {
    return this.localStorage.retrieve('user');
  }
  setUser(user) {
    this.loggedUser = user;
    this.localStorage.store('user', this.loggedUser);
  }
  destroyUser() {
    this.loggedUser = null;
    this.localStorage.store('user', this.loggedUser);
  }

  getAccessToken(): String {
    return this.state['access_token'];
  }
  getData(key: 'todos' | 'users'): any[] {
    return this.state['data'][key];
  }
  setAccessToken(access_token: string) {
    this.state['access_token'] = access_token;
  }
  setData(key: 'todos' | 'users', value) {
    this.state['data'][key] = value;
  }

  getActiveRegion() {
    return this.activeRegion;
  }
  setActiveRegion(route) {
    this.activeRegion = route;
    this.localStorage.store('activeRegion', route);
  }

}
