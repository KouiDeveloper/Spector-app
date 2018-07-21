
import { Component, OnInit,Inject, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

const now = new Date();

@Component({
  selector: 'app-a002-index',
  templateUrl: './a002-index.component.html',
  styleUrls: ['./a002-index.component.css']
})
export class A002IndexComponent {
  

  @Output() sendTime = new EventEmitter<any>();

  
  model: NgbDateStruct;
  date: {year: number, month: number};
  arrModel=[];
  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  selectTime(){
    this.arrModel.length=0;

    this.arrModel.push(this.model);
    console.log(this.arrModel);
    this.sendTime.emit(this.arrModel);
    sessionStorage.setItem('selectedTime',JSON.stringify(this.arrModel));
  }
  ngOnInit() {
   this.selectToday();
   this.selectTime();
  }
}