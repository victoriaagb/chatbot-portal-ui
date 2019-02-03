import { Injectable, Inject } from '@angular/core';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { BotConfigRepository } from './model/bot-config-repository.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SharedService {

  private _botSubject = new Subject<any>();
  screenWidth: number;
  currentBot: BotConfigRepository;
  currentPage: number;

  constructor(@Inject(SESSION_STORAGE) private sessionData: WebStorageService) {}

  // Session Data Manipulation
  storeSessionData(key: string, val: any) {
    this.sessionData.set(key, val);
  }

  retrieveSessionData() {
    this.currentBot = this.sessionData.get('currentBot');
    this.currentPage = this.sessionData.get('currentPage');
  }

  removeSessionData() {
    this.sessionData.remove('currentBot');
    this.sessionData.remove('currentPage');
  }

  // Message Events for Current Bot
  sendCurrentBot(currentBot: BotConfigRepository) {
    this.currentBot = currentBot;
    this.storeSessionData('currentBot', currentBot);
    this._botSubject.next({ botconfig: currentBot });
  }

  clearMessage() {
    this._botSubject.next();
  }

  getCurrentBot(): Observable<any> {
    return this._botSubject.asObservable();
  }

  // Device Screen Width Property
  getScreenWidth() {
    return this.screenWidth;
  }

  setScreenWidth(screenWidth: number) {
    this.screenWidth = screenWidth;
  }

}
