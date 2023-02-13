import { Icon } from '@fluentui/react';
import React, { useMemo } from 'react'
import { IFlight } from '../interfaces';
import { getDisplayTime } from '../lib/dates';

interface IFlightProps {
    flight: IFlight
    onFlightChange: (flight: IFlight) => void
}

export const Flight: React.FC<IFlightProps> = props => {
    const { flight, onFlightChange } = props
    const { airline, departure, arrival, icon, price, from, to } = flight

    const departureTime = getDisplayTime(departure)
    const arrivalTime = getDisplayTime(arrival)

    const flightTime = useMemo(() => {
        const milliseconds = Math.abs(+arrival - +departure)
        const seconds = Math.floor(Math.abs(milliseconds) / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)

        return `${hours} hr ${minutes % 60} min`
    }, [])

    return <div className='flight' onClick={() => onFlightChange(flight)}>
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