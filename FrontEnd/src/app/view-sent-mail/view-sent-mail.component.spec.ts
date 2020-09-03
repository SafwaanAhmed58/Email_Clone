import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSentMailComponent } from './view-sent-mail.component';

describe('ViewSentMailComponent', () => {
  let component: ViewSentMailComponent;
  let fixture: ComponentFixture<ViewSentMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSentMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSentMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
