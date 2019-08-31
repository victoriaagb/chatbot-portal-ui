import { Component, OnInit } from '@angular/core';
import { SharedService, BotAction } from '../../shared/shared.service';
import { BotConfigRepository } from '../../shared/model/bot-config-repository.model';
import { Response, TopicResponseType } from '../../shared/model/topic/response.model';
import { KycResponse } from '../../shared/model/topic/kyc/response.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BotConfigService } from '../bot-config.service';
import { BotConfigRulesService } from '../bot-config-rules.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import { LoadingScreenService } from '../../shared/services/loading-screen.service';
import { Button, ButtonType } from '../../shared/model/topic/button.model';
import * as _ from 'lodash';
import { Topic } from '../../shared/model/topic.model';

@Component({
  selector: 'bot-header',
  templateUrl: './bot-header.component.html',
  styleUrls: ['./bot-header.component.scss']
})
export class BotHeaderComponent implements OnInit {

  private subscription: Subscription;
  currentBot: BotConfigRepository;
  topicMap: Map<string, Topic>;
  publishLoading: Boolean = false;
  canBuild: Boolean = false;

  constructor(private sharedService: SharedService,
    private ruleService: BotConfigRulesService,
    private botConfigService: BotConfigService,
    private loadingScreenService: LoadingScreenService) {
      this.subscription = this.sharedService.getBotAction().subscribe(data => {
        this.currentBot = this.sharedService.currentBot;
        this.canBuild = this.ruleService.canBuild(this.sharedService.currentBot);
      });
    }

  ngOnInit() {
    this.canBuild = this.ruleService.canBuild(this.sharedService.currentBot);
  }

  buildBot() {
    this.loadingScreenService.startLoading();
    this.sharedService.retrieveSessionData();
    this.currentBot = this.sharedService.currentBot;

    this.buildKycModel(this.currentBot);
    //TODO: retrieve updated BOT status.
    console.log('Testing the currentBot in session' + this.currentBot);
  }


  buildKycModel(botConfigRepo: BotConfigRepository) {
    const kyc = {};
    kyc['botId'] = botConfigRepo.botId;
    kyc['key'] = 'key';
    const value = {};
    const arrayOfMethodCall = [];

    this.topicMap = new Map();

    // build topic map to fill out the payload of each button
    botConfigRepo.value.topics.forEach((topic) => {
      this.topicMap.set(topic.topicId, topic);
    });

    /*
     *Push all the method calls for each topic in to an array.
     *This would help in executing the methods using Observable forkJoin.
     */
    botConfigRepo.value.topics.forEach((topic) => {
      arrayOfMethodCall.push(this.constructTopic(topic));
    });

    Observable.forkJoin(arrayOfMethodCall).subscribe(result => {
      result.forEach(topicResponse => {
        const response = Object.keys(topicResponse)[0];
        value[response] = topicResponse[response];
      });
      kyc['value'] = JSON.stringify(value);

      this.botConfigService.updateBotKyc(kyc).subscribe(data => {
        this.publishLoading = false;
        this.loadingScreenService.stopLoading();
      });
    });
  }

  constructTopic(topic): any {
    const currentTopic = {};
    const value = {};

    const topicQuestion = {
      bot_id: this.currentBot.botId,
      questions: topic.questions
    };

    const buttons: Button[] = [];
    topic.answers.forEach((answer) => {
      if (answer.response_type === TopicResponseType.BUTTON) {
        buttons.push(..._.get(answer, 'payload.buttons', []));
      }
      if (answer.response_type === TopicResponseType.ELEMENT) {
        buttons.push(..._.get(answer, 'payload.element.buttons', []));
      }
    });

    buttons.forEach((button) => {
      if (button.type === ButtonType.PAYLOAD) {
        let theTopic: Topic;
        let question: string;
        theTopic = this.topicMap.get(button.payloadTopicId);

        if (_.get(theTopic, 'questions.length', 0) > 0) {
          question = theTopic.questions[0];
          button.payload = question;
        }

      }
    });

    return this.botConfigService.postForSynset(topic , topicQuestion);
  }

  mapTopicToKycFormat(responses: Response[]) {

    const kycResponses: KycResponse[] = [];

    responses.forEach(response => {
      if (response.response_type === TopicResponseType.TEXT) {
        const kycResponse: KycResponse = {};
        kycResponse.text = response.payload.text;
        kycResponse.attachment = {};
        kycResponses.push(kycResponse);
      }
    });
    return kycResponses;
  }

}
