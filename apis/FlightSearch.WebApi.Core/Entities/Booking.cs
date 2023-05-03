using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FlightSearch.WebApi.Core.Entities
{
    [PrimaryKey("Id")]
    public class Booking
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Title { get; set; } = String.Empty;

        public string Firstname { get; set; } = String.Empty;

        public string Lastname { get; set; } = String.Empty;

        public DateTime DatOfBirth { get; set; }

        public string Nationality { get; set; } = String.Empty;

        public int Travelers { get; set; }

        public required int FlightId { get; set; }

        
        [ForeignKey("FlightId")]
        public required Flight? Flight { get; set; }

    }
}