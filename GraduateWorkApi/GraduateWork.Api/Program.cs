using GraduateWorkApi.Configuration;

var builder = WebApplication.CreateBuilder(args);
const string corsName = "AllowedHosts";
const string appSettingsPathConfigurationKey = "ApplicationSettingsPath";

// Add services to the container.
builder.Configuration.AddJsonFile(builder.Configuration[appSettingsPathConfigurationKey]);
builder.Services.AddDatabaseConfiguration(builder.Configuration);
builder.Services.AddAuthConfiguration(builder.Configuration);
builder.Services.RegisterServices(builder.Configuration);
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerConfiguration();
builder.Services.AddAutoMapper(typeof(MapperConfiguration));

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsName,
        b =>
        {
            var origins = builder.Configuration[corsName].Split(";");
            b.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(corsName);
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();