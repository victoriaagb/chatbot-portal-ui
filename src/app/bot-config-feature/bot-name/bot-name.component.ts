import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService, BotAction } from '../../shared/shared.service';
import { BotConfigRepository } from '../../shared/model/bot-config-repository.model';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import { BotConfig } from '../../shared/model/bot-config.model';
import { BotStatus } from '../../shared/model/bot-status.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { BotStepConfig } from '../../shared/model/bot-step-config.enum';

@Component({
  selector: 'app-bot-name',
  templateUrl: './bot-name.component.html',
  styleUrls: ['./bot-name.component.scss']
})
export class BotNameComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  BotAction = BotAction;
  currentBot: BotConfigRepository;

  constructor(private sharedService: SharedService,
              private router: Router,
              private route: ActivatedRoute) {
    this.subscription = this.sharedService.getBotAction().subscribe( data => {
      this.initialize();
    });
  }

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initialize() {
    if (_.isUndefined(this.sharedService.currentBot)) {
      this.sharedService.currentBot = <BotConfigRepository>{};
      this.sharedService.currentBot.stepConfig = BotStepConfig.NAME;
      this.sharedService.currentBot.value = <BotConfig>{
        name: {
          botName: '',
          botDescription: ''
        }
      };
    }
    this.currentBot = this.sharedService.currentBot;
  }

  saveName(botAction: BotAction) {
    if (_.isUndefined(this.currentBot.status)) {
      this.currentBot.status = BotStatus.INITIALIZED;
    }
    this.sharedService.sendBotAction(botAction, this.currentBot);
    this.router.navigate(['../topic-config'], {relativeTo: this.route});
  }
}

