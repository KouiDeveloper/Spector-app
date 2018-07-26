import {
  Component,
  Inject,
  OnInit,
  OnDestroy,
  Input,
  IterableDiffers,
  DoCheck,
  SimpleChanges
} from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Router, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms"; // <<<< import it here
import { WebsocketDataServiceService } from "../websocket-data-service.service";
import { ChatService, Message } from "../chat.service";
import { WebsocketService } from "../websocket.service";

import { ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-a003-report",
  templateUrl: "./a003-report.component.html",
  styleUrls: ["./a003-report.component.css"],
  providers: [WebsocketDataServiceService, ChatService, WebsocketService]
})
export class A003ReportComponent {
  closeResult: string;
  @ViewChild("Alert_update_details") Alert_update_details: ElementRef;
  public now = new Date();
  public _message: Message;
  public _newUser: any = {};
  public _newDevice: any = {};
  public _deviceInfo: any[];
  public _userDetailsStr = "";
  public _selectedStock: any = {};
  public _selectedStockList: any = {};
  public _selectedSubUsers: any;
  public _goodstype: any[] = [];
  public _selectedGoodsType: any = "";
  @Input() _selectedTime: any[] = [{}];
  public _server_event: any[] = [];
  public _client: Message = {
    gui: "",
    username: "",
    logintoken: "",
    logintime: "",
    loginip: "",
    data: {}
  };
  public _otherSource: any = {};
  public _loginUser = { username: "", password: "" };
  public _currentUserdetail: any = {};
  public _otherMessage: any = {};
  public _subs: any = [];
  public _trans: any = [];

  public _currentReport: any;
  public _arrayReport: any[];
  public _arr_stock:any[]=[];
  public _isNew: boolean = false;

  /// WEBSOCKET LAUNCHING
  constructor(
    public modalService: NgbModal,
    public websocketDataServiceService: WebsocketDataServiceService,
    public router: Router,
    private differs: IterableDiffers
  ) {
    this.differ = differs.find([]).create(null);
    this.loadClient();
    // if (this._client.logintoken) {
    //     router.navigate(["/main-menu"]);
    //   }
    this._subs.push(
      this.websocketDataServiceService.clientSource.subscribe(client => {
        this.readClient(client);
      })
    );
    this._subs.push(
      this.websocketDataServiceService.newUserSource.subscribe(client => {
        this._newUser = client;
        this.readNewUser(client);
      })
    );
    // this._subs.push(this.websocketDataServiceService.eventSource.subscribe(events => {
    //   this._server_event = events;
    //   this.readServerEvent(events);
    // }));
    this._subs.push(
      this.websocketDataServiceService.currentUserSource.subscribe(user => {
        this.readCurrentUserDetail(user);
      })
    );

    this._subs.push(
      this.websocketDataServiceService.otherSource.subscribe(msg => {
        this.readOtherMessage(msg);
      })
    );
    this._subs.push(
      this.websocketDataServiceService.currentGoodsType.subscribe(client => {
        this.readGoodsType(client);
      })
    );
    //console.log(this.websocketDataServiceService);
    this._subs.push(
      this.websocketDataServiceService.currentReport.subscribe(msg => {
        this.readReport(msg);
      })
    );
    this._subs.push(this.websocketDataServiceService.currentStock.subscribe(msg=>{
      this.readStock(msg);
    }));

    // this.websocketDataServiceService.heartbeat_interval = setInterval(
    //   this.websocketDataServiceService.heartbeat.bind(
    //     this.websocketDataServiceService
    //   ),
    //   1000 * 60
    // );
  }

