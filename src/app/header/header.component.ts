import { Component, OnInit } from '@angular/core';
import { SharedService } from "../shared/shared.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'chat-portal-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  activeIndex = 0
  constructor(private sharedService : SharedService,
              private router : Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("Testing screen size" + this.sharedService.getScreenWidth());

  }

  selectHeaderItem(index){
    this.activeIndex = index;
  }
  isMobile(){
    return (this.sharedService.getScreenWidth() < 992);
  }

}
