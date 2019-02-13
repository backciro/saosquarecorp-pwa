import { IMEDIA } from './../outlook.component';
import { Component, Input, OnInit } from '@angular/core';
import { VgAPI } from 'videogular2/core';

@Component({
    selector: 'app-smart-playlist',
    templateUrl: './smart-playlist.component.html',
    styleUrls: [
      './smart-playlist.component.scss'
    ]
})

export class SmartPlaylistComponent implements OnInit {

    @Input() playlist: IMEDIA[];
    currentIndex = 0;
    currentItem;
    api: VgAPI;

    constructor() {
    }

    ngOnInit() {
      this.currentItem = this.playlist[this.currentIndex];
    }

    onPlayerReady(api: VgAPI) {
        this.api = api;

        //AUTOPLAY
        // this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
        this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
    }

    nextVideo() {
        this.currentIndex++;

        if (this.currentIndex === this.playlist.length) {
            this.currentIndex = 0;
        }

        this.currentItem = this.playlist[ this.currentIndex ];
    }

    playVideo() {
        this.api.play();
    }

    onClickPlaylistItem(item: IMEDIA, index: number) {
        this.currentIndex = index;
        this.currentItem = item;
    }
}
