import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scope-record-layout',
  templateUrl: './scope-record-layout.component.html',
  styleUrls: ['./scope-record-layout.component.scss']
})
export class ScopeRecordLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  backList() {
      this.router.navigate(['/maintenance/sme-score-record']);
  }

}
