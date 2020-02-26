using System;

namespace ME_API.DTO
{
    public class AuditType_D_Dto
    {
        public long ID {get;set;}
        public string Audit_Type_ID { get; set; }
        public string Audit_Item_ID { get; set; }
        public string Audit_Type3_ZW { get; set; }
        public string Audit_Type3_EN { get; set; }
        public string Audit_Type3_LL { get; set; }
        public string Audit_Item_EN {get;set;}
        public string Audit_Item_LL {get;set;}
        public string Audit_Item_ZW { get; set; }
        public int Rating_0 { get; set; }
        public int Rating_1 { get; set; }
        public int Rating_2 { get; set; }
        public int Version {get;set;}
        public string Updated_By {get;set;}
        public DateTime? Updated_Time { get; set; }        
        public AuditType_D_Dto() {
            this.Updated_Time =  DateTime.Now;
        }
        
    }
}