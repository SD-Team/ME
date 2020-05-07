import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from '@angular/router';
@Component({
  selector: "app-sixs-score-record-add",
  templateUrl: "./sixs-score-record-add.component.html",
  styleUrls: ["./sixs-score-record-add.component.scss"],
})
export class SixsScoreRecordAddComponent implements OnInit {
  question = false;
  constructor(private router:Router) { }

  ngOnInit() {}

  back() {
    this.router.navigate(['maintenance/6s-score-record']);
  }

  hideQuestion(){
    this.question=true;
  }
  receiveQuestion($event)
  {
    this.question = $event;
  }
}
