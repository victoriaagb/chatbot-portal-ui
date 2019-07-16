import { Component, OnInit, Input, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { Payload } from '../../../../shared/model/topic/payload.model';
import { ButtonsComponent } from '../buttons/buttons.component';
import { Element } from '../../../../shared/model/topic/element.model';
import * as _ from 'lodash';

@Component({
  selector: 'topic-response-element',
  templateUrl: './topic-response-element.component.html',
  styleUrls: ['./topic-response-element.component.scss']
})
export class TopicResponseElementComponent implements OnInit, AfterViewInit {

  @ViewChildren('buttonsComponent')
  buttonsComponents: QueryList<ButtonsComponent>;
  @Input() payload: Payload;
  @Input() payloadMap: Map<string, string>;
  private currentElement: Number = 0;

  constructor() { }

  ngOnInit() {
    if (_.isUndefined(this.payload)) {
      this.payload = <Payload>{
        elements: []
      };
      this.addElement();
    }
  }

  ngAfterViewInit() {
  }

  addElement() {
    this.payload.elements.push(<Element> {
      image_url: '',
      title: '',
      subtitle: '',
      buttons: []
    });
  }

  updateButtons() {
    this.buttonsComponents.toArray().forEach((bComp) => {
      this.payload.elements[bComp.id].buttons = bComp.buttons;
    });
  }

  gotoPage($event: number) {
    this.currentElement = $event;
  }

}
