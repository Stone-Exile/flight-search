using AutoMapper;
using FlightSearch.WebApi.Core.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlightSearch.WebApi.Core.Controllers.v1
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class FlightsController: Controller 
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
        public FlightsController(FlightSearchDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        #endregion constructors

        #region REST API Methods 
        [HttpGet("")]
        [ProducesResponseType(typeof(List<FlightModel>), 200)]
        public  IActionResult GetFlights() 
        {
            List<FlightModel> returnData = new List<FlightModel>();

            try 
            {
                if (!ModelState.IsValid)
                    throw new Exception("Invalid model state.");

                returnData = Mapper.Map<List<FlightModel>>(_context.Flights.Include(o => o.From).Include(o => o.To).ToList());
            }
            catch(Exception ex) {
                return StatusCode(500, ex.Message);
            }

            return Ok(returnData);
        }
        #endregion REST API Methods
    }
}