import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
// import { Observable } from 'rxjs/Rx';
import { WebsocketService } from "./websocket.service";
import { ChatService, Message } from "./chat.service";
import { v4 as uuid } from "uuid";
import { Moment } from "moment";
import * as moment from "moment-timezone";
// import * as PouchDB from 'pouchdb';
// import { PouchDBService } from './pouchdb.service';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Injectable()
export class WebsocketDataServiceService implements OnInit {
  
  private _timerOutArray: any[] = [];
  private _currentDay = 0;
  private _currentMonth = 0;
  private _currentYear = 0;
  private _title = "Websocket test";
  private _selectedMonth;
  private _selectedYear;
  private _url: string;
  private _message: any;
  private _newUser: any;
  private _loginUser = { usrname: "", password: "" };
  private _currentUserdetail: any;
  private _server_event: any = [];
  private _moment: Moment;
  // private _pouch: PouchDB.Database;
  private _client: Message = {
    gui: "",
    username: "",
    logintoken: "",
    logintime: "",
    loginip: "",
    data: {}
  };

  /// ICE-MAKER
  private _stockOwner: any;
  private _product: any;
  private _stockItem: any;
  private _stock: any;
  private _report: any;
  public _units: any;
  public _currency: any[]=[];
  public _goodstype: any[]=[];
  _productList: any={};
  // public heartbeat_interval: number;

  private _otherMessage: any;

  public clientSource = new BehaviorSubject<Message>(this._client);
  public newUserSource = new BehaviorSubject<Message>(this._newUser);
  public currentUserSource = new BehaviorSubject<any>(this._currentUserdetail);
  public eventSource = new BehaviorSubject<any>(this._server_event);
  public daySource = new BehaviorSubject<any>(this._currentDay);
  public monthSource = new BehaviorSubject<any>(this._selectedMonth);
  public yearSource = new BehaviorSubject<any>(this._selectedYear);
  public otherSource = new BehaviorSubject<any>(this._otherMessage);
  // private timeOut_runner: NodeJS.Timer;
  public currentStockOwner = new BehaviorSubject<any>(this._stockOwner);
  public currentProduct = new BehaviorSubject<any>(this._product);
  public currentProductList = new BehaviorSubject<any>(this._productList);
  public currentStockItem = new BehaviorSubject<any>(this._stockItem);
  public currentStock = new BehaviorSubject<any>(this._stock);
  public currentReport = new BehaviorSubject<any>(this._report);
  public currentUnits = new BehaviorSubject<any>(this._units);
  public currentCurrency = new BehaviorSubject<any>(this._currency);
  public currentGoodsType = new BehaviorSubject<any>(this._goodstype);

  
  // private currentMessage = this.clientSource.asObservable();
  // private serverEvent = this.eventSource.asObservable();
  // timeOut_runner = setTimeout(() => {
  //   this.shakeHands();
  // }, 1000 * 1);
  public refreshUnits(): any {
    this.currentUnits.next(this._units);
  }
  public refreshStockOwner() {
    this.currentStockOwner.next(this._stockOwner);
  }
  public refreshProduct() {
    this.currentProduct.next(this._product);
  }
  public refreshProductList() {
    this.currentProductList.next(this._productList);
  }
  public refreshStockItem() {
    this.currentStockItem.next(this._stockItem);
  }
  public refreshStock() {
    this.currentStock.next(this._stock);
  }
  public refreshReport() {
    this.currentReport.next(this._report);
  }
  public refreshCurrency() {
    this.currentCurrency.next(this._currency);
    // alert(this._currency);
  }
  public refreshGoodsType(){
    this.currentGoodsType.next(this._goodstype);
    //alert(this._goodstype);
   // console.log("Read-good-type",this._goodstype);
  }


