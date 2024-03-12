import { Component, Input, OnInit } from '@angular/core';
import { ChatResponseService } from '../../shared/service/chat-response.service';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.scss'],
})
export class SummaryReportComponent implements OnInit {
  summaryData: any;
  imageDetails: { imageTitle: string; fileName: string }[] = [];
  imagesArray: any;
  viewSimilarImgFlag: boolean = false;

  constructor(private chatService: ChatResponseService , private messageService: MessageService) {}

  @Input() set summaryDetails(data: any) {
    this.summaryData = data;
  }
  ngOnInit() {
    this.viewSimilarImgFlag = false;
  }

  loadImages() {
    this.viewSimilarImgFlag = false;
    this.imagesArray = {};
    this.chatService.getBrokenImages().pipe(
      //delay(3000),
      finalize(() => {
        this.viewSimilarImgFlag = true;
      })
    ).subscribe((data: any) => {
      if(!data) {
        this.messageService.add({ key: 'bc', severity: 'warn', summary: 'Attention!', detail: 'There is no images available.' });
      }
      else {
        this.imagesArray = data;
      }
    })
  }
}
