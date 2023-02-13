import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ComboBox, IComboBoxOption, DatePicker, PrimaryButton, IComboBox, DefaultButton, IButtonStyles, SpinButton, Position, ISpinButtonStyles, ISpinButtonStyleProps, IStyleFunctionOrObject } from '@fluentui/react'
import jsonData from '../data.json'
import { IFlight, ISearch } from '../interfaces'
import uniqBy from 'lodash.uniqby'
import { useForm } from '../hooks'
import { searchValidator } from './validators'
import { today } from '../lib/dates'

const defaultSpinButtonStyles: IStyleFunctionOrObject<ISpinButtonStyleProps, ISpinButtonStyles> = {
    arrowButtonsContainer: {
        backgroundColor: 'white'
    }
}

const defaultSearch: ISearch = {
    origin: '',
    destination: '',
    travelers: 1,
    departure: undefined
}


interface ISearchProps {
    onSearchChange: (search: ISearch) => void
}

export const Search: React.FC<ISearchProps> = props => {
    const { onSearchChange } = props
    const [flightData, setFlightData] = useState<IFlight[]>()
    const [errorMessage, setErrorMessage] = useState('')
    const [hasSubmittedForm, setHasSubmittedForm] = useState(false)

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

    const originOptions: IComboBoxOption[] = useMemo(() => {
        if (!flightData) {
            return []
        }

        const options = uniqBy(flightData.flatMap(flight => flight.to), 'code')

        return options.map(option => {
            return {
                key: option.code,
                text: option.city
            }
        })
    }, [flightData])

    const destinationOptions: IComboBoxOption[] = useMemo(() => {
        if (!flightData) {
            return []
        }

        const options = uniqBy(flightData.flatMap(flight => flight.to), 'code')

        return options.map(option => {
            return {
                key: option.code,
                text: option.city
            }
        })
    }, [flightData])

    //#endregion

    const handleSearch = useCallback((search: ISearch) => {
        if (search.origin === search.destination) {
            setErrorMessage('Origin and destination cannot be the same.')
            return
        }

        onSearchChange(search)
    }, [])

    const { formState, handleOnChange, handleOnSubmit } = useForm<ISearch>(defaultSearch, searchValidator, handleSearch)


    const handleOriginChange = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption | undefined, index?: number | undefined, value?: string | undefined) => {
        if (option) {
            const key = option.key.toString()
            if (formState.destination.value === key) {
                setErrorMessage('Origin and destination cannot be the same.')
            } else setErrorMessage('')

            handleOnChange('origin', option.key.toString())
        }
    }

    const handleDestinationChange = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption | undefined, index?: number | undefined, value?: string | undefined) => {
        if (option) {
            const key = option.key.toString()
            if (formState.origin.value === key) {
                setErrorMessage('Origin and destination cannot be the same.')
            } else setErrorMessage('')
            handleOnChange('destination', key)
        }
    }

    const handleTravelersChange = (event: React.SyntheticEvent<HTMLElement, Event>, newValue?: string | undefined) => {
        if (newValue) {
            handleOnChange('travelers', newValue)
        }
    }

    const handleDepartureChange = (date: Date | null | undefined) => {
        if (!date || date === null) {
            handleOnChange('departure', undefined)

            return
        }

        handleOnChange('departure', date)
    }

    return <div className="search-banner">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="search-details">
                        <ComboBox
                            label="From"
                            className="search-box"
                            selectedKey={formState.origin.value}
                            errorMessage={formState.origin.error}
                            placeholder="Enter an origin"
                            allowFreeInput={true}
                            options={originOptions}
                            onChange={handleOriginChange}
                        />

                        <ComboBox
                            label="To"
                            className="search-box"
                            selectedKey={formState.destination.value}
                            errorMessage={formState.destination.error || errorMessage}
                            placeholder="Enter a destination"
                            allowFreeInput={true}
                            options={destinationOptions}
                            onChange={handleDestinationChange} />

                    </div>
                </div>

                <div className="col-12">
                    <div className="search-details extra">
                        <SpinButton
                            className="search-box"
                            label="Travelers"
                            labelPosition={Position.top}
                            styles={defaultSpinButtonStyles}
                            value={formState.travelers.value}
                            min={1}
                            max={100}
                            step={1}
                            onChange={handleTravelersChange}
                        />

                        <DatePicker
                            className="search-box"
                            label="Departure"
                            minDate={today}
                            placeholder="Enter a departure date"
                            onSelectDate={handleDepartureChange}
                            isRequired={hasSubmittedForm}
                        />

                    </div>
                </div>

                <div className="col-12">
                    <div className="search-details extra justify-content-end">
                        <PrimaryButton
                            className='search-button'
                            onClick={(event) => {
                                setHasSubmittedForm(true)
                                handleOnSubmit(event)
                            }}>Search</PrimaryButton>
                    </div>
                </div>

            </div>
        </div>


    </div>
}

export default Search