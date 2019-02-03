import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { BotConfigService } from '../../bot-config.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'topic-name',
  templateUrl: './topic-name.component.html',
  styleUrls: ['./topic-name.component.scss']
})
export class TopicNameComponent implements OnInit {

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
