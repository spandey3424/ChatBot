import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auto-resize-textarea',
  templateUrl: './auto-resize-textarea.component.html',
  styleUrls: ['./auto-resize-textarea.component.scss']
})
export class YuTextareaComponent implements OnInit, AfterViewInit {
  @Input('max-height') maxHeight:any = 100;
  @Output('valChange') valChange = new EventEmitter();
  @ViewChild('text') text!:  ElementRef ;
  @ViewChild('text1') text1!:  ElementRef ;
  @Input('value')val = '';

  constructor(elementRef: ElementRef,
    private rd2: Renderer2
  ) { }

  ngOnInit() {

  }
  ngAfterViewInit() {

  }
  onChange() {



    this.reset();
    setTimeout(() => {
      this.valChange.emit(this.val);
      this.reset();
    }, 0)

  }
  reset() {
    this.text1.nativeElement.style.width = (this.text.nativeElement.scrollWidth + 2) + 'px';
    if (this.text1.nativeElement.scrollHeight < this.maxHeight) {
      this.text.nativeElement.style.height = (this.text1.nativeElement.scrollHeight + 2) + 'px'
    }
  }
}