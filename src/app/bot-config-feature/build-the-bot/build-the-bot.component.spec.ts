import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildTheBotComponent } from './build-the-bot.component';

describe('BuildTheBotComponent', () => {
  let component: BuildTheBotComponent;
  let fixture: ComponentFixture<BuildTheBotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildTheBotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildTheBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
