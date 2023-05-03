using System.Text.Json.Serialization;

namespace FlightSearch.WebApi.Core
{
    public class FlightModel
    {

        [JsonPropertyName("code")]
        public int Id { get; set; }

        [JsonPropertyName("price")]
        public double Price { get; set; }

        [JsonPropertyName("arrival")]
        public DateTime Arrival { get; set; }

        [JsonPropertyName("departure")]
        public DateTime Departure { get; set; }

        [JsonPropertyName("from")]
        public required DestinationModel From { get; set; }

        [JsonPropertyName("to")]
        public required DestinationModel To { get; set; }

        [JsonPropertyName("airline")]
        public string? Airline { get; set; }
        
        [JsonPropertyName("icon")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Icon { get; set; }
    }
}