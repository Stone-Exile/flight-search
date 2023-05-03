using Microsoft.EntityFrameworkCore;

namespace FlightSearch.WebApi.Core.Entities
{
    [PrimaryKey("Code")]
    public class Destination
    {
        public string Code { get; set; } = String.Empty;
        public string City { get; set; } = String.Empty;
    }
}