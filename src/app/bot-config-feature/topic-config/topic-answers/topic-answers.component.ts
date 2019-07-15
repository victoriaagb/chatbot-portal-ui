import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TopicConfigService, TopicAction } from '../topic-config.service';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Topic } from '../../../shared/model/topic.model';
import { Payload } from '../../../shared/model/topic/payload.model';
import { Response, TopicResponseType } from '../../../shared/model/topic/response.model';
import { TopicResponseTextComponent } from '../topic-answers/topic-response-text/topic-response-text.component';
import { TopicResponseButtonComponent } from '../topic-answers/topic-response-button/topic-response-button.component';
import {TopicResponseElementComponent } from '../topic-answers/topic-response-element/topic-response-element.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-topic-answers',
  templateUrl: './topic-answers.component.html',
  styleUrls: ['./topic-answers.component.scss']
})
export class TopicAnswersComponent implements OnInit, OnDestroy {

  TopicResponseType = TopicResponseType;

  answerIndex: number;
  topic: Topic;
  topicPayloadMap: Map<string, string>;
  isNewResponse: boolean;

  private subscription: Subscription;
  private navigationSubscription: Subscription;

  @ViewChild('topicResponseTextComponent')
  textComponent: TopicResponseTextComponent;

  @ViewChild('topicResponseButtonComponent')
  buttonComponent: TopicResponseButtonComponent;

  @ViewChild('topicResponseElementComponent')
  elementComponent: TopicResponseElementComponent;

  constructor(private topicConfigService: TopicConfigService,
              private router: Router) {
    this.subscription = this.topicConfigService.getTopicAction().subscribe (data => {
      this.initializeInvites();
    });

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationStart &&
          this.answerIndex !== undefined &&
          _.get(this.topic, 'answers[this.answerIndex].payload', undefined) === undefined) {
            this.removeResponse(undefined);
      }
    });
  }

  ngOnInit() {
    this.initializeInvites();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.navigationSubscription.unsubscribe();
  }

  initializeInvites() {
    this.topic = this.topicConfigService.currentTopic;
    this.topicPayloadMap = this.topicConfigService.topicMap;
    this.topicPayloadMap.delete(this.topic.name);
    if (_.isUndefined(this.topic.answers) || _.isNull(this.topic.answers)) {
      this.topic.answers = [];
    }
    this.answerIndex = undefined;
  }

  addNewResponse($event: Response) {
    this.isNewResponse = true;
    this.topic.answers.push($event);
    this.answerIndex = this.topic.answers.length - 1;
  }

  removeResponse($event: Response) {
    this.topic.answers.splice(this.answerIndex, 1);
    this.answerIndex = undefined;
  }

  saveResponse() {
    this.isNewResponse = false;
    const responseType: TopicResponseType = this.topic.answers[this.answerIndex].response_type;
    let action: TopicAction = TopicAction.UPDATE;
    switch (responseType) {
      case TopicResponseType.TEXT:
        this.topic.answers[this.answerIndex].payload = this.textComponent.payload;
        break;
      case TopicResponseType.BUTTON:
        this.buttonComponent.updateButtons();
        this.topic.answers[this.answerIndex].payload = this.buttonComponent.payload;
        break;
        case TopicResponseType.ELEMENT:
        this.elementComponent.updateButtons();
        this.topic.answers[this.answerIndex].payload = this.elementComponent.payload;
        break;
      default:
        action = TopicAction.NONE;
    }

    this.topicConfigService.sendTopicAction(TopicAction.UPDATE, this.topic);
    this.answerIndex = undefined;
  }

  deleteResponse() {
    this.topic.answers.splice(this.answerIndex, 1);
    this.topicConfigService.sendTopicAction(TopicAction.REMOVE, this.topic);
    this.answerIndex = undefined;
  }

  setAnswerIndex($event: number) {
    this.isNewResponse = false;
    this.answerIndex = $event;
  }

  resetResponse() {
    this.answerIndex = undefined;
  }

}
