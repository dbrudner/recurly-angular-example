import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CardElement, ElementsInstance } from '@recurly/recurly-js';

@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild('cardRef') cardRef: ElementRef;
  @ViewChild('formRef', { read: ElementRef }) formRef: ElementRef;
  error: string;
  elements: ElementsInstance;
  card: CardElement;
  constructor(private cd: ChangeDetectorRef) {}
  ngOnInit() {
    window.recurly.configure('my-public-key');
  }
  ngAfterViewInit() {
    this.elements = window.recurly.Elements();
    this.card = this.elements.CardElement({
      style: {
        fontFamily: 'Open Sans',
        fontSize: '1rem',
        fontWeight: 'bold',
        fontColor: '#2c0730',
      },
    });
    this.card.attach(this.cardRef.nativeElement);
    this.card.on('change', this.onChange);
  }
  onChange(e) {
    console.log(e);
  }
  onSubmit() {
    recurly.token(this.elements, this.formRef.nativeElement, (err, token) => {
      if (err) {
        throw err;
      } else {
        console.log(token);
      }
    });
  }
}
