import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicResponseButtonComponent } from './topic-response-button.component';

describe('TopicResponseButtonComponent', () => {
  let component: TopicResponseButtonComponent;
  let fixture: ComponentFixture<TopicResponseButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicResponseButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicResponseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
