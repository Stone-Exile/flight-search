using AutoMapper;
using FlightSearch.WebApi.Core.Entities;

namespace FlightSearch.WebApi.Core
{
    public class DomainProfile : Profile
    {
        public DomainProfile()
        {
            CreateMap<DestinationModel, Destination>()
                .ReverseMap();

            CreateMap<FlightModel, Flight>()
                .ReverseMap();

            CreateMap<BookingModel, Booking>()
                .ForMember(dest => dest.FlightId,
                    opts => opts.MapFrom(src => src.Flight.Id))
                .ReverseMap();
        }
    }
}