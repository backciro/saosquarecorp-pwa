import { APIENDPOINT } from '../app/entities/api';
import { LocalStorageService } from 'ngx-webstorage';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class UploaderService {
  constructor (
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  apiEndPoint = APIENDPOINT;
  apiTPpost = '/upload';

  uploader(
    selector: 'T' | 'E' | 'O' | 'S',
    formData: FormData
    ) {

    let headers = new HttpHeaders();
    headers.append('enctype', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    this.apiTPpost = '/upload';
    switch (selector) {
      case 'T':
        this.apiTPpost = '/tapes' + this.apiTPpost;
        break;
      case 'E':
        this.apiTPpost = '/euromafia' + this.apiTPpost;
        break;
      case 'O':
        this.apiTPpost = '/outlook' + this.apiTPpost;
        break;
      case 'S':
        this.apiTPpost = '/stories' + this.apiTPpost;
        break;
    }

    let P = new Promise((resolve, reject) => {
      this.http
        .post(this.apiEndPoint + this.apiTPpost, formData)
        .toPromise().then(res =>{
          return resolve(res);
      })
    });
    return P;
  }
}
