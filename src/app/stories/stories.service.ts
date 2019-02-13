import { APIENDPOINT } from './../entities/api';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable()

export class StoriesService {
  constructor (
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  apiEndPoint = APIENDPOINT;
  apiSTget = '/stories';

  stories = null;

  getStoriesHttp() {
    const httpOptions = {
      withCredentials: false
    };

    let P = new Promise((resolve, reject) => {
      this.http
        .get(this.apiEndPoint + this.apiSTget, httpOptions)
        .toPromise().then(res =>{
          return resolve(res);
      })
    });
    return P;
  }

  setStories(pl) {
    this.stories = pl;
    this.localStorage.store('stories', this.stories);
  }
  getStories() {
    return this.localStorage.retrieve('stories');
  }
  resetStories() {
    this.stories = null;
    this.localStorage.store('stories', this.stories);
  }

}
