import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicResponseElementComponent } from './topic-response-element.component';

describe('TopicResponseElementComponent', () => {
  let component: TopicResponseElementComponent;
  let fixture: ComponentFixture<TopicResponseElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicResponseElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicResponseElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
