/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SixsRecoredChooseQuesionComponent } from './sixs-recored-choose-quesion.component';

describe('SixsRecoredChooseQuesionComponent', () => {
  let component: SixsRecoredChooseQuesionComponent;
  let fixture: ComponentFixture<SixsRecoredChooseQuesionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SixsRecoredChooseQuesionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SixsRecoredChooseQuesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
