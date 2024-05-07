using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GraduateWork.Infrastructure.Migrations
{
    public partial class MailingAccount_RenamedFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ClientSecret",
                table: "MailingAccount",
                newName: "RefreshToken");

            migrationBuilder.RenameColumn(
                name: "ClientId",
                table: "MailingAccount",
                newName: "AccessToken");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RefreshToken",
                table: "MailingAccount",
                newName: "ClientSecret");

            migrationBuilder.RenameColumn(
                name: "AccessToken",
                table: "MailingAccount",
                newName: "ClientId");
        }
    }
}
