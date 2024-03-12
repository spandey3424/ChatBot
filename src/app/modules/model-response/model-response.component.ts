import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-model-response',
  templateUrl: './model-response.component.html',
  styleUrls: ['./model-response.component.scss']
})
export class ModelResponseComponent implements OnInit {

  @Input() prompt:any

  constructor() { }

  ngOnInit() {
  }

}
