using System;
using System.ComponentModel.DataAnnotations;

namespace ME_API.Models
{
    public class MES_Audit_Type_D
    {
        public MES_Audit_Type_D()
        {
            
        }
        public MES_Audit_Type_D(long ID, MES_Audit_Type_M mES_Audit_Type_M, 
        string Audit_Type_ID, string Audit_Item_ID, string Audit_Type3_EN, string Audit_Type3_ZW,
        string Audit_Type3_LL, string Audit_Item_ZW,string Audit_Item_LL,string Audit_Item_EN,
        int Rating_0, int Rating_1, int Rating_2,int Version,string Updated_By, DateTime Updated_Time)
        {
            this.ID = ID;
            this.MES_Audit_Type_M = mES_Audit_Type_M;
            this.Audit_Type_ID = Audit_Type_ID;
            this.Audit_Item_ID = Audit_Item_ID;
            this.Audit_Type3_EN = Audit_Type3_EN;
            this.Audit_Type3_ZW = Audit_Type3_ZW;
            this.Audit_Type3_LL = Audit_Type3_LL;
            this.Audit_Item_ZW = Audit_Item_ZW;
            this.Audit_Item_EN = Audit_Item_EN;
            this.Rating_0 = Rating_0;
            this.Rating_1 = Rating_1;
            this.Rating_2 = Rating_2;
            this.Version = Version;
            this.Updated_By = Updated_By;
            this.Updated_Time = Updated_Time;
        }

        [Key]
        public long ID {get;set;}
        public MES_Audit_Type_M MES_Audit_Type_M { get; set; }
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

        

    }
}