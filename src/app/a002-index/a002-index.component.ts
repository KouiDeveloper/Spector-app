
import { Component, OnInit } from '@angular/core';

import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

const now = new Date();

@Component({
  selector: 'app-a002-index',
  templateUrl: './a002-index.component.html',
  styleUrls: ['./a002-index.component.css']
})
export class A002IndexComponent {
  
  model: NgbDateStruct;
  date: {year: number, month: number};

  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }
  ngOnInit() {
   this.selectToday();
  }
}