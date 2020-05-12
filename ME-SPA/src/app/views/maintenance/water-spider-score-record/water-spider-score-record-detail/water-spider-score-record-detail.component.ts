import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../../_core/_services/alertify.service';

@Component({
  selector: 'app-water-spider-score-record-detail',
  templateUrl: './water-spider-score-record-detail.component.html',
  styleUrls: ['./water-spider-score-record-detail.component.scss']
})
export class WaterSpiderScoreRecordDetailComponent implements OnInit {
  url: any = '../../../../../assets/img/avatars/8.jpg';
  constructor(private alertifyService: AlertifyService) { }

  ngOnInit() {
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      debugger
      const reader = new FileReader();
      var c = event.target.files[0];
      var b = event.target.files[0].name.split('.').pop();
      var a = event.target.files[0].size;
      if (a > 2000) {
        this.alertifyService.error('hình ảnh bạn up lên dung lượng quá lớn');
        return;
      }
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      };
    }
  }

}
