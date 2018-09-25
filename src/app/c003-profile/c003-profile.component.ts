import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-c003-profile',
  templateUrl: './c003-profile.component.html',
  styleUrls: ['./c003-profile.component.css']
})
export class C003ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.title = "ຂໍ້ມູນສ່ວນຕົວ"
  }

}
