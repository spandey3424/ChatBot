import { Component, OnInit , Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }
  @Output() enterClicked = new EventEmitter<string>();
  public inputText: string = '';

  onEnterClick() {
    this.enterClicked.emit(this.inputText);
    this.inputText = ''; // Clear the input after emitting the event
  }

  ngOnInit() {
  }

}
