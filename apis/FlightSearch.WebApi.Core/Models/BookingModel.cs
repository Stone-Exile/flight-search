using System.Text.Json.Serialization;

namespace FlightSearch.WebApi.Core
{
    public class BookingModel
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; } = String.Empty;
        
        [JsonPropertyName("firstname")]
        public string Firstname { get; set; } = String.Empty;

        [JsonPropertyName("lastname")]
        public string Lastname { get; set; } = String.Empty;

        [JsonPropertyName("dateOfBirth")]
        public DateTime DatOfBirth { get; set; }

        [JsonPropertyName("nationality")]
        public string Nationality { get; set; } = String.Empty;

        [JsonPropertyName("travelers")]
        public int Travelers { get; set; }

        [JsonPropertyName("flight")]
        [JsonIgnore(Condition = JsonIgnoreCondition.Never)]
        public required FlightModel Flight { get; set; }
    }
}