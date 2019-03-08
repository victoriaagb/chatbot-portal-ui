import { Component, OnInit } from '@angular/core';
import { TopicConfigService, TopicAction } from '../topic-config.service';
import { Subscription } from 'rxjs/Subscription';
import { Topic } from '../../../shared/model/topic.model';
import { Response, TopicResponseType } from '../../../shared/model/topic/response.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-topic-answers',
  templateUrl: './topic-answers.component.html',
  styleUrls: ['./topic-answers.component.scss']
})
export class TopicAnswersComponent implements OnInit {

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

  initializeInvites() {
    this.topic = this.topicConfigService.currentTopic;
    if (_.isEmpty(this.topic.answers)) {
      this.topic.answers = [];
    }
    this.answerIndex = null;
  }

  addResponse($event: Response) {
    this.topic.answers.push($event);
    this.topicConfigService.sendTopicAction(TopicAction.UPDATE, this.topic);
    this.answerIndex = this.topic.answers.length - 1;
  }

  saveResponse($event: Response) {

  }

  setAnswerIndex($event: number) {
    this.answerIndex = $event;
  }

  resetResponse() {
    this.answerIndex = undefined;
  }

}
