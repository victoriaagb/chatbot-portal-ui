import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Route, ActivatedRoute, NavigationEnd } from '@angular/router';
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
  navigationSubscription: Subscription;

  constructor(private sharedService: SharedService,
    private botConfigService: BotConfigService,
    private topicConfigService: TopicConfigService,
    private router: Router,
    private route: ActivatedRoute) {
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.topicConfigService.retrieveSessionData();
        }
      });
      this.botSubscription = this.sharedService.getCurrentBot().subscribe( data => {
        this.botConfig = this.sharedService.currentBot;
      });
      this.topicSubscription = this.topicConfigService.getTopicAction().subscribe (data => {
        this.currentTopic = this.topicConfigService.currentTopic;
        if (data.action === TopicAction.CREATE) {
          this.createNewTopic(this.currentTopic);
        }
        this.updateTopicList();
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
    this.navigationSubscription.unsubscribe();
  }

  gotoTopicQuestion($event: Topic) {
    this.currentTopic = $event;
    this.topicConfigService.sendTopicAction(TopicAction.UPDATE,  this.currentTopic);
    this.router.navigate(['./topic-questions'], {relativeTo: this.route});
  }

  gotoTopicAnswer($event: Topic) {
    this.currentTopic = $event;
    this.topicConfigService.sendTopicAction(TopicAction.UPDATE, this.currentTopic);
    this.router.navigate(['./topic-answers'], {relativeTo: this.route});
  }

  updateTopicList() {
    for (let i = 0; i < _.get(this.botConfig, 'value.topics.length', 0); i++) {
      if (this.botConfig.value.topics[i].name === this.currentTopic.name) {
        this.botConfig.value.topics[i] = this.currentTopic;
        this.sharedService.sendCurrentBot(this.botConfig);
        return;
      }
    }
  }

  createNewTopic(topic: Topic) {
    this.topicConfigService.currentTopic = this.currentTopic = topic;
    this.botConfig.value.topics.push(this.currentTopic);
  }

}
