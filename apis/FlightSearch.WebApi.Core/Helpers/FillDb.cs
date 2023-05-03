using FlightSearch.WebApi.Core.Entities;
using FlightSearch.WebApi.Core.Helpers;
using FlightSearch.WebApi.Core.Infrastructure;

namespace FlightSearch.WebApi.Core
{
    public class FillDb
    {
        private static string _getAirline(string code)
        {
            switch (code)
            {
                case "BRU": return "Brussels Airways";
                case "BER":
                case "AMS": return "Lufthansa";
                default: return "British Airways";
            }
        }

        private static string? _getIcon(string code)
        {
            switch (code)
            {
                case "BRU": return null;
                case "BER":
                case "AMS": return "/images/lufthansa.png";
                default: return "/images/british-airways.png";
            }
        }

        public static void AddDestinations(WebApplication app)
        {
            var scope = app.Services.CreateScope();
            var db = scope.ServiceProvider.GetService<FlightSearchDbContext>();

            if (db != null)
            {
                var destination1 = new Destination
                {
                    Code = "JNB",
                    City = "Johannesburg, South Africa (OR Tambo)"
                };

                var destination2 = new Destination
                {
                    Code = "AMS",
                    City = "Amsterdam, Netherlands (Schiphol)"
                };
                var destination3 = new Destination
                {
                    Code = "BER",
                    City = "Berlin, Germany (Brandenburg)"
                };

                var destination4 = new Destination
                {
                    Code = "BRU",
                    City = "Brussels, Belgium (Brussels)"
                };


                db.Destinations.Add(destination1);
                db.Destinations.Add(destination2);
                db.Destinations.Add(destination3);
                db.Destinations.Add(destination4);

                db.SaveChanges();
            }
        }

        public static void AddFlights(WebApplication app)
        {
            var scope = app.Services.CreateScope();
            var db = scope.ServiceProvider.GetService<FlightSearchDbContext>();
            var interval = TimeSpan.FromMinutes(10);

            if (db != null)
            {
                var destinations = db.Destinations.ToList();
                var random = new Random();

                for (int i = 0; i < destinations.Count; i++)
                {
                    for (int c = 0; c < 8; c++)
                    {
                        for (int f = 0; f < destinations.Count; f++)
                        {
                            if (destinations[f].Code != destinations[i].Code)
                            {
                                var currentDate = DateTime.UtcNow.AddDays(c);
                                var price = random.NextDouble() * (10000 - 1500) + 1500;
                                var flightTime = random.Next(1, 11);

                                db.Flights.Add(new Flight
                                {
                                    Arrival = DatesHelper.RoundUp(currentDate, interval),
                                    Departure = DatesHelper.RoundUp(currentDate.AddHours(flightTime), interval),
                                    From = destinations[i],
                                    FromCode = destinations[i].Code,
                                    To = destinations[f],
                                    ToCode = destinations[f].Code,
                                    Price = Math.Floor(price * 100) / 100,
                                    Airline = _getAirline(destinations[f].Code),
                                    Icon = _getIcon(destinations[f].Code)
                                });

                                currentDate = currentDate.AddHours(4);

                                db.Flights.Add(new Flight
                                {
                                    Arrival = DatesHelper.RoundUp(currentDate, interval),
                                    Departure = DatesHelper.RoundUp(currentDate.AddHours(flightTime), interval),
                                    From = destinations[i],
                                    FromCode = destinations[i].Code,
                                    To = destinations[f],
                                    ToCode = destinations[f].Code,
                                    Price = Math.Floor((price - 100) * 100) / 100,
                                    Airline = _getAirline(destinations[f].Code),
                                    Icon = _getIcon(destinations[f].Code)
                                });
                            }
                        }
                    }
                }

                db.SaveChanges();
            }
        }
    }
}