using AutoMapper;
using FlightSearch.WebApi.Core.Entities;
using FlightSearch.WebApi.Core.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlightSearch.WebApi.Core.Controllers.v1
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class BookingsController : Controller
    {
        #region private variables
        private IMapper _mapper;
        private FlightSearchDbContext _context;
        #endregion private variables

        #region protected properties
        protected IMapper Mapper
        {
            get
            {
                return _mapper;
            }
        }
        #endregion protected properties

        #region constructors
        public BookingsController(FlightSearchDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        #endregion constructors

        #region REST API Methods 
        [HttpGet("")]
        [ProducesResponseType(typeof(List<BookingModel>), 200)]
        public IActionResult GetBookings()
        {
            List<BookingModel> returnData = new List<BookingModel>();

            try
            {
                if (!ModelState.IsValid)
                    throw new Exception("Invalid model state.");

                returnData = Mapper.Map<List<BookingModel>>(_context.Bookings.Include(o => o.Flight).ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

            return Ok(returnData);
        }

        [HttpPost]
        [ProducesResponseType(typeof(BookingModel), 200)]
        public IActionResult CreateBooking(BookingModel booking)
        {
            try
            {
                if (!ModelState.IsValid)
                    throw new Exception("Invalid model state.");

                var data = Mapper.Map<Booking>(booking);
                data.Flight = null;
                _context.Bookings.Add(data);
                _context.SaveChanges();

                this.Mapper.Map(data, booking);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }


            return Ok(booking);
        }

        #endregion REST API Methods
    }
}