import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'topic-response-text',
  templateUrl: './topic-response-text.component.html',
  styleUrls: ['./topic-response-text.component.scss']
})
export class TopicResponseTextComponent implements OnInit {

  @Input() answer: Response;
  constructor() { }

  ngOnInit() {

  }

}
