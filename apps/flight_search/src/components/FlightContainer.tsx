import React, { useContext, useEffect } from 'react'
import { AppContext } from '../store/context'
import { Search, SearchResults, FlightBooking, BookingResults } from '.'
import { Types } from '../store/actions'
import { useQuery } from '@tanstack/react-query'
import { IFlight } from '../interfaces'

export const FlightContainer: React.FC = () => {
    const { state, dispatch } = useContext(AppContext)
    const { selectedFlight, booking } = state

    const { data } = useQuery<IFlight[]>({
        queryKey: ['flightData'],
        queryFn: () =>
            fetch(`${process.env.REACT_APP_API_URL}flights`).then(
                (res) => res.json(),
            ),
    })

    useEffect(() => {
        if (data) {
            dispatch({
                type: Types.SET_FLIGHTS, payload: data.map((flight) => {
                    return {
                        ...flight,
                        departure: new Date(flight.departure),
                        arrival: new Date(flight.arrival)
                    }
                })
            })
        }
    }, [data])

    return <>
        {!selectedFlight ? <>
            <Search />
            <SearchResults />
        </> : <>
            {!booking ? <FlightBooking /> : undefined}
            {booking ? <BookingResults /> : undefined}
        </>}
    </>
}

export default FlightContainer