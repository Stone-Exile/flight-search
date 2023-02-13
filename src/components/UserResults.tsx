import { DefaultButton, MessageBar, MessageBarType } from '@fluentui/react'
import React from 'react'
import { IFlight, ISearch, IUserDetail } from '../interfaces'
import { getDayDisplayDate, getDisplayDate, getDisplayTime } from '../lib/dates'

interface IUserResultsProps {
    flight: IFlight
    userDetail: IUserDetail
    search: ISearch
    onClose: () => void
}

export const UserResults: React.FC<IUserResultsProps> = props => {
    const { flight, userDetail, search, onClose } = props

    const departureTime = getDisplayTime(flight.departure)
    const arrivalTime = getDisplayTime(flight.arrival)


    return <div className='user-results'>
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
                        <span>{getDayDisplayDate(flight.departure)}, {flight.from.code} - {flight.to.code}, {departureTime} - {arrivalTime}, € {(flight.price * search.travelers).toFixed(2) }, {search.travelers} Travelers</span>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-label">
                        <h5>First Name</h5>
                        <span>{userDetail.firstname}</span>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-label">
                        <h5>Last name</h5>
                        <span>{userDetail.lastname}</span>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-label">
                        <h5>Date of birth</h5>
                        <span>{getDisplayDate(userDetail.dateOfBirth)}</span>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-label">
                        <h5>Nationality</h5>
                        <span>{userDetail.nationality}</span>
                    </div>
                </div>
               

                <div className="col-12">
                    <DefaultButton onClick={onClose}>Close</DefaultButton>
                </div>
            </div>
        </div>
    </div>
}

export default UserResults