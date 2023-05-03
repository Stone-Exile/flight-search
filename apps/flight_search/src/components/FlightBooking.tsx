import React, { useCallback, useContext, useState } from 'react'
import { ChoiceGroup, DatePicker, DefaultButton, IChoiceGroupOption, IChoiceGroupStyleProps, IChoiceGroupStyles, IStyleFunctionOrObject, MessageBar, PrimaryButton, TextField } from '@fluentui/react'
import { useForm } from '../hooks'
import { IBooking } from '../interfaces'
import { getDayDisplayDate, getDisplayTime, today } from '../lib/dates'
import { userValidator } from './validators'
import { AppContext } from '../store/context'
import { Types } from '../store/actions'

interface IUserDetialsProps {

}

const defaultChoiceGroupStyles: IStyleFunctionOrObject<IChoiceGroupStyleProps, IChoiceGroupStyles> = {
    flexContainer: {
        display: 'flex',
        columnGap: '20px'
    }
}

const defaultFlightBooking: IBooking = {
    title: 'Mr',
    firstname: '',
    lastname: '',
    dateOfBirth: '',
    nationality: '',
    travelers: 0,
    flight: undefined
}

export const FlightBooking: React.FC<IUserDetialsProps> = props => {
    const { state, dispatch } = useContext(AppContext)
    const { selectedFlight, searchParameters } = state
    const departureTime = getDisplayTime(selectedFlight!.departure)
    const arrivalTime = getDisplayTime(selectedFlight!.arrival)

    const [hasSubmittedForm, setHasSubmittedForm] = useState(false)

    const handleSubmit = useCallback((flightbooking: IBooking) => {
        flightbooking.travelers = searchParameters!.travelers
        flightbooking.flight = selectedFlight;

        fetch(`${process.env.REACT_APP_API_URL}bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(flightbooking)
        }).then((res) => {
            
            dispatch({ type: Types.SET_FLIGHTBOOKING, payload: flightbooking })
        })

    }, [])

    const handleClose = () => {
        dispatch({ type: Types.RESET_FLIGHTBOOKING })
    }

    const { formState, handleOnChange, handleOnSubmit } = useForm<IBooking>(defaultFlightBooking, userValidator, handleSubmit)

    const handleTitleChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, option?: IChoiceGroupOption | undefined) => {
        if (option) {
            handleOnChange('title', option.key.toString())
        }
    }

    const handleFirstNameChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
        handleOnChange('firstname', newValue)
    }

    const handleLastNameChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
        handleOnChange('lastname', newValue)
    }

    const handleDateChange = (date: Date | null | undefined) => {
        if (!date || date === null) {
            handleOnChange('dateOfBirth', '')

            return
        }

        handleOnChange('dateOfBirth', date.toISOString())
    }

    const handleNationalityChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
        handleOnChange('nationality', newValue)
    }

    return <div className="container">
        <div className="row form">
            <div className="col-12">
                <MessageBar>
                    <span>Flight: {getDayDisplayDate(selectedFlight!.departure)}, {selectedFlight!.from.code} - {selectedFlight!.to.code}, {departureTime} - {arrivalTime}, € {(selectedFlight!.price * searchParameters!.travelers).toFixed(2)}, {searchParameters?.travelers} Travelers</span>
                </MessageBar>
            </div>
            <div className="col-12">
                <ChoiceGroup
                    label="Title"
                    styles={defaultChoiceGroupStyles}
                    selectedKey={formState.title.value}
                    onChange={handleTitleChange}
                    options={[
                        {
                            key: 'Mr',
                            text: "Mr"
                        }, {
                            key: 'Ms',
                            text: "Ms"
                        },
                        {
                            key: 'Mrs',
                            text: "Mrs"
                        }]
                    } />

            </div>
            <div className="col-12 col-md-6">
                <TextField
                    label='First name'
                    value={formState.firstname.value}
                    errorMessage={formState.firstname.error}
                    onChange={handleFirstNameChange}
                />

            </div>
            <div className="col-12 col-md-6">
                <TextField
                    label="Last name"
                    value={formState.lastname.value}
                    errorMessage={formState.lastname.error}
                    onChange={handleLastNameChange}
                />
            </div>
            <div className="col-12 col-md-6">
                <DatePicker
                    label="Date of birth"
                    isRequired={hasSubmittedForm}
                    maxDate={today}
                    onSelectDate={handleDateChange}
                />
            </div>
            <div className="col-12 col-md-6">
                <TextField
                    label="Nationality"
                    value={formState.nationality.value}
                    errorMessage={formState.nationality.error}
                    onChange={handleNationalityChange}
                />
            </div>
            <div className="col-12">
                <div className="buttons">
                    <PrimaryButton
                        className='search-button'
                        onClick={(event) => {
                            setHasSubmittedForm(true)
                            handleOnSubmit(event)
                        }}>
                        Save
                    </PrimaryButton>
                    <DefaultButton onClick={handleClose}>Cancel</DefaultButton>
                </div>

            </div>
        </div>
    </div>
}

export default FlightBooking

