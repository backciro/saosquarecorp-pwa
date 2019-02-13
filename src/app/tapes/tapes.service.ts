import { APIENDPOINT } from './../entities/api';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable()

export class TapeService {
  constructor (
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.albumBox = this.localStorage.retrieve('albumBox') || null;
  }

  apiEndPoint = APIENDPOINT;
  apiTPget = '/tapes';

  tape = null;
  albumBox = null;
  playingTrack = null;
  frequencyData = null;
  mediaSource = null;
  analyzer = null;
  context = null;
  waveform = null;

  getTapes() {
    const httpOptions = {
      withCredentials: false
    };

    let P = new Promise((resolve, reject) => {
      this.http
        .get(this.apiEndPoint + this.apiTPget, httpOptions)
        .toPromise().then(res =>{
          return resolve(res);
      })
    });
    return P;
  }

  downloadAlbum(fileUrl) {
    return this.http
      .get(fileUrl, {
        responseType: 'blob'
      });
  }

  setAlbumBox(albumBox) {
    this.albumBox = albumBox
    this.localStorage.store('albumBox', this.albumBox);
  }
  getAlbumBox() {
    return this.albumBox;
  }
  resetAlbumBox() {
    this.albumBox = null;
    this.localStorage.store('albumBox', this.albumBox);
  }

  setTrack(track) { this.playingTrack = track; }
  getTrack() { return this.playingTrack;}
  resetTrack() { this.playingTrack = null; }

  setTape(tape) { this.tape = tape; }
  getTape() { return this.tape;}
  resetTape() { this.tape = null; }

  setSrc(src) { this.mediaSource = src; }
  getSrc() { return this.mediaSource; }
  resetSrc() { this.mediaSource = null; }

  setAnalyzer(analyzer) { this.analyzer = analyzer; }
  getAnalyzer() { return this.analyzer; }
  resetAnalyzer() { this.analyzer = null; }

  setContext(ctx) { this.context = ctx; }
  getContext() { return this.context; }
  resetContext() { this.context = null; }

  setWave(wave) { this.waveform = wave; }
  getWave() { return this.waveform; }
  resetWaveform() { this.waveform = null; }

}
