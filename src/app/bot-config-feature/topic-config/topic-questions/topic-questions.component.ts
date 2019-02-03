import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { BotConfigService } from '../../bot-config.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topic-questions',
  templateUrl: './topic-questions.component.html',
  styleUrls: ['./topic-questions.component.scss']
})
export class TopicQuestionsComponent implements OnInit {

  constructor(private sharedService: SharedService,
    private botConfigService: BotConfigService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  saveQuestions() {
    this.router.navigate(['../topic-answers'], {relativeTo: this.route});
  }

}
