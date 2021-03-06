using ME_API.Models;
using Microsoft.EntityFrameworkCore;

namespace ME_API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<MES_User> MES_User { get; set; }
        public DbSet<MES_Audit_Brand> MES_Audit_Brand { get; set; }
        public DbSet<MES_Audit_Type_M> MES_Audit_Type_M { get; set; }
        public DbSet<MES_Audit_Type_D> MES_Audit_Type_D {get;set;}
        public DbSet<MES_Audit_PIC_M> MES_Audit_PIC_M {get;set;}
        public DbSet<MES_Audit_PIC_D> MES_Audit_PIC_D {get;set;}
        public DbSet<MES_Audit_Rec_M> MES_Audit_Rec_M {get;set;}
        public DbSet<MES_Audit_Rec_D> MES_Audit_Rec_D {get;set;}
        public DbSet<MES_Audit_Rate_D> MES_Audit_Rate_D {get;set;}
        public DbSet<MES_Audit_Rate_M> MES_Audit_Rate_M {get;set;}
        public DbSet<MES_Org> MES_Org {get;set;}
        public DbSet<MES_MO> MES_MO {get;set;}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MES_Audit_Type_D>().HasKey(x => new {x.Audit_Type_ID, x.Audit_Item_ID});
            modelBuilder.Entity<MES_Audit_PIC_D>().HasKey(x => new {x.PIC_Type_ID, x.Resp_ID});
            modelBuilder.Entity<MES_Audit_Rec_D>().HasKey(x => new {x.Record_ID, x.Item_no});
            modelBuilder.Entity<MES_User>().HasKey(x => new { x.Factory_ID, x.User_ID });
            modelBuilder.Entity<MES_Org>().HasKey(x => new {x.Factory_ID, x.PDC_ID, x.Line_ID, x.Dept_ID});
            modelBuilder.Entity<MES_MO>().HasKey(x => new {x.Factory_ID, x.Cycle_No});
            modelBuilder.Entity<MES_Audit_Rate_D>().HasKey(x => new {x.Record_ID, x.Audit_Item_ID});
            modelBuilder.Entity<MES_Audit_Rate_M>().HasKey(x => new {x.Record_ID});
        }
    }
}