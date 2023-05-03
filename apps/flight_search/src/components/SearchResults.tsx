import React, { useContext, useMemo } from 'react'
import { IFlight } from '../interfaces'
import { getDisplayDate } from '../lib/dates'
import Flight from './Flight'
import { AppContext } from '../store/context'

interface ISearchResultsProps {

}

export const SearchResults: React.FC<ISearchResultsProps> = () => {
    const { state } = useContext(AppContext)
    const { searchParameters, flights } = state

    const filteredFlights: IFlight[] = useMemo(() => {
        if (!searchParameters || !flights || !searchParameters.departure) {
            return []
        }

        const departureDate = getDisplayDate(searchParameters.departure)

        const results = flights.filter(({ from, to, departure }) => {
            const flightDate = getDisplayDate(departure)
            return (from.code === searchParameters.origin && to.code === searchParameters.destination && flightDate === departureDate)
        })

        return results
    }, [searchParameters])

    return <>
        {searchParameters ? <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className='search-results'>
                        {(searchParameters && flights && searchParameters.departure && filteredFlights.length === 0) && <div>No flights found, please try with different details.</div>}
                        {filteredFlights.map(flight => <Flight key={flight.code} flight={flight} />)}
                    </div>
                </div>
            </div>
        </div> : <div />}

    </>
}

export default SearchResults