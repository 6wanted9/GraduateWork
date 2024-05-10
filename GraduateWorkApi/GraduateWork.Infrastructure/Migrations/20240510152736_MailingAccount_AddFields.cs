using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GraduateWork.Infrastructure.Migrations
{
    public partial class MailingAccount_AddFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ExpiresInSeconds",
                table: "MailingAccount",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IdToken",
                table: "MailingAccount",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "IssuedUtc",
                table: "MailingAccount",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Picture",
                table: "MailingAccount",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Scope",
                table: "MailingAccount",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TokenType",
                table: "MailingAccount",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExpiresInSeconds",
                table: "MailingAccount");

            migrationBuilder.DropColumn(
                name: "IdToken",
                table: "MailingAccount");

            migrationBuilder.DropColumn(
                name: "IssuedUtc",
                table: "MailingAccount");

            migrationBuilder.DropColumn(
                name: "Picture",
                table: "MailingAccount");

            migrationBuilder.DropColumn(
                name: "Scope",
                table: "MailingAccount");

            migrationBuilder.DropColumn(
                name: "TokenType",
                table: "MailingAccount");
        }
    }
}
