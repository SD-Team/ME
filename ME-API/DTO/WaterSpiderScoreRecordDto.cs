using System;

namespace ME_API.DTO
{
    public class WaterSpiderScoreRecordDto
    {
        public string RecordId { get; set; }
        public DateTime AuditDate { get; set; }
        public string AuditType { get; set; }
        public string LineId { get; set; }
        public int Loss { get; set; }
        public int Score { get; set; }
        public int Total { get; set; } = 100;
        public decimal Achieving {
            get {
                return Score/Total; 
            }
        }

    }
}