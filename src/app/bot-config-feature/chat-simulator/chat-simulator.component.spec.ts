import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSimulatorComponent } from './chat-simulator.component';

describe('ChatSimulatorComponent', () => {
  let component: ChatSimulatorComponent;
  let fixture: ComponentFixture<ChatSimulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatSimulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
