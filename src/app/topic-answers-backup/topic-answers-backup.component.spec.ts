import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicAnswersBackupComponent } from './topic-answers-backup.component';

describe('TopicAnswersBackupComponent', () => {
  let component: TopicAnswersBackupComponent;
  let fixture: ComponentFixture<TopicAnswersBackupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicAnswersBackupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicAnswersBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
