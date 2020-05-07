import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sixs-score-record-add",
  templateUrl: "./sixs-score-record-add.component.html",
  styleUrls: ["./sixs-score-record-add.component.scss"],
})
export class SixsScoreRecordAddComponent implements OnInit {
  remake: boolean = false;
  text:any;
  question:false;
  constructor() {}

  ngOnInit() {}
  changText(number) {
    console.log(this.text);
    if (number == 1) {
      this.remake = true;
    } else {
      this.remake = false;
    }
  }
  receiveQuestion($event)
  {
    this.question = $event;
  }
  backList(){
    this.question =false;
  }
}
