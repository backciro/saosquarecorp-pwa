import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class TapeService {
  constructor (
    private http: HttpClient
  ) { }

  playingTrack = null;

  setTrack(track) {
    this.playingTrack = track;
  }

  getTrack() {
    return this.playingTrack;
  }

  reset() {
    this.playingTrack = null;
  }

}
