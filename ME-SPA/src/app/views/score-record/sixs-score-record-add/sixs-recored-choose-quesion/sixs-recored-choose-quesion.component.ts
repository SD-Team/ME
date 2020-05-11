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
  constructor() { }
  ngOnInit() { }
  cancel() { }
  checkedChang(item, number) {
    if (number == 1) {
      item.NA = 1;
      item.Rating0 = 0;
      item.Rating1 = 0;
      item.Remake = "";
    } else if (number == 2) {
      item.NA = 0;
      item.Rating0 = 1;
      item.Rating1 = 0;
      item.Remake = item.Remake;
    } else {
      item.NA = 0;
      item.Rating0 = 0;
      item.Rating1 = 1;
      item.Remake = "";
    }
  }

  saveAndNew() {
console.log(this.Test);
  }
}
