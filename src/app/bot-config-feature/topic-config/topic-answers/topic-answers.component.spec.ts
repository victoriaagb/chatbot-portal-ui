import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicAnswersComponent } from './topic-answers.component';

describe('TopicAnswersComponent', () => {
  let component: TopicAnswersComponent;
  let fixture: ComponentFixture<TopicAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicAnswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
