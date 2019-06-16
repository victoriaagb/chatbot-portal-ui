import { Injectable } from '@angular/core';
import { BotConfigRepository } from '../shared/model/bot-config-repository.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { KycResponse } from '../shared/model/topic/kyc/response.model';
import { Response , TopicResponseType } from '../shared/model/topic/response.model';

@Injectable()
export class BotConfigService {
  // TODO: Add into project constants
   private botConfigURL = 'http://18.223.226.83:8080/smart-chat-portal-0.0.1/botconfig';
  // private botConfigURL = 'http://localhost:8080/smart-chat-portal/botconfig';
   private botKycUrl = 'http://18.223.226.83:8080/smart-chat-portal-0.0.1/kyc';
  // private botKycUrl = 'http://localhost:8080/smart-chat-portal/kyc';
  constructor(private http: HttpClient) { }

  createBotConfig(
    configInput: BotConfigRepository
  ): Observable<BotConfigRepository> {
    return this.http
      .post<BotConfigRepository>(this.botConfigURL, configInput)
      .map(result => result);
  }

  updateBotConfig(
    botConfigRespository: BotConfigRepository
  ): Observable<number> {
    return this.http
      .put<number>(this.botConfigURL, botConfigRespository)
      .map(result => result);
  }

  postForSynset(topic: any, questionsObject: any): Observable<any> {
    return this.http
      .post<Array<String>>(this.botKycUrl + '/synset', questionsObject)
      .map(questions => {
        const value = {};
        const text = {
          text: 'follow message'
        };
        topic['sample_request'] = topic.questions.concat(questions).join('|');
        topic['slotted'] = false;
        topic['follow'] = 'appreciate';
        topic['fulfill'] = 'internal';
        topic['response'] = this.mapTopicToKycFormat(topic.answers) ;
        topic['fulfill_status'] = true;
        topic['follow_message'] = [text];
        value[(topic.name).toLowerCase()] = topic;
        return value;
      });
  }

  updateBotKyc(botConfigRespository: any): Observable<number> {
    return this.http
      .put<number>(this.botKycUrl, botConfigRespository)
      .map(result => result);
  }

  mapTopicToKycFormat(responses: Response[]) {
    const kycResponses: KycResponse[] = [];
    responses.forEach(response => {
      if (response.response_type === TopicResponseType.TEXT) {
        const kycResponse: KycResponse = {};
        kycResponse.text = response.payload.text;
        kycResponse.attachment = {};
        kycResponses.push(kycResponse);
      } else if (response.response_type === TopicResponseType.BUTTON) {
        const kycResponse: KycResponse = {};
        // kycResponse.text = response.payload.text;
        kycResponse.attachment = {};
        kycResponse.attachment.type = 'template';
        kycResponse.attachment.payload = {};
        kycResponse.attachment.payload.template_type = 'button';
        kycResponse.attachment.payload.text = response.payload.text;
        kycResponse.attachment.payload.buttons = response.payload.buttons;
        kycResponses.push(kycResponse);
      }
    });
    console.log('kycResponses' + JSON.stringify(kycResponses));
    return kycResponses;
  }
}
