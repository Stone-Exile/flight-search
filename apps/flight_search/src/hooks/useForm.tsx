import { BaseButton, Button } from '@fluentui/react';
import { useState, useEffect, useCallback, useMemo } from 'react'

export interface IFormSchema {
	[x: string]: { value: any; error?: string }
}

export interface IFormValidation {
	[x: string]: {
		required?: boolean
		requiredWhenDepValue?: string
		/** throws error if target value doesn't match current value, must have errorMessage set */
		matchValue?: string
		minValue?: number
		maxValue?: number
		errorMessage?: string
		validator?: IFormValidator
	}
}

export interface IFormValidator {
	regEx: RegExp
	error: string
}

const useSchema = (obj: any) => {
	const schema: IFormSchema = useMemo(() => {
		const returnValue: IFormSchema = {}
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				const element = obj[key]
				returnValue[key] = { value: element, error: undefined }
			}
		}

		return returnValue
    }, [obj])
    
    return schema
}

export const useForm = <T,>(defaultFormValue: T, validationSchema: IFormValidation, callback?: (returnFormValue: T) => void) => {
	const schema = useSchema(defaultFormValue)

	const [formState, setState] = useState(schema)
	const [disable, setDisable] = useState(false)
	const [isDirty, setIsDirty] = useState(false)

	// Disable button in initial render.
	useEffect(() => {
		setDisable(true)
	}, [])

	// reset state to current passed in value
	useEffect(() => {
		setState(schema)
		setIsDirty(false)
		setDisable(false)
	}, [schema])

	// For every changed in our state this will be fired
	// To be able to disable the button
	useEffect(() => {
		if (isDirty) {
			setDisable(!isValid(false))
		}
	}, [formState, isDirty])

	// Used to handle every change in every input
	const handleOnChange = useCallback(
		(property: string, value: any) => {
			setIsDirty(true)

			let error: string | undefined = ''
			if (validationSchema[property]) {
				if (validationSchema[property].required) {
					if (!value) {
						error = validationSchema[property].errorMessage || 'This is a required field.'
					} 
				} 
                
				if (validationSchema[property].validator && typeof validationSchema[property].validator === 'object') {
					if (value && !validationSchema[property].validator?.regEx.test(value)) {
						error = validationSchema[property].validator?.error
					}
				}
			}

			setState((prevState) => ({
				...prevState,
				[property]: { value, error },
			}))

			return { [property]: { value, error } }
		},
		[validationSchema, formState]
	)

	// Used to disable submit button if there's an error in state
	// or the required field in state has no value.
	// Wrapped in useCallback to cached the function to avoid intensive memory leaked
	// in every re-render in component
	const isValid = useCallback(
		(validateAll: boolean) => {
			let currentFormState = formState
			if (validateAll) {
				Object.keys(validationSchema).forEach((key) => {
					currentFormState = { ...currentFormState, ...handleOnChange(key, formState[key].value) }
				})
			}

			const hasErrorInState = Object.keys(validationSchema).some((key) => {
				const isInputFieldRequired = validationSchema[key].required
				const stateValue = currentFormState[key].value // state value
				const stateError = currentFormState[key].error // state error

				return (isInputFieldRequired && !stateValue) || stateError
			})

			return !hasErrorInState
		},
		[formState, handleOnChange, validationSchema]
	)

	const handleOnSubmit = useCallback(
		(event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement | BaseButton | Button | HTMLSpanElement, MouseEvent>) => {
			event.preventDefault()

			// Make sure that validateState returns true
			// Before calling the submit callback function
			if (isValid(true)) {
				const returnValue: any = {}

				for (const key in formState) {
					if (formState.hasOwnProperty(key)) {
						const element: any = formState[key].value;
						returnValue[key] = element
					}
				}

				if (callback) callback(returnValue as T)
			}
		},
		[callback, formState, isValid]
	)

	return { formState, disable, handleOnChange, isValid, isDirty, handleOnSubmit }
}

export default useForm
