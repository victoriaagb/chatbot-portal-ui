import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { BotConfigService } from '../../bot-config.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Topic } from '../../../shared/model/topic.model';

@Component({
  selector: 'topic-name',
  templateUrl: './topic-name.component.html',
  styleUrls: ['./topic-name.component.scss']
})
export class TopicNameComponent implements OnInit {

  topicName: string;

  constructor(private sharedService: SharedService,
    private botConfigService: BotConfigService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.topicName = '';
  }

  createNewTopic() {
    const currentBot = this.sharedService.currentBot;
    const topics: Topic[] = [];
    if (!_.isEmpty(this.topicName)) {
      const topic: Topic = {
        name: this.topicName
      };

      if (_.isNull(currentBot.value.topics)) {
        currentBot.value.topics = topics;
      }
      currentBot.value.topics.push(topic);
      this.sharedService.currentTopic = topic;
      this.sharedService.sendCurrentBot(currentBot);
      this.router.navigate(['../topic-questions'], {relativeTo: this.route});
    }
   }
}
