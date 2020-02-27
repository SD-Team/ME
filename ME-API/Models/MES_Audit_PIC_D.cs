using System;
using System.ComponentModel.DataAnnotations;

namespace ME_API.Models
{
    public class MES_Audit_PIC_D
    {
        public string PIC_Type_ID { get; set; }
        public string Resp_ID { get; set; }
        public string Resp_ZW { get; set; }
        public string Resp_EN { get; set; }
        public string Resp_LL { get; set; }
        public string Status { get; set; }
        public string Updated_By { get; set; }
        public DateTime? Updated_Time { get; set; }
        public string Agent { get; set; }
        public string Email { get; set; }
        public string PDC { get; set; }
        public string Building { get; set; }
        public string Language { get; set; }

    }
}