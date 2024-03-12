import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
//   @HostListener('window:beforeunload', ['$event'])
// beforeunloadHandler(event: any): void {
//   if(!pageReloaded) { // The pageReloaded boolean we set earlier
//     let tabCount = parseInt(localStorage.getItem('tabCount'));
//     --tabCount;
//     localStorage.setItem('tabCount', tabCount.toString());
//   }
// }
  title = 'ns-app';

  constructor(){
     // We need to parse into integer since local storage can only
  // store strings.
  // let tabCount: any = Number(sessionStorage.getItem("windowCount"));

  // // Then we instantiate tabCount if it doesn't already exist
  // // OR Increment by 1 if it already exists
  // tabCount = Number.isNaN(tabCount) ? 1 : ++tabCount;

  // // Set the count on local storage
  // localStorage.setItem('tabCount', tabCount.toString());
  }
}
