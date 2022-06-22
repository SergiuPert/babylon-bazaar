using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BabylonBazar.Migrations
{
    public partial class updated_location : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddresLine2",
                table: "Location");

            migrationBuilder.RenameColumn(
                name: "image",
                table: "Reviews",
                newName: "Image");

            migrationBuilder.RenameColumn(
                name: "AddresLine1",
                table: "Location",
                newName: "Name");

            migrationBuilder.AddColumn<string>(
                name: "Addres",
                table: "Location",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Addres",
                table: "Location");

            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Reviews",
                newName: "image");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Location",
                newName: "AddresLine1");

            migrationBuilder.AddColumn<string>(
                name: "AddresLine2",
                table: "Location",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
