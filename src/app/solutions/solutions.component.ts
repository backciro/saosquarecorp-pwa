import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss']
})
export class SolutionsComponent implements OnInit {

  constructor() { }
  lockContent = true;

  ngOnInit() {
    this.lockContent = false;

    setTimeout(() => {
    }, 150);
  }

}
