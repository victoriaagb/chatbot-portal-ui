import { Component, OnInit, OnDestroy } from '@angular/core';
import { TopicConfigService, TopicAction } from '../topic-config.service';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Topic } from '../../../shared/model/topic.model';
import { Payload } from '../../../shared/model/topic/payload.model';
import { Response, TopicResponseType } from '../../../shared/model/topic/response.model';
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
  private subscription: Subscription;
  private navigationSubscription: Subscription;

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
    if (_.isEmpty(this.topic.answers)) {
      this.topic.answers = [];
    }
    this.answerIndex = undefined;
  }

  addResponse($event: Response) {
    this.topic.answers.push($event);
    this.answerIndex = this.topic.answers.length - 1;
  }

  removeResponse($event: Response) {
    this.topic.answers.splice(this.answerIndex);
    this.answerIndex = undefined;
  }

  saveResponse($event: Payload) {
    this.topic.answers[this.answerIndex].payload = $event;
    this.topicConfigService.sendTopicAction(TopicAction.UPDATE, this.topic);
    this.answerIndex = undefined;
  }

  deleteResponse($event: Payload) {
    this.topic.answers.splice(this.answerIndex);
    this.topicConfigService.sendTopicAction(TopicAction.REMOVE, this.topic);
    this.answerIndex = undefined;
  }

  setAnswerIndex($event: number) {
    this.answerIndex = $event;
  }

  resetResponse() {
    this.answerIndex = undefined;
  }

}
