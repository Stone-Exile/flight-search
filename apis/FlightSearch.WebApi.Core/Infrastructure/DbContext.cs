using FlightSearch.WebApi.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace FlightSearch.WebApi.Core.Infrastructure
{
    public class FlightSearchDbContext : DbContext
    {
        public FlightSearchDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Destination> Destinations { get; set; } = null!;
        public DbSet<Flight> Flights { get; set; } = null!;
        public DbSet<Booking> Bookings { get; set; } = null!;
    }
}