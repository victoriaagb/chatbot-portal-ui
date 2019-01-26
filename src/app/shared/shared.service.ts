import { Injectable } from '@angular/core';
import { BotConfigRepository } from './model/bot-config-repository.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SharedService {

  private _botSubject = new Subject<any>();
  screenWidth: number;
  currentBot: BotConfigRepository;

  constructor() {}

  sendCurrentBot(currentBot: BotConfigRepository) {
    this.currentBot = currentBot;
    this._botSubject.next({ botconfig: currentBot });
  }

  clearMessage() {
    this._botSubject.next();
  }

  getCurrentBot(): Observable<any> {
    return this._botSubject.asObservable();
  }

  getScreenWidth() {
    return this.screenWidth;
  }

  setScreenWidth(screenWidth: number) {
    this.screenWidth = screenWidth;
  }

}
