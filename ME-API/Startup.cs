using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ME_API._Repositories.Interface;
using ME_API._Repositories.Repositories;
using ME_API._Services.Interface;
using ME_API._Services.Services;
using ME_API.Data;
using ME_API.Helpers.AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace ME_API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddDbContext<DataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddControllers();
            //Auto Mapper
            services.AddAutoMapper(typeof(Startup));
            services.AddScoped<IMapper>(sp =>
            {
                return new Mapper(AutoMapperConfig.RegisterMappings());
            });
            services.AddSingleton(AutoMapperConfig.RegisterMappings());
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                            .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            //Repository
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IBrandRepository, BrandRepository>();
            services.AddScoped<IAuditTypeRepository, AuditTypeRepository>();
            services.AddScoped<IAuditTypeDRepository, AuditTypeDRepository>();
            services.AddScoped<IAuditPicMRepository, AuditPicMRepository>();
            services.AddScoped<IAuditPicDRepository, AuditPicDRepository>();
            services.AddScoped<IAuditRecMRepository, AuditRecMRepository>();
            services.AddScoped<IAuditRecDRepository, AuditRecDRepository>();
            services.AddScoped<IMesOrgRepository, MesOrgRepository>();
            services.AddScoped<IMesMoRepository, MesMoRepository>();
            services.AddScoped<IAuditRateDRepository, AuditRateDRepository>();
            services.AddScoped<IAuditRateMRepository, AuditRateMRepository>();

            //Services
            services.AddScoped<IBrandService, BrandService>();
            services.AddScoped<IAuditTypeService, AuditTypeService>();
            services.AddScoped<IAuditTypeDService, AuditTypeDService>();
            services.AddScoped<IAuditPicMService, AuditPicMService>();
            services.AddScoped<IAuditPicDService, AuditPicDService>();
            services.AddScoped<IAuditRecMService, AuditRecMService>();
            services.AddScoped<IAuditRecDService, AuditRecDService>();
            services.AddScoped<IMesOrgService, MesOrgService>();
            services.AddScoped<IMesMoService, MesMoService>();
            services.AddScoped<IAuditRateDService, AuditRateDService>();
            services.AddScoped<IAuditRateMService, AuditRateMService>();
            services.AddScoped<IAuditRateService, AuditRateService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
