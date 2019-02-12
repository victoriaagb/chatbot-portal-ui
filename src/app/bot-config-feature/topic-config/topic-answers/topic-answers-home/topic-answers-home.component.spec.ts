import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicAnswersHomeComponent } from './topic-answers-home.component';

describe('TopicAnswersHomeComponent', () => {
  let component: TopicAnswersHomeComponent;
  let fixture: ComponentFixture<TopicAnswersHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicAnswersHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicAnswersHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
