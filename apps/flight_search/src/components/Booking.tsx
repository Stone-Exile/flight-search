import React from 'react'
import { IBooking } from '../interfaces'
import { getDayDisplayDate, getDisplayDate, getDisplayTime } from '../lib/dates'
import { MessageBar, MessageBarType } from '@fluentui/react'

export interface IBookingProps {
    booking: IBooking
}

export const Booking: React.FC<IBookingProps> = props => {
    const { booking } = props
    const { title, flight, travelers } = booking

    const departureTime = getDisplayTime(flight!.departure)
    const arrivalTime = getDisplayTime(flight!.arrival)
    const departureDate = getDayDisplayDate(flight!.departure)


    return <div className='booking'>
        <div className="row">
            {/* <div className="col-12">
                <MessageBar messageBarType={MessageBarType.success}>
                    <span>Flight successfully booked!</span>
                </MessageBar>
            </div> */}
            <div className="col-12">
                <div className="form-label">
                    <h5>Flight </h5>
                    <MessageBar messageBarType={MessageBarType.info}>
                        <span>{departureDate}, {flight!.from.code} - {flight!.to.code}, {departureTime} - {arrivalTime}, € {(flight!.price * travelers).toFixed(2)}, {travelers} Travelers</span>
                    </MessageBar>
                </div>
            </div>
            <div className="col-12 col-md-6">
                <div className="form-label">
                    <h5>Title</h5>
                    <span>{title}</span>
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
        </div>
    </div>
}

export default Booking