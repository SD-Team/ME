import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-sixs-recored-choose-quesion",
  templateUrl: "./sixs-recored-choose-quesion.component.html",
  styleUrls: ["./sixs-recored-choose-quesion.component.scss"],
})
export class SixsRecoredChooseQuesionComponent implements OnInit {
  remake: boolean = false;
  isLoading = true;
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
      Remake: "",

    },
  ];
  constructor() {}
  ngOnInit() {}
  cancel() {}
  checkedChang(item,number) {
    this.isLoading = false;
    this.Test.map((x) => {
      if (x.id == item.id) {
        if (number==1) {
          x.NA = 1;
          x.Rating0 = 0;
          x.Rating1 = 0;
          x.Remake = "";
        } else if (number==2) {
          x.NA = 0;
          x.Rating0 = 1;
          x.Rating1 = 0;
          x.Remake = item.Remake;
        } else {
          x.NA = 0;
          x.Rating0 = 0;
          x.Rating1 = 1;
          x.Remake = "";
        }
      }
    });
    console.log(1, this.Test);
  }
}
