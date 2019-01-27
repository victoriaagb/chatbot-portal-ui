import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { BotConfigRepository } from '../../shared/model/bot-config-repository.model';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import { BotConfig } from '../../shared/model/bot-config.model';
import { BotStatus } from '../../shared/model/bot-status.enum';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BotConfigService } from '../bot-config.service';

@Component({
  selector: 'app-bot-name',
  templateUrl: './bot-name.component.html',
  styleUrls: ['./bot-name.component.scss']
})
export class BotNameComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  currentBot: BotConfigRepository;

  constructor(private sharedService: SharedService,
              private botConfigService: BotConfigService,
              private router: Router,
              private route: ActivatedRoute) {
    this.subscription = this.sharedService.getCurrentBot().subscribe( data => {
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
    if (_.isNull(this.sharedService.currentBot)) {
      this.sharedService.currentBot = <BotConfigRepository>{};
      this.sharedService.currentBot.value = <BotConfig>{
        name: {
          botName: '',
          botDescription: ''
        }
      };
    }
    this.currentBot = this.sharedService.currentBot;
  }

  saveName() {
    if (_.isUndefined(this.currentBot.status)) {
      this.currentBot.status = BotStatus.INITIALIZED;
      // this.botConfigService.createBotConfig(this.currentBot);
    }
    this.sharedService.sendCurrentBot(this.currentBot);
    this.router.navigate(['../topic-config'], {relativeTo: this.route});
  }
}

