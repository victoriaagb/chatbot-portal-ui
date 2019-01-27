import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { BotConfigRepository } from './shared/model/bot-config-repository.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

  private botConfigURL = 'http://18.223.226.83:8080/smart-chat-portal-0.0.1/botconfig';
    constructor(private http: HttpClient) { }

    createBotConfig(configInput: BotConfigRepository): Observable<BotConfigRepository> {
      return this.http
        .post<BotConfigRepository>(this.botConfigURL, configInput)
        .map(result => result);
    }
    getBotConfigList(): Observable<BotConfigRepository[]> {
      return this.http
      .get<BotConfigRepository[]>(this.botConfigURL)
      .map(result => result);
    }

    // TODO: Hard delete make into soft delete
    deleteBotConfig(botConfig: BotConfigRepository): Observable<number> {
      return this.http
      .put<number>(this.botConfigURL + '/delete', botConfig)
      .map(result => result);
    }

}
