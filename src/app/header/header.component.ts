import { Component, OnInit } from '@angular/core';
import { SharedService } from "../shared/shared.service";

@Component({
  selector: 'chat-portal-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private sharedService : SharedService) { }

  ngOnInit() {
    console.log("Testing screen size" + this.sharedService.getScreenWidth());
  }

}
