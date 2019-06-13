import { Component, OnInit, Input } from '@angular/core';
import { Payload } from '../../../../shared/model/topic/payload.model';

@Component({
  selector: 'topic-response-element',
  templateUrl: './topic-response-element.component.html',
  styleUrls: ['./topic-response-element.component.scss']
})
export class TopicResponseElementComponent implements OnInit {

  @Input() payload: Payload;
  constructor() { }

  ngOnInit() {
  }

}
