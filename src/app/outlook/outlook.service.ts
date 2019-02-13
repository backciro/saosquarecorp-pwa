import { APIENDPOINT } from './../entities/api';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable()

export class OutlookService {
  constructor (
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  apiEndPoint = APIENDPOINT;
  apiOLget = '/outlook';

  playlist = null;
  gallery = null;

  getOutlook() {
    const httpOptions = {
      withCredentials: false
    };

    let P = new Promise((resolve, reject) => {
      this.http
        .get(this.apiEndPoint + this.apiOLget, httpOptions)
        .toPromise().then(res =>{
          return resolve(res);
      })
    });
    return P;
  }

  setPlaylist(pl) {
    this.playlist = pl;
    this.localStorage.store('playlist', this.playlist);
  }
  getPlaylist() {
    return this.localStorage.retrieve('playlist');
  }
  resetPlaylist() {
    this.playlist = null;
    this.localStorage.store('playlist', this.playlist);
  }

  setGallery(gal) {
    this.gallery = gal;
    this.localStorage.store('gallery', this.gallery);
  }
  getGallery() {
    return this.localStorage.retrieve('gallery');
  }
  resetGallery() {
    this.gallery = null;
    this.localStorage.store('gallery', this.gallery);
  }

}
