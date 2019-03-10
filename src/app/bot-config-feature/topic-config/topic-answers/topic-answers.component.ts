import { Component, OnInit, OnDestroy } from '@angular/core';
import { TopicConfigService, TopicAction } from '../topic-config.service';
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

  constructor(private topicConfigService: TopicConfigService) {
    this.subscription = this.topicConfigService.getTopicAction().subscribe (data => {
      this.initializeInvites();
    });
  }

  ngOnInit() {
    this.initializeInvites();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
    this.topicConfigService.sendTopicAction(TopicAction.UPDATE, this.topic);
    this.answerIndex = this.topic.answers.length - 1;
  }

  saveResponse($event: Payload) {
    this.topic.answers[this.answerIndex].payload = $event;
    this.topicConfigService.sendTopicAction(TopicAction.UPDATE, this.topic);
    this.answerIndex = undefined;
  }

  setAnswerIndex($event: number) {
    this.answerIndex = $event;
  }

}
