import { Story } from './../entities/story';
import { StoriesService } from './stories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {

  constructor(
    private StoriesServ: StoriesService
  ) { }

  lockContent = true;

  side;
  alternate: boolean = true;
  toggle: boolean = true;
  color: boolean = false;
  size: number = 23;
  expandEnabled: boolean = true;

  stories: Story[] = [];

  ngOnInit() {
      this.StoriesServ.getStoriesHttp().then(res => {
        this.stories = (<Array<Story>>res);
        this.StoriesServ.setStories(this.stories);

        setTimeout(() => {
          this.lockContent = false;
        }, 250);
      });
  }

  ngAfterViewInit() {
  }

  onHeaderClick(event) {
    if (!this.expandEnabled) {
      event.stopPropagation();
    }
  }

  onDotClick(event) {
    if (!this.expandEnabled) {
      event.stopPropagation();
    }
  }

  toggleSide() {
    this.side = this.side === 'left' ? 'right' : 'left';
  }

}
