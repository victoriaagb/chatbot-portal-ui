import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicResponseTextComponent } from './topic-response-text.component';

describe('TopicResponseTextComponent', () => {
  let component: TopicResponseTextComponent;
  let fixture: ComponentFixture<TopicResponseTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicResponseTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicResponseTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
