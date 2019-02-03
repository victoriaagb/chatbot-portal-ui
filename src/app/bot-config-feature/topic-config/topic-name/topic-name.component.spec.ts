import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicNameComponent } from './topic-name.component';

describe('TopicNameComponent', () => {
  let component: TopicNameComponent;
  let fixture: ComponentFixture<TopicNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
