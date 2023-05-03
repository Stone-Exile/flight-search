import React, { useCallback, useContext, useMemo, useState } from 'react'
import { ComboBox, IComboBoxOption, DatePicker, PrimaryButton, IComboBox, SpinButton, Position, ISpinButtonStyles, ISpinButtonStyleProps, IStyleFunctionOrObject } from '@fluentui/react'
import { ISearch } from '../interfaces'
import uniqBy from 'lodash.uniqby'
import { useForm } from '../hooks'
import { searchValidator } from './validators'
import { today } from '../lib/dates'
import { AppContext } from '../store/context'
import { Types } from '../store/actions'

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

}

export const Search: React.FC<ISearchProps> = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [hasSubmittedForm, setHasSubmittedForm] = useState(false)
    const { state, dispatch } = useContext(AppContext)
    const { flights } = state

    //#region data setup
    const originOptions: IComboBoxOption[] = useMemo(() => {
        if (!flights) {
            return []
        }

        const options = uniqBy(flights.flatMap(flight => flight.to), 'code')

        return options.map(option => {
            return {
                key: option.code,
                text: option.city
            }
        })
    }, [flights])

    const destinationOptions: IComboBoxOption[] = useMemo(() => {
        if (!flights) {
            return []
        }

        const options = uniqBy(flights.flatMap(flight => flight.to), 'code')

        return options.map(option => {
            return {
                key: option.code,
                text: option.city
            }
        })
    }, [flights])

    //#endregion

    const handleSearch = useCallback((search: ISearch) => {
        if (search.origin === search.destination) {
            setErrorMessage('Origin and destination cannot be the same.')
            return
        }

        dispatch({ type: Types.SET_SEARCH_PARAMS, payload: search })
    }, [dispatch])

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
                <div className="col-12 col-md-6">
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
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="search-details">
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

                <div className="col-12 col-md-6">
                    <div className="search-details">
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
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="search-details">
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


    </div >
}

export default Search