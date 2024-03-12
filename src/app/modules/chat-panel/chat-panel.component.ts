import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { ChatResponseService } from '../../shared/service/chat-response.service';
import { delay, finalize, map } from 'rxjs';
import * as XLSX from 'xlsx';
import _ from 'lodash';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss'],
})
export class ChatPanelComponent implements OnInit {
  userInput: any;
  chatResponse: any;
  loader: Boolean = false;
  summaryLoader: Boolean = false;
  additionalInfo: any = {} as any;
  tableDetails: any = {} as any;
  chatArray: { type: string; message: string }[] = [];
  additionalInfoLoader: boolean = false;
  type: string = '';
  lastUserInput: any;
  distinctLegendValues: String[] = [];
  distinctXaxisDataValues: String[] = [];
  summaryInfo: any = {} as any;
  showSummary: boolean = false;

  constructor(
    private chatService: ChatResponseService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.showSummary = false;
  }

  onClickSend() {
    if (this.userInput) this.addRecord('user', this.userInput);
    this.lastUserInput = _.cloneDeep(this.userInput);
    setTimeout(() => {
      this.userInput = null;
    }, 0);
    this.loader = true;
    this.showSummary = false;
    this.chatResponse = {};
    this.chatService
      .getJsonData(this.lastUserInput)
      .pipe(
        //delay(3000),
        finalize(() => {
          this.loader = false;
        }),
        // map((res: any) => {
        //   return res.filter(
        //     (rs: any) =>
        //       rs.question.toLowerCase().trim() ===
        //       this.lastUserInput.toLowerCase().trim()
        //   )[0];
        // }),
      )
      .subscribe(
        (data) => {
          this.chatResponse = data;
          if (!data) {
            this.chatResponse = {} as any;
            this.chatResponse.Summary = `I'm sorry, but I couldn't find any information on that. Could you please provide more details or try rephrasing your question?`;
          }
          this.addRecord('ai', this.chatResponse.Summary);

          this.type = this.chatResponse.Table
            ? 'table'
            : this.chatResponse.Chart
            ? 'chart'
            : '';
          if (this.chatResponse.DataPath) this.getChartDetails();
        },
        (error) => {
          console.error('Error loading JSON data:', error);
        }
      );
  }
  arrayToBuffer(array: any[][], sheetName: string = 'Sheet1'): ArrayBuffer {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(array);
    const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ['data'] };
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    // Create an array buffer
    const buffer: ArrayBuffer = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });

    return buffer;
  }

  getChartDetails(): void {
    this.additionalInfoLoader = true;
    this.chatService
      .getExcelData(this.chatResponse.DataPath)
      .pipe(
        map((res) => {
          return this.arrayToBuffer(res.data);
        }),
        finalize(() => {
          this.additionalInfoLoader = false;
        })
      )
      .subscribe((data: any) => {
        // data  = [{'asset id':'233','inspection description':'ddd'}];
        //  data = this.arrayToBuffer(data);
        const workbook = XLSX.read(data, { type: 'array' });
        this.chatService.setExcelData(data);
        // const sheetName = workbook.SheetNames[0];
        // const sheet = workbook.Sheets[sheetName];

        // const dataSource = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        // const displayedColumns = dataSource[0] as any;
        // const tableTitle = displayedColumns;
        // dataSource.shift(); // Remove header row

        const binarystr: string = data;
        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

        /* selected the first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        const res: any = XLSX.utils.sheet_to_json(ws);
        let tableTitle: any = '';
        if (res.length > 0) {
          tableTitle = Object.keys(res[0]);

          this.preparedPlotData(res);
        }

        // console.log(plotDetails);
        let obj = {} as any;
        obj.xAxisTitle = this.chatResponse['X-axis_title'].trim();
        obj.yAxisTitle = this.chatResponse['Y-axis_title'].trim();
        obj.chartTitle = this.chatResponse.ChartTitle;
        obj.chartType = this.chatResponse.ChartType;
        obj.xAxisData = this.chatResponse['X-axis_column'].trim();
        if(this.chatResponse['Y-axis_column']?.indexOf(',')>-1) {
          obj.yAxisColumn = this.chatResponse['Y-axis_column']?.split(',')[1].trim();
        }
        else {
          obj.yAxisColumn = this.chatResponse['Y-axis_column']?.trim();
        }
        obj.tableDetails = res;
        obj.tableTitle = tableTitle;
        obj.legend = this.chatResponse['Legend'].trim();
        this.additionalInfo = Object.assign({}, obj);
        //   onPageChange() {
        //     this.pageStartCount = this.currentPage * this.recordsPerPage;
        //     this.pageEndCount = this.pageStartCount + this.recordsPerPage;
        //     this.tableRecords = this.tableData.slice(
        //       this.pageStartCount,
        //       this.pageEndCount
        //     );
        //   }
        // this.tableRecords = this.tableData.slice(
        //         this.pageStartCount,
        //         this.pageEndCount
        //       );
        //       this.totalPageCount = this.tableData.length / this.recordsPerPage;
      });
  }

  addRecord(type: string, message: string): void {
    this.chatArray.push({ type: type, message: message });
    this.scrollToBottom();
  }
  @ViewChild('messageTextarea') messageTextarea!: ElementRef;
  @ViewChild('viewer') viewer!: ElementRef;
  @ViewChild('panel') panel!: ElementRef;
  @ViewChild('container') container!: ElementRef;
  onResized(ev: any) {
    if (ev) this.onKeyEnter();
  }
  onKeyEnter() {
    const textarea: HTMLTextAreaElement = this.messageTextarea?.nativeElement;
    const viewer: HTMLElement = this.viewer?.nativeElement;
    const container: HTMLElement = this.container?.nativeElement;
    const containerScrollHiehgt = container?.scrollHeight;
    const scrollHeight = textarea?.scrollHeight;
    const viewerScrollHeight = viewer?.scrollHeight;
    let newHeight = viewerScrollHeight;
    if (containerScrollHiehgt <= scrollHeight + viewerScrollHeight) {
      newHeight = containerScrollHiehgt - scrollHeight - 24;
    }
    if (newHeight) viewer.style.maxHeight = `${newHeight}px`;
  }
  scrollToBottom(): void {
    try {
      const chatBoardElement: HTMLElement = this.viewer.nativeElement;
      setTimeout(() => {
        chatBoardElement.scrollTo({
          top: chatBoardElement.scrollHeight,
          behavior: 'smooth',
        });
      }, 0);
    } catch (err) {
      console.error(err);
    }
  }
  preparedPlotData(arr: any): void {
    this.distinctLegendValues = [];
    this.distinctXaxisDataValues = [];
    const makeCode = this.chatResponse['X-axis_column'];
    const legend = this.chatResponse['Legend'];
    if (legend)
      this.distinctLegendValues = this.findDistinctLegend(arr, legend);
    this.distinctXaxisDataValues = this.findDistinctLegend(arr, makeCode);
  }

  viewSummary() {
    this.showSummary = false;
    this.summaryLoader = true;
    this.summaryInfo = {};
    this.chatService
      .getSummary()
      .pipe(
        //delay(3000),
        finalize(() => {
          this.summaryLoader = false;
        })
      )
      .subscribe((data) => {
        if (Object.keys(data).length === 0) {
          this.messageService.add({
            key: 'bc',
            severity: 'warn',
            summary: 'Attention!',
            detail: 'There is no summary available.',
          });
        } else {
          this.summaryInfo = data;
          this.showSummary = true;
          try {
            const chatBoardElement: HTMLElement = this.panel.nativeElement;
            setTimeout(() => {
              chatBoardElement.scrollTo({
                top: chatBoardElement.scrollHeight,
                behavior: 'smooth',
              });
            }, 0);
          } catch (err) {
            console.error(err);
          }
        }
        console.log(this.summaryInfo);
      },
      (error) => {
        this.messageService.add({
          key: 'bc',
          severity: 'warn',
          summary: 'Attention!',
          detail: 'There is no summary available.',
        });
        console.log(error)
      }
      );
  }
  clearChat(): void {
    this.chatArray = [];
    this.cdr.detectChanges();
    this.additionalInfo = {};
    this.summaryInfo = {};
    this.type = '';
    this.showSummary = false;
  }
  findDistinctLegend(arr: any, legend: any): String[] {
    const distinctLegend: String[] = [
      ...new Set(arr.map((item: any) => item[legend])),
    ] as any;
    return distinctLegend.sort((a: any, b: any) => {
      return a - b;
    });
  }
}
