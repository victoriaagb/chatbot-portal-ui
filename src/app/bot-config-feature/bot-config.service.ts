import { Injectable } from '@angular/core';
import { BotConfigRepository } from '../shared/model/bot-config-repository.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BotConfigService {

  // TODO: Add into project constants
  private botConfigURL = 'http://18.223.226.83:8080/smart-chat-portal-0.0.1/botconfig';
  constructor(private http: HttpClient) { }

  createBotConfig(configInput: BotConfigRepository): Observable<BotConfigRepository> {
      return this.http
        .post<BotConfigRepository>(this.botConfigURL, configInput)
        .map(result => result);
    }

}
