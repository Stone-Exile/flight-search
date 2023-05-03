import React, { createContext, useReducer, Dispatch } from 'react';
import { Actions, State, Types } from './actions';


const initialState: State = {
	destinations: [],
	flights: [],
	bookings: []
}

export const AppContext = createContext<{
	state: State;
	dispatch: Dispatch<Actions>;
}>({
	state: initialState,
	dispatch: () => null
})


export const reducer = (state: State, action: Actions) => {
	switch (action.type) {
		case Types.RESET_FLIGHTBOOKING:
			return {
				...state,
				booking: undefined,
				selectedFlight: undefined,
				searchParameters: undefined
			}
		case Types.SET_FLIGHTBOOKING:
			return {
				...state,
				booking: action.payload
			}
		case Types.SET_BOOKINGS:
			return {
				...state,
				bookings: action.payload
			}

		case Types.SET_SEARCH_PARAMS:
			return {
				...state,
				searchParameters: action.payload
			}
		case Types.SET_SELECTED_FLIGHT:
			return {
				...state,
				selectedFlight: action.payload
			}


		case Types.SET_LOCATIONS:
			return {
				...state,
				destinations: [...action.payload]
			}
		case Types.SET_FLIGHTS:
			return {
				...state,
				flights: [...action.payload]
			}
		default:
			return state;
	}
}


interface IProps {
	children?: React.ReactNode
}

export const GlobalProvider: React.FC<IProps> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return <AppContext.Provider value={{ state, dispatch }}>
		{children}
	</AppContext.Provider>
}


export default GlobalProvider