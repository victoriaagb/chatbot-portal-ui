import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'build-the-bot',
  templateUrl: './build-the-bot.component.html',
  styleUrls: ['./build-the-bot.component.scss']
})
export class BuildTheBotComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  buildBot(buildStatus: String) {
    console.log('About to build the bot');
  }
}
