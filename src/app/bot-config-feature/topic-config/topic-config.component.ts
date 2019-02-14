import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { BotConfigService } from '../bot-config.service';
import { BotConfigRepository } from '../../shared/model/bot-config-repository.model';
import { Topic } from '../../shared/model/topic.model';
import { TopicConfigService, TopicAction } from './topic-config.service';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import { toPublicName } from '@angular/compiler/src/i18n/serializers/xmb';
@Component({
  selector: 'app-topic-config',
  templateUrl: './topic-config.component.html',
  styleUrls: ['./topic-config.component.scss']
})
export class TopicConfigComponent implements OnInit, OnDestroy {

  botConfig: BotConfigRepository;
  currentTopic: Topic;
  botSubscription: Subscription;
  topicSubscription: Subscription;

  constructor(private sharedService: SharedService,
    private botConfigService: BotConfigService,
    private topicConfigService: TopicConfigService,
    private router: Router,
    private route: ActivatedRoute) {
      this.botSubscription = this.sharedService.getCurrentBot().subscribe( data => {
        this.botConfig = this.sharedService.currentBot;
      });
      this.topicSubscription = this.topicConfigService.getTopicAction().subscribe (data => {
        this.currentTopic = this.topicConfigService.currentTopic;
        if (data.action === TopicAction.CREATE) {
          this.createNewTopic(this.currentTopic);
        }
      });
    }

  ngOnInit() {
    this.botConfig = this.sharedService.currentBot;
    if (_.isEmpty(this.botConfig.value.topics)) {
      this.botConfig.value.topics = [];
    }
  }

  ngOnDestroy() {
    this.botSubscription.unsubscribe();
    this.topicSubscription.unsubscribe();
  }

  updateCurrentTopic($event: Topic) {
    this.currentTopic = $event;
    this.topicConfigService.currentTopic = this.currentTopic;
    this.topicConfigService.sendTopicAction(TopicAction.UPDATE);
  }

  createNewTopic(topic: Topic) {
    this.currentTopic = topic;
    this.botConfig.value.topics.push(this.currentTopic);
    this.topicConfigService.currentTopic = this.currentTopic;
  }

}
