import { environment } from "../../../../../environments/environment";
import { AlertifyService } from './../../../../_core/_services/alertify.service';
import { SmeScoreRecordService } from "./../../../../_core/_services/sme-score-record.service";
import { AuditRateDDetail } from "./../../../../_core/_models/score-record-detail";
import { AuditRateM } from "./../../../../_core/_models/sme-record-question";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sme-score-record-detail",
  templateUrl: "./sme-score-record-detail.component.html",
  styleUrls: ["./sme-score-record-detail.component.scss"],
})
export class SmeScoreRecordDetailComponent implements OnInit {
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
    me_Pic: "",
    pd_Resp: "",
    updated_By: "",
    updated_Time: "",
    record_Date: null,
  };
  listAuditRateD: AuditRateDDetail[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertifyService: AlertifyService,
    private smeScoreRecordService: SmeScoreRecordService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.recordId = param['recordId'];
    });
    this.loadDetail();
  }

  loadDetail() {
    this.smeScoreRecordService.getDetailScoreRecord(this.recordId).subscribe(res => {
      this.auditRateM = res.auditRateM;
      this.listAuditRateD = res.listAuditRateD;
    });
    // this.activeRouter.params.subscribe((params) => {
    //   let recordId = params["recordId"];
    //   this.recordId = recordId;
    //   this.smeScoreRecordService
    //     .getDetailScoreRecord(recordId)
    //     .subscribe((data) => {
    //       console.log(this.url);
    //       this.auditRateM = data.auditRateM;
    //       this.listAuditRateD = data.listAuditRateD;
    //     });
    // });
  }

  exportExcelDetail() {
    this.smeScoreRecordService.exportExcelDetail(this.recordId);
  }

  onSelectFile(event, auditItemId) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      var title = event.target.files[0].name.split(".").pop();
      var fileZise = event.target.files[0].size;
      var file = event.target.files[0];
        if (
          title == "jpg" ||
          title == "jpeg"||
          title == "png" ||
          title == "JPG" ||
          title == "IPEG"||
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
          this.smeScoreRecordService.uploadPicture(formData).subscribe(
            () => {
              console.log(formData);
              this.loadDetail();
              this.alertifyService.success(
                "Upload image of " + auditItemId + " successfully"
              );
            },
            (error) => {
              this.alertifyService.success(
                "Upload image of " + auditItemId + " failed"
              );
            }
          );
        } else {
          this.alertifyService.error("Images cannot be larger than 2MB");
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
          this.smeScoreRecordService.uploadPicture(formData).subscribe(
            () => {
              this.loadDetail();
              this.alertifyService.success(
                "Upload video of " + auditItemId + " successfully"
              );
            },
            (error) => {
              this.alertifyService.error("Upload video of " + auditItemId + " failed");
            }
          );
        } else {
          this.alertifyService.error("Video cannot be larger than 5MB");
        }
      } else {
        this.alertifyService.error("Incorrect format");
      }
    }
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

  back() {
    this.router.navigate(["/maintenance/sme-score-record"]);
  }
}
