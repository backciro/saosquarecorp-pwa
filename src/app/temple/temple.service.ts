import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

const apiAuthEndpoint = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDahbkRI7FUdnVxXPtYJwqX9BSbNMiwayw';

@Injectable()

export class TempleService {
  constructor (
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  authService(user, pass) {

    let P = new Promise((resolve, reject) => {
      this.http
        .post(apiAuthEndpoint, { email: user, password: pass })
        .toPromise()
        .then(res =>{
          return resolve(res);
      })
        .catch(err => {
          alert('invalid credentials');
          console.log('AUTH ERROR: ', err);
      })
    });
    return P;
  }

}