  public refreshNewUserMessage() {
    this.newUserSource.next(this._newUser);
  }
  public refreshUserDetails() {
    this.currentUserSource.next(this._currentUserdetail);
  }
  public refreshOtherMessage() {
    this.otherSource.next(this._otherMessage);
  }
  public refreshClient() {
    this.clientSource.next(this._client);
  }
  public refreshServerEvent() {
    this.eventSource.next(this._server_event);
  }
  public refreshDay() {
    this.daySource.next(this._currentDay);
  }
  public refreshMonth() {
    this.monthSource.next(this._currentMonth);
  }
  public refreshYear() {
    this.yearSource.next(this._currentYear);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    // console.log('init');
    if (!this._client.data["user"] || this._client.data["user"] === undefined) {
      this._client.data["user"] = {};
    }
    this._message = JSON.parse(JSON.stringify(this._client));
    this._selectedMonth = new Date().getMonth() + 1;
    this._selectedYear = new Date().getFullYear();
  }
  constructor(
    private chatService: ChatService,
    private sanitizer: DomSanitizer
  ) {
    // this._pouch = new PouchDB('_client');
    this._timerOutArray = [];
    this.setCancelSending();
    chatService.messages.subscribe(msg => {
      const d = msg;
      // // alert(d);
      try {
        if (d !== undefined) {
          if (d["command"] !== undefined) {
            console.log("changed from server");
            // console.log(d);
            this._server_event.push(d);
            this.refreshServerEvent();
            // console.log(d);
            switch (d["command"]) {
              case "notification-changed":
                console.log(d);
                if (d["client"]["data"]["command"] === "send-sms") {
                  console.log(d["client"].data.message);
                }
                if (d["client"]["data"]["command"] === "received-sms") {
                  console.log(d["client"].data.message);
                  if (d["client"]["data"]["sms"] !== undefined) {
                    console.log("SMS");
                    console.log(d["client"]["data"]["res"].resultDesc);
                    console.log(d["client"]["data"]["res"].msisdn);
                  }
                }
                if (d["client"]["data"]["command"] === "send-topup") {
                  console.log(d["client"].data.message);
                }
                if (d["client"]["data"]["command"] === "received-topup") {
                  console.log(d["client"].data.message);
                  if (d["client"]["data"]["topup"] !== undefined) {
                    console.log("topup");
                    console.log(d["client"]["data"]["res"].resultDesc);
                    console.log(d["client"]["data"]["res"].msisdn);
                  }
                }
                if (d["client"]["data"]["command"] === "send-check-balance") {
                  console.log(d["client"].data.message);
                }
                if (
                  d["client"]["data"]["command"] === "received-check-balance"
                ) {
                  console.log(d["client"].data.message);
                  if (d["client"]["data"]["checkbalance"] !== undefined) {
                    console.log("topup");
                    console.log(d["client"]["data"]["res"].resultDesc);
                    console.log(d["client"]["data"]["res"].msisdn);
                  }
                }
                break;
              case "error-changed":
                console.log(d);
                break;
              case "msg-changed":
                console.log(d["msg"]);
                break;
              case "login-changed":
                console.log("login-changed");
                this._client = d["client"];
                this.refreshClient();
                break;
              case "message-changed":
                // console.log(d['client']['data']['message']);
                break;
              case "forgot-changed":
                console.log(d);
                break;
              case "phone-changed":
                console.log(d);
                break;
              case "secret-changed":
                console.log(d);
                break;
              case "online-changed":
                console.log(d);
                break;
              case "msg-changed":
                console.log(d);
                break;

              default:
                break;
            }
            // // console.log(msg);
          } else {
            this._client = msg;
            // this.setClient(this._client);
            // this.refreshClient();
            console.log("return from server client");
            console.log(this._client);
            switch (this._client.data["command"]) {
              // case 'heart-beat':
              //   if (this._client.data['message'].toLowerCase().indexOf('error') > -1) {
              //     console.log(this._client.data['message']);
              //   } else {
              //     // this._client.data['user'] = u;
              //     console.log(this._client.data['message']);
              //     // this.setClient(this._client);
              //   }
              //   break;
              case "ping":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  console.log(this._client.data["message"]);
                } else {
                  console.log(this._client.data["message"]);
                }
                break;
              case "login":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  // console.log('LOGIN OK');
                  this.setClient(this._client);
                  this.refreshClient();
                }
                break;
              case "get-client":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  // console.log('get-client OK');
                  this.setClient(this._client);
                  this.refreshClient();
                }
                break;
              case "shake-hands":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client);
                  console.log(this._client.data["message"]);
                } else {
                  console.log("shake hands ok");
                  this.setClient(this._client);
                  this.refreshClient();
                }
                break;
              case "logout":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  // console.log('LOGOUT OK');
                  this.setClient(this._client);
                  this.refreshClient();
                }
                break;
              case "get-profile":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  // // console.log(this._client.data['user']);
                  const u = JSON.parse(JSON.stringify(msg.data["user"]));
                  this._currentUserdetail = u;
                  // console.log('refesh user details');
                  this.refreshUserDetails();
                }
                break;
              case "change-password":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  // // alert('change password OK');
                }
                break;
              case "get-transaction":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  // // alert('change password OK');
                }
                break;
              case "check-transaction":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  // // alert('change password OK');
                }
                break;
              case "check-forgot":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  // // alert(this._client.data['message']);
                }
                break;
              case "reset-forgot":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  // // alert(this._client.data['message']);
                }
                break;
              case "submit-forgot":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  // // alert(this._client.data['message']);
                  this._currentUserdetail = this._client.data["user"];
                  this.refreshUserDetails();
                }
                break;
              case "get-user-gui":
                // console.log('here get user gui ');
                // // console.log(this._client);
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  // // alert(this._client.data['user'].gui);
                }
                break;
              case "check-phonenumber":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  // // alert(this._client.data['user'].gui);
                  this._newUser.data = this._client.data;
                  this.refreshNewUserMessage();
                }
                break;
              case "check-username":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  this._newUser.data = this._client.data;
                  this.refreshNewUserMessage();
                }
                break;
              case "check-secret":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  this._newUser.data = this._client.data;
                  this.refreshNewUserMessage();
                }
                break;
              case "get-secret":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  this._newUser.data = this._client.data;
                  this.refreshNewUserMessage();
                }
                break;
              case "register":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  this._newUser.data = this._client.data;
                  this.refreshNewUserMessage();
                }
                break;
              case "send-confirm-phone-sms":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  this._currentUserdetail = this._client.data["user"];
                  this.refreshUserDetails();
                }
                break;
              case "check-confirm-phone-sms":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  this._currentUserdetail = this._client.data["user"];
                  this.refreshUserDetails();
                }
                break;
              case "update-confirm-phone-sms":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  console.log(this._client.data["message"]);
                }
                break;

              case "update-sub-userinfo":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  console.log(this._client.data["message"]);
                  this.refreshClient();
                }
                break;
              case "reset-password-sub-user":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  console.log(this._client.data["message"]);
                  // this._client.data.user = this._client.data.user;
                  this.refreshClient();
                  // this.refreshSubUser();
                }
                break;
                case "get-prod-unit":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  console.log(this._client.data["message"]);
                  this._units = this._client.data.produnit;
                  this.refreshUnits();
                }
                break;
                case "get-currency":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  console.log(this._client.data["message"]);
                  console.log(this._client.data);
                  this._currency = this._client.data.currency;
                  this.refreshCurrency();
                }
                break;
              case "import-goods":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  console.log(this._client.data["message"]);
                  this._stock = this._client.data.stock;
                  this.refreshStock();
                }
                break;

              case "export-goods":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  console.log(this._client.data["message"]);
                  this._stock = this._client.data.stock;
                  this.refreshStock();
                }
                break;

              case "add-obsoleted-goods":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  console.log(this._client.data["message"]);
                  this._product = this._client.data.product;
                  this.refreshProduct();
                }
                break;
              case "add-goods":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  console.log(this._client.data["message"]);
                  this._product = this._client.data.product;
                  this.refreshProduct();
                }
                break;

              case "get-report-time":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  console.log(this._client.data["message"]);
                  this._report = this._client.data.report;
                  this.refreshReport();
                }
                break;
                case "get-product-list":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  console.log(this._client.data["message"]);
                  this._productList = this._client.data.productlist;
                  this.refreshProductList();
                }
                break;
                case "get-goods-type":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  console.log(this._client.data["message"]);
                  this._goodstype = this._client.data.goodstype;
                  this.refreshGoodsType();
                }
                break;
                case "init-stock":
                if (
                  this._client.data["message"].toLowerCase().indexOf("error") >
                  -1
                ) {
                  // console.log(this._client.data['message']);
                } else {
                  console.log(this._client.data["message"]);
                  this._stock = this._client.data.stock;
                  this.refreshStock();
                }
                break;

              default:
                break;
            }

            // console.log(this.heartbeat_interval);
            // console.log(this._client);
            // if (evt.data != '.') $('#output').append('<p>'+evt.data+'</p>');
          }
        } else {
          // alert('data empty');
        }
        // // console.log('current client');
      } catch (error) {
        console.log('data ',this._client.data);
        console.log(error);
        sessionStorage.clear();
      }
      this._client.data.command = "";
      this._client.data.message = "";
    });
    console.log("call constructor");
    setTimeout(() => {
      this.shakeHands();
    }, 1000 * 1);
  }
  changeMessage(message: Message) {
    // console.log(message.data.message);
    this.clientSource.next(message);
  }
  setOtherMessage(msg: any) {
    this.otherSource.next(msg);
  }
  sendMsg() {
    // this._message.data['command'] = 'ping';
    // console.log(JSON.stringify(this._message));
    // console.log('new message from client to websocket: ', JSON.stringify(this._message.data['command']));
    if (
      this._message["gui"] ||
      this._message.data["command"] === "shake-hands" ||
      this._message.data["command"] === "ping"
    ) {
      this.chatService.messages.next(this._message);
    }
  }
  getClient(): Message {
    const c = JSON.parse(sessionStorage.getItem("client"));
    if (c) {
      this._client = c;
    }
    this.refreshClient();
    return this._client;
  }
  setClient(c): void {
    if (c) {
      this._client = c;
    }
    sessionStorage.setItem("client", JSON.stringify(this._client));
  }
  ping_test() {
    // this._client.data = {};
    // this._client.data['user'] = {};
    // console.log('test ping');
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data["user"] = {};
    this._message.data["command"] = "ping";
    this._message.data.message =
      "ຍັງຈັບສັນຍານ GPS ບໍ່ໄດ້ ເລີຍບໍ່ທັນ ONLINE ແຕ່ໂທໄດ້, ຕັ້ງຄ່າໄດ້ແລ້ວ";
    this._message.data.transaction = this.createTransaction();
    // alert('PING');
    this.sendMsg();
  }
  get_user_gui() {
    this._message = JSON.parse(JSON.stringify(this._client));
    // if (this._message.logintoken) {
    this._message.data = {};
    this._message.data["user"] = {};
    this._message.data["command"] = "get-user-gui";
    this._message.data.transaction = this.createTransaction();
    this.sendMsg();
    // } else { return // alert('login first'); }
  }
  stopService(hb) {
    clearInterval(hb);
    // delete this.heartbeat_interval;
  }

  // heartbeat() {
  //   this.getClient();
  //   if (!this._client.gui) {
  //     console.log('ERROR no shake hands');
  //     return;
  //   }
  //   const firstHeartBeat = sessionStorage.getItem('firstHeartBeat');
  //   // if (this.heartbeat_interval === undefined) {
  //   //   return;
  //   // }
  //   // console.log('first heart beat' + firstHeartBeat);
  //   if (firstHeartBeat !== this.heartbeat_interval + '' && firstHeartBeat) {
  //     this.stopService(this.heartbeat_interval);
  //     return;
  //   }
  //   // console.log('heartbeat ' + this.heartbeat_interval);
  //   sessionStorage.setItem('firstHeartBeat', this.heartbeat_interval + '');
  //   // // alert(sessionStorage.getItem('firstThread') + ' heartbeat');
  //   this._message = JSON.parse(JSON.stringify(this._client));
  //   this._message.data = {};
  //   this._message.data['user'] = {};
  //   this._message.data['command'] = 'heart-beat';
  //   this._message.data['command2'] = 'interval ' + this.heartbeat_interval;
  //   this.sendMsg();
  // }

  shakeHands() {
    if (!this._client.gui || this._client.gui === undefined) {
      this.getClient();
    }
    const firstHandShake = sessionStorage.getItem("firstHandShake");
    // // alert(sessionStorage.getItem('firstThread') + ' heartbeat');
    if (firstHandShake) {
      // this.stopService();
      return;
    }
    sessionStorage.setItem("firstHandShake", "1");
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data["command"] = "shake-hands";
    this._message.data.transaction = this.createTransaction();
    // console.log('before shakehands' + JSON.stringify(this._message));
    // this.sendMsg();
    if (!this._client.gui || this._client.gui === undefined) {
      this._message = JSON.parse(JSON.stringify(this._client));
      this._message.data["command"] = "shake-hands";
      this._message.data.transaction = this.createTransaction();
      console.log("before shakehands" + JSON.stringify(this._message));
      this.sendMsg();
    }
    // // alert('shake handds');
  }

  login(loginuser) {
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data["command"] = "login";
    this._message.data.user = loginuser;
    // alert(JSON.stringify(this._message));
    this._message.data.transaction = this.createTransaction();
    this.sendMsg();
  }

  logout() {
    this._message = JSON.parse(JSON.stringify(this._client));
    // if (this._message.logintoken) {
    this._message.data["user"] = {};
    this._message.data["command"] = "logout";
    this._message.data.transaction = this.createTransaction();
    this.sendMsg();
    // } else { return // alert('login first'); }
  }

  getUserDetails(data) {
    this._message = JSON.parse(JSON.stringify(this._client));
    // if (this._message.logintoken) {
    this._message.data = data;
    this._message.data["user"] = {};
    this._message.data["command"] = "get-profile";
    console.log(this._message);
    this._message.data.transaction = this.createTransaction();
    this.sendMsg();
    // } else { return // alert('login first'); }
  }

  updateUserDetails(updateUserDetails) {
    this._message = JSON.parse(JSON.stringify(this._client));
    // if (this._message.logintoken) {
    this._message.data = {};
    this._message.data["user"] = updateUserDetails;
    this._message.data["command"] = "edit-profile";
    this._message.data.transaction = this.createTransaction();
    this.sendMsg();
    // } else { return // alert('login first'); }
  }

  changePassword(u) {
    // this._client.data['user'] = {};
    // this.refreshClient();
    this._message = JSON.parse(JSON.stringify(this._client));
    // // alert('before change==> ' + JSON.stringify(u));
    // if (this._message.logintoken) {
    this._message.data["command"] = "change-password";
    this._message.data["user"] = u;
    this._message.data["user"].username = this._message.username;
    this._message.data.transaction = this.createTransaction();
    this.sendMsg();
    // } else { return // alert('login first'); }
  }

  register(newuser) {
    this._message = JSON.parse(JSON.stringify(this._client));
    // // console.log('before sending register');
    this._message.data = {};
    this._message.data = newuser.data;
    this._message.data["command"] = "register";
    this._message.data.transaction = this.createTransaction();
    this.sendMsg();
  }

  checkUsername(newuser) {
    this._newUser = newuser;
    // this._client.data['command'] = 'check-username';
    // this._client.data['user'].username = $("#username").val();
    if (this._newUser.data["user"] !== undefined) {
      this._newUser.data["command"] = "check-username";
      // // alert(JSON.stringify(this._client));
      this._message = JSON.parse(JSON.stringify(this._client));
      this._message.data = this._newUser.data;
      this._message.data.transaction = this.createTransaction();
      this.sendMsg();
    } else {
      return "User is undefined";
    }
  }

  checkPhoneNumber(newuser) {
    this._newUser = newuser;
    // this._client.data['command'] = 'check-username';
    // this._client.data['user'].username = $("#username").val();
    if (this._newUser.data["user"] !== undefined) {
      this._newUser.data["command"] = "check-phonenumber";
      // // alert(JSON.stringify(this._client));
      this._message = JSON.parse(JSON.stringify(this._client));
      this._message.data = this._newUser.data;
      this._message.data.transaction = this.createTransaction();
      this.sendMsg();
    } else {
      return "User is undefined";
    }
  }

  getSecret(newuser) {
    this._newUser = newuser;
    if (this._newUser.data["user"] !== undefined) {
      const phonesize = this._newUser.data.user.phonenumber.length;
      const LTC = this._newUser.data.user.phonenumber.indexOf("205");
      const UNI = this._newUser.data.user.phonenumber.indexOf("209");
      if (phonesize < 10 || phonesize > 10) {
        return "phone must start with 205 or 209 and 10 digit in total";
      }
      if (LTC < 0 && UNI < 0) {
        return "we support only LAOTEL and UNITEL number only";
      }
      this._newUser.data["command"] = "get-secret";
      // this._client.data = this._newUser.data;
      // // alert(JSON.stringify(this._newUser));
      this._message = JSON.parse(JSON.stringify(this._client));
      this._message.data = this._newUser.data;
      this._message.data.transaction = this.createTransaction();
      this.sendMsg();
    } else {
      return "User is undefined";
    }
  }
  checkSecret(newuser) {
    this._newUser = newuser;
    if (this._newUser.data["user"] !== undefined) {
      this._newUser.data["command"] = "check-secret";
      // // alert(JSON.stringify(this._client));
      this._message = JSON.parse(JSON.stringify(this._client));
      this._message.data = this._newUser.data;
      this._message.data.transaction = this.createTransaction();
      this.sendMsg();
    } else {
      return "User is undefined";
    }
  }

  send_confirm_phone_sms(user) {
    const phonesize = user.phonenumber.length;
    // console.log(user.phonenumber.indexOf('205'));
    const LTC = user.phonenumber.indexOf("205");
    const UNI = user.phonenumber.indexOf("209");
    if (phonesize < 10 || phonesize > 10) {
      return "phone must start with 205 or 209 and 10 digit in total";
    }
    if (LTC < 0 && UNI < 0) {
      return "we support only LAOTEL and UNITEL number only";
    }
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data["command"] = "send-confirm-phone-sms";
    this._message.data["user"] = user;
    this._message.data.transaction = this.createTransaction();
    this.sendMsg();
  }

  check_confirm_phone_sms(data) {
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data = data;
    this._message.data["command"] = "check-confirm-phone-sms";
    // this._client.data['user'].phonenumber=phone;
    this._message.data.transaction = this.createTransaction();
    this.sendMsg();
  }
  update_confirm_phone(data) {
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data = data;
    this._message.data["command"] = "update-confirm-phone-sms";
    // this._client.data['user'].phonenumber=phone;
    this._message.data.transaction = this.createTransaction();
    this.sendMsg();
  }

  resetPassword(cu) {
    this._message = JSON.parse(JSON.stringify(this._client));
    cu.data["command"] = "reset-forgot";
    this._message.data = cu.data;
    this._message.data.transaction = this.createTransaction();
    this.sendMsg();
  }
  checkForgot(cu) {
    this._message = JSON.parse(JSON.stringify(this._client));
    cu.data["command"] = "check-forgot";
    this._message.data = cu.data;
    this._message.data.transaction = this.createTransaction();
    this.sendMsg();
  }
  getForgotKeys(cu) {
    this._message = JSON.parse(JSON.stringify(this._client));
    cu.data["command"] = "submit-forgot";
    const phone = cu.data["user"].phonenumber;
    const phonesize = phone.length;
    // console.log(phone.indexOf('205'));
    const LTC = phone.indexOf("205");
    const UNI = phone.indexOf("209");
    if (phonesize < 10 || phonesize > 10) {
      return "phone must start with 205 or 209 and 10 digit in total";
    }
    if (LTC < 0 && UNI < 0) {
      return "we support only LAOTEL and UNITEL number only";
    }
    cu.data["command"] = "submit-forgot";
    this._message.data = cu.data;
    this._message.data.transaction = this.createTransaction();
    this.sendMsg();
  }
  getTransaction(data) {
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data = data;
    this._message.data.command = "get-transaction";
    this.sendMsg();
  }
  checkTransaction(data) {
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data = data;
    this._message.data.transaction = this.createTransaction();
    this._message.data.command = "check-transaction";
    this.sendMsg();
  }

  createTransaction() {
    return { transactionid: uuid(), transactiontime: new Date() };
  }
  convertTZ(fromTZ) {
    // let m= moment().;
    // moment.tz('Asia/Vientiane').format();
    // return this._moment.tz(fromTZ, 'Asia/Vientiane').format();
  }
  binary2imageurl(bin) {
    const l = bin.length;
    const urlCreator = window.URL;
    const array = new Uint8Array(l);
    for (let i = 0; i < l; i++) {
      array[i] = bin.charCodeAt(i);
    }
    const blob = new Blob([array], { type: "image/jpeg" });
    return this.sanitizer.bypassSecurityTrustUrl(
      urlCreator.createObjectURL(blob)
    );
  }
  createSafeURL(url) {
    const urlCreator = window.URL;
    // console.log(url);
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  file2imageurl(f: File) {
    const urlCreator = window.URL;
    // const blob = new Blob([ab]);
    return this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(f));
  }
  arraybuffer2imageurl(ab: ArrayBuffer, type: string) {
    const urlCreator = window.URL;
    // const blob = new Blob([ab]);
    const file = new Blob([ab], {
      type: type
    });
    console.log(file);
    return this.sanitizer.bypassSecurityTrustUrl(
      urlCreator.createObjectURL(file)
    );
  }
  upload(data) {
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data = data;
    this._message.data.transaction = this.createTransaction();
    this._message.data.command = "upload";
    this.sendMsg();
  }
  getUpLoad(data) {
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data = {};
    this._message.data.transaction = this.createTransaction();
    this._message.data.command = "get-upload";
    this._message.data.user = data;
    this.sendMsg();
  }

  getSubUsers() {
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data = {};
    this._message.data.transaction = this.createTransaction();
    this._message.data.command = "get-sub-users";
    this.sendMsg();
  }
  resetPasswordSubUser(u) {
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data = {};
    this._message.data.user = u;
    this._message.data.transaction = this.createTransaction();
    this._message.data.command = "reset-password-sub-user";
    this.sendMsg();
  }
  updateSubUserinfo(u) {
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data = {};
    this._message.data.user = u;
    this._message.data.transaction = this.createTransaction();
    this._message.data.command = "update-sub-userinfo";
    this.sendMsg();
  }

  registerNewUser(u) {
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data = {};
    this._message.data.transaction = this.createTransaction();
    this._message.data.command = "register-new-user";
    this._message.data.user = u;
    this.sendMsg();
  }
  registerSaleUser(u) {
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data = {};
    this._message.data.transaction = this.createTransaction();
    this._message.data.command = "register-sale-user";
    this._message.data.user = u;
    this.sendMsg();
  }
  registerFinacneUser(u) {
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data = {};
    this._message.data.transaction = this.createTransaction();
    this._message.data.command = "register-finance-user";
    this._message.data.user = u;
    this.sendMsg();
  }

  selectYear(y) {
    this._selectedYear = y;
  }

  selectMonth(m) {
    this._selectedMonth = m;
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
  setCancelSending() {
    for (let index = 0; index < this._timerOutArray.length; index++) {
      const element = this._timerOutArray[index];
      clearTimeout(element);
    }
    this._timerOutArray.length = 0;
  }
  
  getCurrency(){
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data = {};
    this._message.data.transaction = this.createTransaction();
    this._message.data.command = "get-currency";
    console.log(this._message);
    //alert('OK')
    this.sendMsg();
  }
  getUnits(){
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data = {};
    this._message.data.transaction = this.createTransaction();
    this._message.data.command = "get-prod-unit";
    this.sendMsg();
  }
  importGoods(prod){
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data = {};
    this._message.data.transaction = this.createTransaction();
    this._message.data.command = "import-goods";
    this._message.data.stock = prod;
    this.sendMsg();
  }
  exportGoods(prod){
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data = {};
    this._message.data.transaction = this.createTransaction();
    this._message.data.command = "export-goods";
    this._message.data.stock = prod;
    this.sendMsg();
  }
  addGoods(prod){
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data = {};
    this._message.data.transaction = this.createTransaction();
    this._message.data.command = "add-goods";
    this._message.data.product = prod;
    this.sendMsg();
  }
  addObsoletedGoods(prod){
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data = {};
    this._message.data.transaction = this.createTransaction();
    this._message.data.command = "add-obsoleted-goods";
    this._message.data.product = prod;
    this.sendMsg();
  }
  getReport(selectedTime:any){
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data = {};
    this._message.data.transaction = this.createTransaction();
    this._message.data.command = "get-report-time";
    this._message.data.day = selectedTime.day;
    this._message.data.month =selectedTime.month;
    this._message.data.year = selectedTime.year;
    this.sendMsg();
  }
  
  getProductList(){
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data = {};
    this._message.data.transaction = this.createTransaction();
    this._message.data.command = "get-product-list";
    this.sendMsg();
  }

  getGoodsType(){
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data = {};
    this._message.data.transaction = this.createTransaction();
    this._message.data.command = "get-goods-type";
    this.sendMsg();
  }
  initStock(y,m,d){
    this._message = JSON.parse(JSON.stringify(this._client));
    this._message.data = {};
    this._message.data.transaction = this.createTransaction();
    this._message.data.command = "init-stock";
    this._message.data.d=d;
    this._message.data.m=m;
    this._message.data.y=y;
    this.sendMsg();
  }
}
