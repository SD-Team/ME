namespace ME_API.DTO
{
    public class AuditRateDDetailDto
    {
        public string AuditItemId { get; set; }
        public string AuditItemLL { get; set; }
        public string AuditItemZW { get; set; }
        public string AuditItemEN { get; set; }
        public int Rating0 { get; set; }
        public int Rating1 { get; set; }
        public int Rating2 { get; set; }
        public int? RatingNA { get; set; }
        public string Remark { get; set; }
        public string UplloadPicture { get; set; }
    }
}