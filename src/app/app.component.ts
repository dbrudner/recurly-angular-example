import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';

import { NgForm } from '@angular/forms';
import { ElementsInstance, CardElement } from '@recurly/recurly-js';

@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit /*, OnDestroy*/ {
  @ViewChild('cardRef') cardRef: ElementRef;
  @ViewChild('form', { read: ElementRef }) form: ElementRef;
  cardHandler = this.onChange.bind(this);
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
    this.card.on('change', console.log);
  }
  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }
  onSubmit(form: NgForm) {
    recurly.token(this.elements, this.form.nativeElement, (err, token) => {
      console.log(token);
    });
  }
}
