import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogPanelComponent } from '../dialog-panel/dialog-panel.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit , AfterViewInit {

  ref: DynamicDialogRef | undefined;
  constructor(private dialogService: DialogService) { }

  ngOnInit() {
  }

  showDialog() {
    this.ref = this.dialogService.open(DialogPanelComponent, {
        header: 'Chat Window',
        width: '80vw',
        modal:true,
        breakpoints: {
            '960px': '75vw',
            '640px': '90vw'
        },
    });
  }

  ngAfterViewInit() {
  //   let sideBar: any = document.querySelector('.side-bar');
  //     let arrowCollapse: any = document.querySelector('#logo-name__icon');
  //     sideBar.onclick = () => {
  //       sideBar.classList.toggle('collapse');
  //       arrowCollapse.classList.toggle('collapse');
  //       if (arrowCollapse.classList.contains('collapse')) {
  //         arrowCollapse.classList =
  //           'pi pi-arrow-left logo-name__icon collapse';
  //       } else {
  //         arrowCollapse.classList = 'pi pi-arrow-right logo-name__icon';
  //       }
  // }
}

}
