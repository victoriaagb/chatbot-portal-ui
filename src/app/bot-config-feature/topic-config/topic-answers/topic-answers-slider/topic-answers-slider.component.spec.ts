import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicAnswersSliderComponent } from './topic-answers-slider.component';

describe('TopicAnswersSliderComponent', () => {
  let component: TopicAnswersSliderComponent;
  let fixture: ComponentFixture<TopicAnswersSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicAnswersSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicAnswersSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
