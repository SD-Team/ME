import { Component, OnInit } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { Router } from "@angular/router";
import { ScoreRecordService } from "../../../../_core/_services/score-record.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AuditRateM } from "../../../../_core/_models/score-record-question";
import { AuditRateDDetail } from "../../../../_core/_models/score-record-detail";
import { AlertifyService } from "../../../../_core/_services/alertify.service";

@Component({
  selector: "app-sixs-score-record-detail",
  templateUrl: "./sixs-score-record-detail.component.html",
  styleUrls: ["./sixs-score-record-detail.component.scss"],
})
export class SixsScoreRecordDetailComponent implements OnInit {
  urlImage = environment.imageUrl + "no-image.jpg";
  url: any = environment.imageUrl;
  recordId: string = "";
  auditRateM: AuditRateM = {
    record_ID: "",
    audit_Type_ID: "",
    pdc: "",
    building: "",
    line: "",
    audit_Type1: "",
    audit_Type2: "",
    mE_PIC: "",
    pD_RESP: "",
    updated_By: "",
    updated_Time: "",
    record_Date: null,
  };
  listAuditRateD: AuditRateDDetail[] = [];
  constructor(
    private router: Router,
    private scoreRecordService: ScoreRecordService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.scoreRecordService.currentRecordId.subscribe(
      (recordId) => (this.recordId = recordId)
    );
    this.loadData();
  }
  loadData() {
    this.spinner.show();
    this.scoreRecordService.getDetailScoreRecord(this.recordId).subscribe(
      (res) => {
        this.auditRateM = res.auditRateM;
        this.listAuditRateD = res.listAuditRateD;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
    this.spinner.hide();
  }
  onSelectFile(event, auditItemId) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      var title = event.target.files[0].name.split(".").pop();
      var fileZise = event.target.files[0].size;
      var file = event.target.files[0];
      if (
        title == "jpg" ||
        title == "jpeg" ||
        title == "png" ||
        title == "JPG" ||
        title == "JPEG" ||
        title == "PNG"
      ) {
        if (fileZise <= 2097152) {
          // reader.readAsDataURL(event.target.files[0]); // read file as data url
          // reader.onload = (event) => { // called once readAsDataURL is completed
          //   this.url = event.target.result;
          // };
          const formData = new FormData();
          formData.append("file", file);
          formData.append("recordId", this.recordId);
          formData.append("auditItemId", auditItemId);
          this.scoreRecordService.uploadPicture(formData).subscribe(
            () => {
              
              this.alertify.success(
                "Upload image of " + auditItemId + " successfully"
              );
              this.loadData();
            },
            (error) => {
              this.alertify.error(
                "Upload image of " + auditItemId + " failed"
              );
            }
           
          );
          this.loadData();
        } else {
          this.alertify.error("Images cannot be larger than 2MB");
        }
      } else if (title == "mp4" || title == "MP4") {
        if (fileZise <= 5242880) {
          // reader.readAsDataURL(event.target.files[0]); // read file as data url
          // reader.onload = (event) => { // called once readAsDataURL is completed
          //   this.url = (<FileReader>event.target).result;
          //  };
          const formData = new FormData();
          formData.append("file", file);
          formData.append("recordId", this.recordId);
          formData.append("auditItemId", auditItemId);
          this.scoreRecordService.uploadPicture(formData).subscribe(() => {
            this.loadData();
          });
          this.scoreRecordService.uploadPicture(formData).subscribe(
            () => {
              this.loadData();
              this.alertify.success(
                "Upload video of " + auditItemId + " successfully"
              );
            },
            (error) => {
              this.alertify.error("Upload video of " + auditItemId + " failed");
            }
          );
        } else {
          this.alertify.error("Video cannot be larger than 5MB");
        }
      } else {
        this.alertify.error("Incorrect format");
      }
    }
  }
  back() {
    this.router.navigate(["maintenance/6s-score-record"]);
  }
  chkImage(uploadPicture) {
    if (uploadPicture != null) {
      if (
        uploadPicture.split(".").pop() == "mp4" ||
        uploadPicture.split(".").pop() == "MP4"
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  exportExcel() {
    this.scoreRecordService.exportExcelDetail(this.recordId);
  }
}
