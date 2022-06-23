using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BabylonBazar.Migrations
{
    public partial class added_location_id_to_notifications : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LocationId",
                table: "Notifications",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LocationId",
                table: "Notifications");
        }
    }
}
