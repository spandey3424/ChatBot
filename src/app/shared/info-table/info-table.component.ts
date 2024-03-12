import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChatResponseService } from '../service/chat-response.service';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-info-table',
  templateUrl: './info-table.component.html',
  styleUrls: ['./info-table.component.scss']
})
export class InfoTableComponent implements OnInit,OnChanges {

  @Input() set tableDetails(data: any) {
    this.tableData = data
  }
  @Input() loading: boolean = false;

  products: any[] = [];
  cols: Column[] = [];
  tableData: any;
  showPaginator: boolean = false;

  constructor( private chatService: ChatResponseService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){
    this.cols = []
    this.products = []
    if(this.tableData.tableDetails) {
      this.products = this.tableData.tableDetails;
    }
    if(this.tableData?.tableTitle && this.tableData.tableTitle.length > 0) {
      this.showPaginator = true
      this.tableData.tableTitle.forEach((value: any) => {
        console.log(value)
        this.cols.push(
          {field: value, header: value}
        )
      });
    }
    
  }

  exportExcel():void {
    this.chatService.downloadFile(this.tableData.chartTitle,'xls');
  }

  exportCSV():void {
    this.chatService.downloadFile(this.tableData.chartTitle,'csv');
  }

}
