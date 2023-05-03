namespace FlightSearch.WebApi.Core.Helpers
{
    public class DatesHelper
    {
        public static DateTime RoundUp(DateTime date, TimeSpan interval)
        {
            return new DateTime(
                 (long)Math.Round(date.Ticks / (double)interval.Ticks) * interval.Ticks
            );
        }
    }
}