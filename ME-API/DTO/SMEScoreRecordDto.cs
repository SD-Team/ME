using System;

namespace ME_API.DTO {
    public class SMEScoreRecordDto {
        public DateTime AuditDate { get; set; }
        public string AuditType { get; set; }
        public string AuditType2 { get; set; }

        public string LineID { get; set; }
        public int? RatingNa { get; set; }
        public int Rating0 { get; set; }
        public int Rating1 { get; set; }
        public int Rating2 { get; set; }
        public int Total {
            get {
                return Rating1 + Rating0 + (int) RatingNa + Rating2;
            }
        }

        public int NeedToDoQty {
            get {
                return Rating0 + Rating1 + Rating2;
            }
        }

        public decimal Achieving {
            get {
                return (Rating1 / NeedToDoQty * 2) + (Rating2 / NeedToDoQty); 
            }
        }
        public string UpdateBy { get; set; }

        public DateTime? UpdateTime { get; set; }
    }
}