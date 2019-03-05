import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicResponseFollowComponent } from './topic-response-follow.component';

describe('TopicResponseFollowComponent', () => {
  let component: TopicResponseFollowComponent;
  let fixture: ComponentFixture<TopicResponseFollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicResponseFollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicResponseFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
