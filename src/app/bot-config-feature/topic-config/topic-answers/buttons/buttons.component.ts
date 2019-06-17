import { Component, OnInit, Input } from '@angular/core';
import { Button, ButtonType } from '../../../../shared/model/topic/button.model';
import * as _ from 'lodash';

@Component({
  selector: 'buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  ButtonType = ButtonType;

  @Input() buttons: Button[];
  @Input() id: number;

  constructor() { }

  ngOnInit() {
    if (_.isUndefined(this.buttons) || this.buttons.length === 0) {
      this.buttons = [];
      this.addButton();
    }
  }

  addButton() {
    let newButton: Button;
    newButton = {
      title: '',
      type: ButtonType.URL,
      url: '',
      payload: ''
    };

    this.buttons.push(newButton);
    console.log(this.buttons);
  }

  removeButton(index: number) {
    this.buttons.splice(index, 1);
  }

  handleChange(index: number) {
    if (this.buttons[index].type === ButtonType.URL) {
      this.buttons[index].url = this.buttons[index].payload;
      this.buttons[index].payload = '';
    } else {
      this.buttons[index].payload = this.buttons[index].url;
      this.buttons[index].url = '';
    }
  }
}
