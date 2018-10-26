import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotDesignComponent } from './bot-design.component';

describe('BotDesignComponent', () => {
  let component: BotDesignComponent;
  let fixture: ComponentFixture<BotDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
