import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, Route, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { SharedService, BotAction } from '../../shared/shared.service';
import { BotConfigService } from '../bot-config.service';
import { BotConfigRepository } from '../../shared/model/bot-config-repository.model';
import { Topic } from '../../shared/model/topic.model';
import { TopicConfigService, TopicAction } from './topic-config.service';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

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

  // @HostListener('window:beforeunload') onBeforeUnload() {
  //    this.ngOnDestroy();
  // }

  constructor(private sharedService: SharedService,
    private botConfigService: BotConfigService,
    private topicConfigService: TopicConfigService,
    private router: Router,
    private route: ActivatedRoute) {
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationStart) {
          this.topicConfigService.storeSessionData();
        }
        if (e instanceof NavigationEnd) {
          this.topicConfigService.retrieveSessionData();
        }
      });
      this.botSubscription = this.sharedService.getBotAction().subscribe( data => {
        this.botConfig = this.sharedService.currentBot;
      });
      this.topicSubscription = this.topicConfigService.getTopicAction().subscribe (data => {
        this.currentTopic = this.topicConfigService.currentTopic;
        if (data.action === TopicAction.CREATE) {
          this.addNewTopic(this.currentTopic);
          this.updateTopicList();
        } else if (data.action === TopicAction.UPDATE || data.action === TopicAction.REMOVE) {
          this.updateTopicList();
        }
       this.botConfig.value.topics = _.clone(this.botConfig.value.topics);
      });
    }

  ngOnInit() {
    this.botConfig = this.sharedService.currentBot;
    if (_.isEmpty(this.botConfig.value.topics)) {
      this.botConfig.value.topics = [];
    }
    this.topicConfigService.topicList = this.botConfig.value.topics;
  }

  ngOnDestroy() {
    this.botSubscription.unsubscribe();
    this.topicSubscription.unsubscribe();
    this.navigationSubscription.unsubscribe();
    this.topicConfigService.removeSessionData();
  }

  gotoTopicQuestion($event: number) {
    this.currentTopic = this.topicConfigService.topicList[$event];
    this.topicConfigService.sendTopicAction(TopicAction.NONE, this.currentTopic);
    this.router.navigate(['./topic-questions'], {relativeTo: this.route});
  }

  gotoTopicAnswer($event: number) {
    this.currentTopic = this.topicConfigService.topicList[$event];
    this.topicConfigService.sendTopicAction(TopicAction.NONE, this.currentTopic);
    this.router.navigate(['./topic-answers'], {relativeTo: this.route});
  }

  gotoTopicName($event: number) {
    this.currentTopic = undefined;

    if ($event || $event === 0) {
      this.currentTopic = this.topicConfigService.topicList[$event];
    }
    this.topicConfigService.sendTopicAction(TopicAction.NONE, this.currentTopic);
    this.router.navigate(['./topic-name'], {relativeTo: this.route});
  }

  removeTopic(i: number) {
    this.topicConfigService.topicList.splice(i, 1);
    this.botConfig.value.topics = this.topicConfigService.topicList;
    this.sharedService.sendBotAction(BotAction.UPDATE, this.botConfig);

    this.gotoTopicName(undefined);
  }

  updateTopicList() {
    for (let i = 0; i < _.get(this.topicConfigService, 'topicList.length', 0); i++) {
      if (this.topicConfigService.topicList[i].topicId === this.currentTopic.topicId) {
        this.topicConfigService.topicList[i] = this.currentTopic;
        this.botConfig.value.topics = this.topicConfigService.topicList;
        this.sharedService.sendBotAction(BotAction.UPDATE, this.botConfig);
        this.topicConfigService.storeSessionData();
        return;
      }
    }
  }

  addNewTopic(topic: Topic) {
    topic.topicId = this.topicConfigService.createUniqueTopicId(topic.name);
    topic.name = topic.topicId;
    this.topicConfigService.currentTopic = this.currentTopic = topic;
    this.topicConfigService.topicList.push(this.currentTopic);
    this.botConfig.value.topics = this.topicConfigService.topicList;
    this.topicConfigService.sendTopicAction(TopicAction.NONE, this.currentTopic);
  }

  copyTopic(i: number) {
      if (this.topicConfigService.topicList.length > 0) {
      const topic: Topic = this.topicConfigService.topicList[i];
      const copyTopic: Topic = JSON.parse(JSON.stringify(topic));

      this.addNewTopic(copyTopic);
      this.updateTopicList();
      this.gotoTopicName(i + 1);
    }
  }
}
