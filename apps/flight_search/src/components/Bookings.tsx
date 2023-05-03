import React, { useContext, useEffect } from 'react'
import { IBooking } from '../interfaces'
import { useQuery } from '@tanstack/react-query'
import { AppContext } from '../store/context'
import { Booking } from '.'
import { Types } from '../store/actions'

export const Bookings: React.FC = () => {
    const { state, dispatch } = useContext(AppContext)
    const { bookings } = state

    const { data } = useQuery<IBooking[]>({
        queryKey: ['bookingData'],
        queryFn: () =>
            fetch(`${process.env.REACT_APP_API_URL}bookings`).then(
                (res) => res.json(),
            ),
    })

    useEffect(() => {
        if (data) {
            dispatch({ type: Types.SET_BOOKINGS, payload: data })
        }
    }, [data])

    return <div className='container'>
        <div className="row form">
            <div className="col-12">

                {bookings.map((o, index) => <Booking key={index} booking={o} />)}

            </div>
        </div>

    </div>
}

export default Bookings