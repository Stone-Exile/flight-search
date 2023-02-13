import React, { useEffect, useMemo, useState } from 'react'
import { IFlight, ISearch } from '../interfaces'
import jsonData from '../data.json'
import { getDisplayDate, getDisplayTime } from '../lib/dates'
import Flight from './Flight'

interface ISearchResultsProps {
    search?: ISearch
    onFlightChange: (flight: IFlight) => void
}

export const SearchResults: React.FC<ISearchResultsProps> = props => {
    const { search, onFlightChange } = props

    const [flightData, setFlightData] = useState<IFlight[]>()

    //#region data setup
    useEffect(() => {
        const data: IFlight[] = jsonData.map((flight) => {
            return {
                ...flight,
                departure: new Date(flight.departure),
                arrival: new Date(flight.arrival)
            }
        })


        setFlightData(data)
    }, [])
    //#endregion

    const filteredFlights: IFlight[] = useMemo(() => {
        if (!search || !flightData || !search.departure) {
            return []
        }

        const departureDate = getDisplayDate(search.departure)

        const results = flightData.filter(({ from, to, departure }) => {
            const flightDate = getDisplayDate(departure)
            return (from.code === search.origin && to.code === search.destination && flightDate === departureDate)
        })

        return results
    }, [search])

    return <>
        {search ? <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className='search-results'>
                        {(search && flightData && search.departure && filteredFlights.length === 0) && <div>No flights found, please try with different details.</div>}
                        {filteredFlights.map(flight => <Flight key={flight.code} flight={flight} onFlightChange={onFlightChange}/>)}
                    </div>
                </div>
            </div>
        </div> : <div />}

    </>
}

export default SearchResults