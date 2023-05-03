using System.Text.Json.Serialization;

namespace FlightSearch.WebApi.Core
{
    public class DestinationModel
    {
        [JsonPropertyName("code")]
        public string Code { get; set; } = String.Empty;
        
        [JsonPropertyName("city")]
        public string City { get; set; } = String.Empty;
    }
}