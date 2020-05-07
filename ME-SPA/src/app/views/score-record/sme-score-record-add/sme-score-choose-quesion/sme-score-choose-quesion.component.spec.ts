/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SmeScoreChooseQuesionComponent } from './sme-score-choose-quesion.component';

describe('SmeScoreChooseQuesionComponent', () => {
  let component: SmeScoreChooseQuesionComponent;
  let fixture: ComponentFixture<SmeScoreChooseQuesionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeScoreChooseQuesionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeScoreChooseQuesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
