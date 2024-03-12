import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bullet-summary',
  templateUrl: './bullet-summary.component.html',
  styleUrls: ['./bullet-summary.component.scss']
})
export class BulletSummaryComponent implements OnInit {

  typeOfArray: any = Array;
  @Input() prompt:any
  constructor() { }

  ngOnInit() {
  }

  findType() {
    return typeof this.prompt.message?.Summary;
  }

}
