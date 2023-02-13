import React, { useCallback, useState } from 'react'
import { ChoiceGroup, DatePicker, DefaultButton, IChoiceGroupOption, IChoiceGroupStyleProps, IChoiceGroupStyles, IStyleFunctionOrObject, MessageBar, PrimaryButton, TextField } from '@fluentui/react'
import { useForm } from '../hooks'
import { IFlight, ISearch, IUserDetail } from '../interfaces'
import { getDayDisplayDate, getDisplayTime, today } from '../lib/dates'
import { userValidator } from './validators'

interface IUserDetialsProps {
    flight: IFlight
    search: ISearch
    onUserSave: (userDetail: IUserDetail) => void
    onClose: () => void
}

const defaultChoiceGroupStyles: IStyleFunctionOrObject<IChoiceGroupStyleProps, IChoiceGroupStyles> = {
    flexContainer: {
        display: 'flex',
        columnGap: '20px'
    }
}

const defaultUserDetail: IUserDetail = {
    title: 'Mr',
    firstname: '',
    lastname: '',
    dateOfBirth: '',
    nationality: ''
}

export const UserDetails: React.FC<IUserDetialsProps> = props => {
    const { flight, search, onUserSave, onClose } = props
    const departureTime = getDisplayTime(flight.departure)
    const arrivalTime = getDisplayTime(flight.arrival)

    const [hasSubmittedForm, setHasSubmittedForm] = useState(false)

    const handleSubmit = useCallback((userDetail: IUserDetail) => {
       onUserSave(userDetail)
    }, [])

    const { formState, handleOnChange, handleOnSubmit } = useForm<IUserDetail>(defaultUserDetail, userValidator, handleSubmit)

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
                    <span>Flight: {getDayDisplayDate(flight.departure)}, {flight.from.code} - {flight.to.code}, {departureTime} - {arrivalTime}, € {flight.price.toFixed(2)}, {search.travelers} Travelers</span>
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
                    <DefaultButton onClick={onClose}>Cancel</DefaultButton>
                </div>

            </div>
        </div>
    </div>
}

export default UserDetails

