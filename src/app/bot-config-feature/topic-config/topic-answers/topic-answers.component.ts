import { Component, OnInit } from '@angular/core';
import { TopicConfigService } from '../topic-config.service';
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
  currentAnswer: Response;
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
    this.currentAnswer = null;
  }

  addResponse($event: Response){
    this.topic.answers.push($event);
    this.currentAnswer = $event;
  }

}
