import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onEnterClick(enteredText: string) {
    // Handle the logic when the enter button is clicked
    console.log('Entered text:', enteredText);
    // You can perform further actions here based on the entered text
  }

}
