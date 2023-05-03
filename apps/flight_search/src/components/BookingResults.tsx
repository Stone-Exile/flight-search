import { DefaultButton, MessageBar, MessageBarType } from '@fluentui/react'
import React, { useContext } from 'react'
import { getDayDisplayDate, getDisplayDate, getDisplayTime } from '../lib/dates'
import { AppContext } from '../store/context'
import { Types } from '../store/actions'

interface IBookingResultsProps {
}

export const BookingResults: React.FC<IBookingResultsProps> = props => {
    const { state, dispatch } = useContext(AppContext)
    const { selectedFlight, searchParameters, booking } = state


    const departureTime = getDisplayTime(selectedFlight!.departure)
    const arrivalTime = getDisplayTime(selectedFlight!.arrival)
    const departureDate = getDayDisplayDate(selectedFlight!.departure)

    const handleClose = () => {
        dispatch({ type: Types.RESET_FLIGHTBOOKING })
    }

    return <div className='booking-results'>
        <div className="container">
            <div className="row form">
                <div className="col-12">
                    <MessageBar messageBarType={MessageBarType.success}>
                        <span>Flight successfully booked!</span>
                    </MessageBar>
                </div>
                <div className="col-12">
                    <div className="form-label">
                        <h5>Flight </h5>
                        <span>{departureDate}, {selectedFlight!.from.code} - {selectedFlight!.to.code}, {departureTime} - {arrivalTime}, € {(selectedFlight!.price * searchParameters!.travelers).toFixed(2) }, {searchParameters?.travelers} Travelers</span>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-label">
                        <h5>First Name</h5>
                        <span>{booking?.firstname}</span>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-label">
                        <h5>Last name</h5>
                        <span>{booking?.lastname}</span>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-label">
                        <h5>Date of birth</h5>
                        <span>{getDisplayDate(booking!.dateOfBirth)}</span>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-label">
                        <h5>Nationality</h5>
                        <span>{booking?.nationality}</span>
                    </div>
                </div>
               

                <div className="col-12">
                    <DefaultButton onClick={handleClose}>Close</DefaultButton>
                </div>
            </div>
        </div>
    </div>
}

export default BookingResults