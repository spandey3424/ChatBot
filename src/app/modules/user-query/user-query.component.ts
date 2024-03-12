import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-query',
  templateUrl: './user-query.component.html',
  styleUrls: ['./user-query.component.scss']
})
export class UserQueryComponent implements OnInit {

  @Input() prompt: any

  constructor() { }

  ngOnInit() {
  }

}
