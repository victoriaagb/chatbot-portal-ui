import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicSliderComponent } from './topic-slider.component';

describe('TopicSliderComponent', () => {
  let component: TopicSliderComponent;
  let fixture: ComponentFixture<TopicSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
