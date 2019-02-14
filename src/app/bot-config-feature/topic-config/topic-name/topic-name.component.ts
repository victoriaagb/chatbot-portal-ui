import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { BotConfigService } from '../../bot-config.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Topic } from '../../../shared/model/topic.model';
import { TopicConfigService, TopicAction } from '../topic-config.service';

@Component({
  selector: 'topic-name',
  templateUrl: './topic-name.component.html',
  styleUrls: ['./topic-name.component.scss']
})
export class TopicNameComponent implements OnInit {

  topicName: string;
  currentTopic: Topic;

  constructor(
    private topicConfigService: TopicConfigService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentTopic = this.topicConfigService.currentTopic;
    this.topicName = _.get(this.currentTopic, 'name', '');
  }

  createNewTopic() {

    if (!_.isEmpty(this.topicName)) {
      const topic: Topic = {
        name: this.topicName
      };

      if (_.isEmpty(this.currentTopic)) {
        this.currentTopic = topic;
      } else {
        this.currentTopic.name = this.topicName;
      }
      this.topicConfigService.currentTopic = this.currentTopic;
      this.topicConfigService.sendTopicAction(TopicAction.CREATE);
      this.router.navigate(['../topic-questions'], {relativeTo: this.route});
   }
  }
}
