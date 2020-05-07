import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sme-score-choose-quesion',
  templateUrl: './sme-score-choose-quesion.component.html',
  styleUrls: ['./sme-score-choose-quesion.component.scss']
})
export class SmeScoreChooseQuesionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  next() {
      
  }

  back() {
    this.router.navigate(['maintenance/sme-score-record']);
  }

}
