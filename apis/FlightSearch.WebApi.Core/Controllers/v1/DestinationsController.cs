using AutoMapper;
using FlightSearch.WebApi.Core.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace FlightSearch.WebApi.Core.Controllers.v1
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class DestinationsController: Controller 
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
        public DestinationsController(FlightSearchDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        #endregion constructors

        #region REST API Methods 
        [HttpGet("")]
        [ProducesResponseType(typeof(List<DestinationModel>), 200)]
        public  IActionResult GetDestinations() 
        {
            List<DestinationModel> returnData = new List<DestinationModel>();

            try 
            {
                if (!ModelState.IsValid)
                    throw new Exception("Invalid model state.");

                returnData = Mapper.Map<List<DestinationModel>>(_context.Destinations.ToList());
            }
            catch(Exception ex) {
                return StatusCode(500, ex.Message);
            }

            return Ok(returnData);
        }
        #endregion REST API Methods
    }
}