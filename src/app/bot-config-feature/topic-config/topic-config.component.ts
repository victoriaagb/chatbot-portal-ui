import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { BotConfigService } from '../bot-config.service';

@Component({
  selector: 'app-topic-config',
  templateUrl: './topic-config.component.html',
  styleUrls: ['./topic-config.component.scss']
})
export class TopicConfigComponent implements OnInit {

  constructor(private sharedService: SharedService,
    private botConfigService: BotConfigService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  createNewTopic() {
   this.router.navigate(['../topic-questions'], {relativeTo: this.route});
  }

}
