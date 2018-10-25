import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotNameComponent } from './bot-name.component';

describe('BotNameComponent', () => {
  let component: BotNameComponent;
  let fixture: ComponentFixture<BotNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
