import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-sixs-recored-choose-quesion",
  templateUrl: "./sixs-recored-choose-quesion.component.html",
  styleUrls: ["./sixs-recored-choose-quesion.component.scss"],
})
export class SixsRecoredChooseQuesionComponent implements OnInit {
  remake: boolean = false;
  text: any;
  Test: any[] = [
    {
      id: "1",
      question: "the firts question?",
      NA: 0,
      Rating0: 0,
      Rating1: 0,
      Remake: "",
    },
    {
      id: "2",
      question: "the next question?",
      NA: 0,
      Rating0: 0,
      Rating1: 0,
    },
  ];
  constructor() {}
  ngOnInit() {}
  cancel() {}
  chkNa(item) {
    this.Test.map((x) => {
      if (x.id == item.id) {
        x.NA = 1;
        x.Rating0 = 0;
        x.Rating1 = 0;
      }
    });
    console.log(1, this.Test);
  }
  chkR0(item) {
    this.Test.map((x) => {
      if (x.id == item.id) {
        x.NA = 0;
        x.Rating0 = 1;
        x.Rating1 = 0;
      }
    });
    console.log(1, this.Test);
  }
  chkR1(item) {
    this.Test.map((x) => {
      if (x.id == item.id) {
        x.NA = 0;
        x.Rating0 = 0;
        x.Rating1 = 1;
      }
    });
    console.log(1, this.Test);
  }
  ChkRemake(item) {
    // this.Test.map((x) => {
    //   if (x.id == item.id) {
    //     if (x.Rating0 = 1) {
    //       return true;
    //     }
    //     return false;
    //   }
    //   return false;
    // });
  }
}