  readStock(m: any) {
    console.log("read stock", m);
    //console.log(m);
    if (m !== undefined) {
      if(Array.isArray(m)){
        this._arr_stock = m;
      }
      else{
        for (let index = 0; index < this._arr_stock.length; index++) {
          const element = this._arr_stock[index];
          if(m.productgui===element.productgui){
            this._arr_stock[index]=m;
            this._selectedStock=m;
            this._newQtty=0;
            
            //alert(m.qtty);
          }
        }
      }
    }
  }
  //// END WEBSOCKET LAUNCHING

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  Show_update_details(Alert_update_details, d) {
    //this._selectedDevice=d;
    this.modalService.open(Alert_update_details, { centered: true });
    // alert(content);
  }
  @Input() differ: any;
  ngDoCheck() {
    // //console.log(this._selectedTime[0]);
    var changes = this.differ.diff(this._selectedTime);
    if (changes) {
      //console.log(changes);
      this.getReport();
      this.initStock();
    }
  }

  /// OTHER FUNCTIONS)
  public clearJSONValue(u) {
    for (const key in u) {
      if (u.hasOwnProperty(key)) {
        u[key] = "";
      }
    }
  }

  //// END OTHER FUNCTIONS
  /// INIT FUNCTIONS
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this._newUser = JSON.parse(JSON.stringify(this._client));
    this._newUser.data = {};
    this._newUser.data.user = {};
    //
    this._message = JSON.parse(JSON.stringify(this._client));
    this._currentUserdetail = {};
    this._userDetailsStr = "";
    this._otherMessage = {};
    this.runInit();
  }
  runInit() {
    setTimeout(() => {
      this.getReport();
      this.getGoodsType();
      this.initStock();
    }, 1000);
  }
  ngOnDestroy() {
    //console.log("STOP SERVICE");
  }
  saveClient() {
    // this.websocketDataServiceService.refreshClient();
    this.websocketDataServiceService.setClient(this._client);
  }
  loadClient() {
    sessionStorage.setItem("firstHandShake", "");
    sessionStorage.setItem("firstHeartBeat", "");
    // if (!this._client.gui || this._client.gui === undefined) {
    this._client = this.websocketDataServiceService.getClient();
    //console.log("client loaded");
    // } else {
    // this.saveClient();
    // }
  }
  /// INIT FUNCTIONS

  /// *************RECEIVING  */
  ab2str(arrayBuffer) {
    let binaryString = "";
    const bytes = new Uint8Array(arrayBuffer),
      length = bytes.length;
    for (let i = 0; i < length; i++) {
      binaryString += String.fromCharCode(bytes[i]);
    }
    return binaryString;
  }

  str2ab(str) {
    const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
  readClient(c): any {
    // this._client
    try {
      if (c !== undefined) {
        this._client = c;
        // this.saveClient();
        // //console.log(c);
        switch (this._client.data["command"]) {
          case "heart-beat":
            if (
              this._client.data["message"].toLowerCase().indexOf("error") > -1
            ) {
              //console.log(this._client.data["message"]);
            } else {
              // this._client.data['user'] = u;
              //console.log("heart beat ok");
            }
            break;
          case "ping":
            if (
              this._client.data["message"].toLowerCase().indexOf("error") > -1
            ) {
              //console.log(this._client.data["message"]);
            } else {
              //console.log(this._client.data["message"]);
            }
            break;
          case "get-client":
            if (
              this._client.data["message"].toLowerCase().indexOf("error") > -1
            ) {
              //console.log(this._client.data["message"]);
            } else {
              //console.log("get-client OK");
            }
            break;
          case "shake-hands":
            if (
              this._client.data["message"].toLowerCase().indexOf("error") > -1
            ) {
              // // //console.log(this._client);
              //console.log(this._client.data["message"]);
            } else {
              //console.log("shake hands ok");
              // alert("will you get device ?");
              this.getReport();
              // this.getDevices();
              // alert("get device don't work any more");
            }
            break;
          case "get-transaction":
            if (
              this._client.data["message"].toLowerCase().indexOf("error") > -1
            ) {
              //console.log(this._client.data["message"]);
            } else {
              // // alert('change password OK');
              //console.log("get transaction id ok");
            }
            break;
          case "check-transaction":
            if (
              this._client.data["message"].toLowerCase().indexOf("error") > -1
            ) {
              //console.log(this._client.data["message"]);
            } else {
              // // alert('change password OK');
              //console.log("check transaction id ok");
            }
            break;

          case "register-new-user":
            if (
              this._client.data["message"].toLowerCase().indexOf("error") > -1
            ) {
              //console.log(this._client.data["message"]);
            } else {
              alert("Success to add new user");
            }
            break;
          case "get-sub-users":
            if (
              this._client.data["message"].toLowerCase().indexOf("error") > -1
            ) {
              //console.log(this._client.data["message"]);
            } else {
              //console.log(this._client.data.message);
            }
            break;
          default:
            break;
        }
      } else {
        // alert('data empty');
        //console.log("data is empty");
      }
    } catch (error) {
      //console.log(error);
    }
  }
  readNewUser(n): any {
    // this._newUser;
    if (n !== undefined) {
      this._newUser.data = n.data;
    }
  }
  readCurrentUserDetail(c: any): any {
    // this._currentUserDetail
    if (c !== undefined) {
      this._currentUserdetail = c;
    }
  }
  readOtherMessage(m: any): any {
    // this._message
    if (m !== undefined) {
      this._message = m;
    }
  }

  readReport(m: any) {
    if (m !== undefined) {
      if (!Array.isArray(m)) {
        this._currentReport = m;
      } else {
        this._arrayReport = m;
      }
    }
  }
  readSubUser(m: any) {
    //console.log('read sub user list');
    //console.log(m);
    if (m !== undefined) {
      //this._currentSubUser = m;
    }
  }
  readGoodsType(m: any) {
    console.log("read GoodsType", m);
    console.log(m);
    if (m !== undefined) {
      this._goodstype = m;
    }
  }

  /// END RECEIVING

  //// SENDING
  showNewMessage() {
    this._client.data.message = "changed from show message";
    // this._client.data.transaction = this.createTransaction(); // NEED TO BE DONE BEOFORE SEND MESSAGE
    // this.websocketDataServiceService.refreshClient();
    this.websocketDataServiceService.changeMessage(this._client);
  }
  setOtherMessage() {
    const msg = {
      title: "",
      data: {},
      other: {} // ...
    };
    // msg.data['transaction'] = this.createTransaction(); // NEED TO BE DONE BEOFORE SEND MESSAGE
    this.websocketDataServiceService.setOtherMessage(msg);
  }
  shakeHands() {
    // this._client.data.transaction = this.createTransaction(); // NEED TO BE DONE BEOFORE SEND MESSAGE
    // this.websocketDataServiceService.refreshClient();
    this.websocketDataServiceService.shakeHands();
    this.saveClient();
  }
  ping_test() {
    // this._client.data.transaction = this.createTransaction(); // NEED TO BE DONE BEOFORE SEND MESSAGE
    // this.websocketDataServiceService.refreshClient();
    this._client.data.message += " HERE in app component";
    // //console.log(this._client);
    this.websocketDataServiceService.ping_test();
  }
  /////////////// END SENDING
  /// ICEMAKER ----------------------------------------

  registerNewUser() {
    const u = this._newUser.data.user;
    this.websocketDataServiceService.registerNewUser(u);
  }

  getSubUsers() {
    //console.log('get subusers');
    this.websocketDataServiceService.getSubUsers();
  }
  updateSubUserinfo() {
    let u = this._selectedSubUsers;
    this.websocketDataServiceService.updateSubUserinfo(u);
  }
  resetPasswordSubUser() {
    let u = this._selectedSubUsers;
    this.websocketDataServiceService.resetPasswordSubUser(u);
  }

  getReport(): any {
    let selectedTime: any = {};
    if (!this._selectedTime.length) {
      return;
    }
    selectedTime.day = this._selectedTime[0].day;
    selectedTime.month = this._selectedTime[0].month;
    selectedTime.year = this._selectedTime[0].year;
    this.websocketDataServiceService.getReport(selectedTime);
  }
  getGoodsType() {
    this.websocketDataServiceService.getGoodsType();
  }
  getURL(m) {
    return "../../assets/img/" + m;
  }
  selectGoodsType(g) {
    if(this._selectedGoodsType){
      if(this._selectedGoodsType === g.name){
        this._selectedGoodsType='';
      }
      else{
        this._selectedGoodsType = g.name;
      }
    }else{
      this._selectedGoodsType = g.name;
    }
    
    // alert(this._selectedGoodsType);
  }
  checkSelectedGoodsType(a) {
    return a === this._selectedGoodsType
      ? "selectedclass"
      : "choose-goods-type";
  }

  _selectedProduct = null;
  selectStock(p: any) {
    this._selectedProduct = p;
    this._selectedStock = p;

    //this.getRightCurrency();
    this._isNew = false;
    this._isEdit = true;
  }
  _newQtty=0;
  updateQtty(e){
    this._newQtty=Number.parseInt(e+'');
    if(this._newQtty<0){
      this._newQtty=0;
    }
  }
  _isEdit = false;
  initStock() {
    let d=this._selectedTime[0].day;
    let m=this._selectedTime[0].month;
    let y=this._selectedTime[0].year;
    this.websocketDataServiceService.initStock(y,m,d);
    // alert(JSON.stringify(this._selectedTime[0]));
  }
  importStock(){
    console.log('IMPORT ',this._selectedStock);
    this._selectedStock.qtty=this._newQtty;
    let d=this._selectedTime[0].day;
    let m=this._selectedTime[0].month;
    let y=this._selectedTime[0].year;
    this.websocketDataServiceService.importGoods(this._selectedStock);
  }
  sumtotal(a:Array<any>,b){
    let tt=0;
    for (let index = 0; index < a.length; index++) {
      tt+= a[index]*b;
    }
    return tt;
  }
  getTT(name){
    let tt={qtty:0,ttvalue:0};
      for (let index = 0; index < this._arr_stock.length; index++) {
        const element = this._arr_stock[index];
        
        // console.log(element); 
        if(name===element.type){
          tt.qtty+=element.lastimport.reduce((a, b) => a + b, 0);
          tt.ttvalue+=element.lastimport.reduce((a, b) => a + b, 0)*element.price;
        }
        // console.log(tt.qtty);
      }
      return tt;
  }
  sumTT(){
    let tt={qtty:0,ttvalue:0};
      for (let index = 0; index < this._arr_stock.length; index++) {
        const element = this._arr_stock[index];
          tt.qtty+=element.qtty;
          tt.ttvalue+=element.qtty*element.price;
      }
      return tt;
  }
  sumImport(){
    let tt={qtty:0,ttvalue:0};
      for (let index = 0; index < this._arr_stock.length; index++) {
        const element = this._arr_stock[index];
          tt.qtty+=element.lastimport.reduce((a, b) => a + b, 0);
          tt.ttvalue+=element.lastimport.reduce((a, b) => a + b, 0)*element.price;
      }
      return tt;
  }
  getTTExport(name){
    let tt={qtty:0,ttvalue:0};
      for (let index = 0; index < this._arr_stock.length; index++) {
        const element = this._arr_stock[index];
        
        // console.log(element);
        if(name===element.type){
          tt.qtty+=element.lastexport.reduce((a, b) => a + b, 0);
          tt.ttvalue+=element.lastexport.reduce((a, b) => a + b, 0)*element.price;
        }
        // console.log(tt.qtty);
      }
      return tt;
  }
  sumExport(){
    let tt={qtty:0,ttvalue:0};
      for (let index = 0; index < this._arr_stock.length; index++) {
        const element = this._arr_stock[index];
          tt.qtty+=element.lastexport.reduce((a, b) => a + b, 0);
          tt.ttvalue+=element.lastexport.reduce((a, b) => a + b, 0)*element.price;
      }
      return tt;
  }
      // return tt;edtxt =this._search_text;
    // console.log("");
  }



