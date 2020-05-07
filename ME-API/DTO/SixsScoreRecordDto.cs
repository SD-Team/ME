using System;

namespace ME_API.DTO
{
    public class SixsScoreRecordDto
    {
        public DateTime AuditDate { get; set; }
        public string AuditType { get; set; }
        public string AuditType2 { get; set; }
        public string LineId { get; set; }
        public int? RatingNa { get; set; }
        public int Rating0 { get; set; }
        public int Rating1 { get; set; }
        public int Total
        {
            get
            {
                return Rating1 + Rating0 + (int)RatingNa;
            }
        }
        public int NeedToDoQty
        {
            get
            {
                return Rating0 + Rating1;
            }
        }
        public decimal Achieving
        {
            get
            {
                // return (100 / NeedToDoQty) * Rating0 * 0 + (100 / NeedToDoQty) * Rating1 * 1; // Sum((100/E)*B*0) + ((100/E)*C*1)
                return Rating1/ NeedToDoQty; // Sum((100/E)*B*0) + ((100/E)*C*1)
            }
        }
    }
}