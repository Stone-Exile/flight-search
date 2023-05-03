import { Icon } from '@fluentui/react';
import React, { useContext, useMemo } from 'react'
import { IFlight } from '../interfaces';
import { getDisplayTime } from '../lib/dates';
import { AppContext } from '../store/context';
import { Types } from '../store/actions';

interface IFlightProps {
    flight: IFlight
}

export const Flight: React.FC<IFlightProps> = props => {
    const { flight } = props
    const { airline, departure, arrival, icon, price, from, to } = flight
    const { dispatch } = useContext(AppContext)

    const departureTime = getDisplayTime(departure)
    const arrivalTime = getDisplayTime(arrival)

    const flightTime = useMemo(() => {
        const milliseconds = Math.abs(+arrival - +departure)
        const seconds = Math.floor(Math.abs(milliseconds) / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)

        return `${hours} hr ${minutes % 60} min`
    }, [])

    const onFlightChange = () => {
        dispatch({ type: Types.SET_SELECTED_FLIGHT, payload: flight })
    }

    return <div className='flight' onClick={onFlightChange}>
        <img className='flight-icon' src={icon || "/images/default-airline.png"}></img>
        <div className="flight-details">
            <span className='flight-time'>{departureTime} - {arrivalTime}</span>
            <span>{airline}</span>
        </div>

        <div className="flight-length">
            <span className="flight-length-value">
                {flightTime}
            </span>
            <span>{from.code} - {to.code}</span>
        </div>

        <div className="flight-price">
            € {price.toFixed(2)}
        </div>
        <div className='d-flex justify-content-end'>
            <Icon iconName='ChevronRight' style={{ fontSize: 32 }} />
        </div>

    </div>
}

export default Flight