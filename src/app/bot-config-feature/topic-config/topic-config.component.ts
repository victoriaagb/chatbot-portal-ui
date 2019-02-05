import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { BotConfigService } from '../bot-config.service';
import { BotConfigRepository } from '../../shared/model/bot-config-repository.model';

@Component({
  selector: 'app-topic-config',
  templateUrl: './topic-config.component.html',
  styleUrls: ['./topic-config.component.scss']
})
export class TopicConfigComponent implements OnInit {

  botConfig: BotConfigRepository;
  constructor(private sharedService: SharedService,
    private botConfigService: BotConfigService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.botConfig = this.sharedService.currentBot;
  }

  createNewTopic() {
   this.router.navigate(['../topic-questions'], {relativeTo: this.route});
  }

}
