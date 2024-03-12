import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import _ from 'lodash';
import { ChatResponseService } from '../../shared/service/chat-response.service';
import { delay, finalize, map } from 'rxjs';

@Component({
  selector: 'app-dialog-panel',
  templateUrl: './dialog-panel.component.html',
  styleUrls: ['./dialog-panel.component.scss']
})
export class DialogPanelComponent implements OnInit {

  chatArray: { type: string; message: string }[] = [];
  userInput: any;
  chatResponse: any;
  loader: Boolean = false;
  lastUserInput: any;

  constructor(private chatService: ChatResponseService) { }

  ngOnInit() {
  }

  onClickSend(){
    if (this.userInput) this.addRecord('user', this.userInput);
    this.lastUserInput = _.cloneDeep(this.userInput);
    setTimeout(() => {
      this.userInput = null;
    }, 0);
    this.loader = true;
    this.chatResponse = {};
    this.chatService.getdocSummary(this.lastUserInput).pipe(
      //delay(3000),
      finalize(() => {
        this.loader = false;
      }),
      // map((res: any) => {
      //   console.log(res)
      //   if(res.Question.toLowerCase().trim() ===
      //   this.lastUserInput.toLowerCase().trim()) {
      //     return res;
      //   }
      // }),
    ).subscribe((data)=> {
      this.chatResponse = data;
      console.log(data)
      // if (!data) {
      //   this.chatResponse = {} as any;
      //   this.chatResponse = `I'm sorry, but I couldn't find any information on that. Could you please provide more details or try rephrasing your question?`;
      // }
      this.addRecord('ai', this.chatResponse);
    },
    (error) => {
      console.error('Error loading JSON data:', error);
    })
  }
  addRecord(type: string, message: string): void {
    this.chatArray.push({ type: type, message: message });
    this.scrollToBottom();
  }

  @ViewChild('messageTextarea') messageTextarea!: ElementRef;
  @ViewChild('dialogviewer') dialogviewer!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  onResized(ev: any) {
    if (ev) this.onKeyEnter();
  }

  onKeyEnter() {
    const textarea: HTMLTextAreaElement = this.messageTextarea?.nativeElement;
    const viewer: HTMLElement = this.dialogviewer?.nativeElement;
    const container: HTMLElement = this.container?.nativeElement;
    const containerScrollHiehgt = container?.scrollHeight;
    const scrollHeight = textarea?.scrollHeight;
    const viewerScrollHeight = viewer?.scrollHeight;
    let newHeight = viewerScrollHeight;
    if (containerScrollHiehgt <= scrollHeight + viewerScrollHeight) {
      newHeight = containerScrollHiehgt - scrollHeight - 24;
    }
    if (newHeight) viewer.style.maxHeight = `${newHeight}px`;
    if(this.chatArray.length === 1) {
      viewer.style.maxHeight = '308px';
    }
  }
  scrollToBottom(): void {
    try {
      const chatBoardElement: HTMLElement = this.dialogviewer.nativeElement;
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

  clearChat(): void {
    this.chatArray = [];
  }

}
