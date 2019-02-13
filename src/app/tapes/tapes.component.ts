import { Album } from './../entities/album';
import { Tape, TopTape } from './../entities/tape';
import { Component, ViewChild, ElementRef, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TapeService } from "./tapes.service";
import { AudioContext } from "angular-audio-context";
import { DomSanitizer } from "@angular/platform-browser";
import { VisualizerComponent } from "./visualizer/visualizer.component";

@Component({
  selector: "app-tapes",
  templateUrl: "./tapes.component.html",
  styleUrls: ["./tapes.component.scss"]
})
export class TapesComponent implements OnInit {
  constructor(

    private tapeService: TapeService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  @ViewChild("visualizer") visualizer: VisualizerComponent;

  lockContent = true;

  currTrack: {
    playingTrack: any
    tape: Tape
  } = {
    playingTrack: '', tape: new Tape()
  };

  currAlbum: {
    playingAlbum: any
    album: Album
  } = {
    playingAlbum: '', album: new Album()
  };

  _isPlaying: boolean;

  context: AudioContext = new AudioContext();
  analyzer; src; waveform;
  frequencyData: Uint8Array;

  greatHit: TopTape = {
    id: 0,
    id_group: 0,
    titleTrack: '',
    artistTrack: '',
    imageUrl: '',
    songUrl: '',
    downloadUrl: '',
    spotify: '',
    youtube: ''
  };

  albumBox: TopTape[] = [{
    id: 0,
    id_group: 0,
    titleTrack: '',
    artistTrack: '',
    imageUrl: '',
    songUrl: '',
    downloadUrl: '',
    spotify: '',
    youtube: ''
  }];


  ngOnInit() {

    if (this.tapeService.getAlbumBox() == null) {
      this.tapeService.getTapes().then( res => {
        this.greatHit = res[0];
        this.albumBox = <Array<TopTape>>res;
      });
    } else {
        this.greatHit = this.tapeService.getAlbumBox()[0];
        this.albumBox = this.tapeService.getAlbumBox();
    }

    if(this.tapeService.getTrack() === null) {
      this.loadTrackOrPlaylist(this.greatHit, "track");
    } else {
      this.loadTrackOrPlaylist(this.tapeService.getTape(), "track");
    }

    this.lockContent = false;
    setTimeout(() => {
      setTimeout(() => {
        this.visualizer.draw();
      }, 25);
    }, 25);
    }

  loadTrackOrPlaylist(data: Tape | TopTape, type: "track" | "album") {
    if (type === "track") {

      this.currTrack.tape.artistTrack = data.artistTrack;
      this.currTrack.tape.titleTrack = data.titleTrack;

      if (this.tapeService.getTrack() === null) {
        // getTrack vuoto vuol dire nulla in riproduzione
        this.currTrack.tape.id = data.id;

        this.currTrack.playingTrack = new Audio(data.downloadUrl);
        this.currTrack.playingTrack.load();

        this.currTrack.playingTrack.crossOrigin = "anonymous";

        this.setAudioMetadata();

        this.tapeService.setTrack(this.currTrack.playingTrack);
        this.tapeService.setTape(this.currTrack.tape);
      } else {
        if (this.tapeService.getTape().id === data.id) {
          // atterro in pagina
          this.currTrack.tape = this.tapeService.getTape();
          this.currTrack.playingTrack = this.tapeService.getTrack();
          this.currTrack.playingTrack.crossOrigin = "anonymous";

          this.getAudioMetadata();

          if (!this.currTrack.playingTrack.paused)
            this._isPlaying = true;
        } else {
          this.currTrack.tape.id = data.id;
          this.currTrack.playingTrack.pause();

          this.currTrack.playingTrack = new Audio(data.downloadUrl);
          this.currTrack.playingTrack.load();

          this.currTrack.playingTrack.crossOrigin = "anonymous";
          this.setAudioMetadata();

          this.tapeService.setTrack(this.currTrack.playingTrack);
          this.tapeService.setTape(this.currTrack.tape);

          this._isPlaying = false;
        }
      }

    } else {
      this.currAlbum.album.albumArtist = data.artistTrack;
      this.currAlbum.album.albumName = data.titleTrack;
    }
  }

  play() {
    if (this._isPlaying) {
      this.currTrack.playingTrack.pause();
      this._isPlaying = false;
    } else {
      const playPromise = this.currTrack.playingTrack.play();
      if (playPromise !== null){
          playPromise.catch(() => { this.currTrack.playingTrack.play(); })
      }
      this._isPlaying = true;
    }
    this.tapeService.setTrack(this.currTrack.playingTrack);
  }

  tenSec(plus: "+" | "-") {
    if (plus === "+") {
      this.currTrack.playingTrack.currentTime += 10;
    } else {
      this.currTrack.playingTrack.currentTime -= 10;
    }
    this.tapeService.setTrack(this.currTrack.playingTrack);
  }

  scaleTrack(which) {
    if (which === 1) {
      console.log("avanti");

    } else {
      console.log("indietro");
    }
  }

  stop() {
    this.currTrack.playingTrack.pause();

    this.currTrack = {
      playingTrack: null,
      tape: new Tape()
    };

    this.tapeService.resetTrack();
    this._isPlaying = false;
  }

  getProgress() {
    if (this.currTrack.playingTrack)
      return (this.currTrack.playingTrack.currentTime + 0.25) /
        (this.currTrack.playingTrack.duration * 10)
        ? ((this.currTrack.playingTrack.currentTime + 0.25) * 100) /
            (this.currTrack.playingTrack.duration * 1) +
            "%"
        : "0%";
  }

  isPlaying() {
    return this._isPlaying ? "active" : "";
  }

  updateAudioData(event) {
    this.analyzer.getFloatTimeDomainData(this.waveform);
  }

  dataClick(event) {;
    this.loadTrackOrPlaylist(this.albumBox.find(x => x.id === event), "track");

    this.play();
  }

  downloadContent(id) {
    this.tapeService.downloadAlbum(this.albumBox.find(x=>x.id === id).downloadUrl).subscribe(x => {
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      var newBlob = new Blob([x], { type: "audio/mp3" });

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);

      var link = document.createElement('a');
      link.href = data;
      link.download = `${this.albumBox.find(x=>x.id === id).titleTrack+' - '+this.albumBox.find(x=>x.id === id).artistTrack}.mp3`;
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
      }, 100);
  });;
  }

  albumClass(id) {
    return (this.currTrack && !this.currTrack.playingTrack.paused && this.currTrack.tape.id === id) ?
      "album soundPlaying" : "album";
  }

  private getAudioMetadata() {
    this.analyzer = this.tapeService.getAnalyzer();
    this.context = this.tapeService.getContext();
    this.src = this.tapeService.getSrc();
    this.waveform = this.tapeService.getWave();

    this.src.connect(this.analyzer);
    this.analyzer.connect(this.context.destination);
    this.analyzer.fftSize = 64;

    this.frequencyData = new Uint8Array(this.analyzer.frequencyBinCount);
  }

  private setAudioMetadata() {
    this.src = this.context.createMediaElementSource(this.currTrack.playingTrack);
    this.analyzer = this.context.createAnalyser();

    this.src.connect(this.analyzer);
    this.analyzer.connect(this.context.destination);
    this.analyzer.fftSize = 64;
    this.frequencyData = new Uint8Array(this.analyzer.frequencyBinCount);

    this.waveform = new Float32Array(this.analyzer.frequencyBinCount);

    this.tapeService.setSrc(this.src);
    this.tapeService.setAnalyzer(this.analyzer);
    this.tapeService.setContext(this.context);
    this.tapeService.setWave(this.waveform);
  }
}
