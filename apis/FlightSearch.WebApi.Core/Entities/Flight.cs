using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FlightSearch.WebApi.Core.Entities
{
    [PrimaryKey("Id")]
    public class Flight
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public double Price { get; set; }
        public DateTime Arrival { get; set; }
        public DateTime Departure { get; set; }
        [ForeignKey("From")]
        public required string FromCode { get; set; }
        public required Destination From { get; set; }

        [ForeignKey("To")]
        public required string ToCode { get; set; }
        public required Destination To { get; set; }
        public string? Airline { get; set; }
        public string? Icon { get; set; }
    }
}