import { IBooking, IFlight, ILocation, ISearch } from "../interfaces"


type ActionMap<M extends { [index: string]: any }> = {
	[Key in keyof M]: M[Key] extends undefined
	? {
		type: Key;
	}
	: {
		type: Key;
		payload: M[Key];
	}
};

export type State = {
	destinations: ILocation[]
	flights: IFlight[]
	selectedFlight?: IFlight
	searchParameters?: ISearch
	booking?: IBooking
	bookings: IBooking[]
}

export enum Types {
	RESET_FLIGHTBOOKING = 'RESET_FLIGHTBOOKING',
	SET_FLIGHTBOOKING = 'SET_FLIGHTBOOKING',
	SET_BOOKINGS = 'SET_BOOKINGS',
	SET_FLIGHTS = 'SET_FLIGHTS',
	SET_LOCATIONS = 'SET_LOCATIONS',
	SET_SELECTED_FLIGHT = 'SET_SELECTED_FLIGHT',
	SET_SEARCH_PARAMS = 'SET_SEARCH_PARAMS'
}

type BookingPayload = {
	[Types.SET_SELECTED_FLIGHT]: IFlight | undefined
	[Types.SET_SEARCH_PARAMS]: ISearch | undefined
	[Types.SET_FLIGHTBOOKING]: IBooking | undefined
	[Types.RESET_FLIGHTBOOKING]: undefined
	[Types.SET_BOOKINGS]: IBooking[]
}

type DestinationsPayload = {
	[Types.SET_LOCATIONS]: ILocation[]
}

type FlightsPayload = {
	[Types.SET_FLIGHTS]: IFlight[]
}

type BookingActions = ActionMap<BookingPayload>[keyof ActionMap<BookingPayload>];
type DestinationsActions = ActionMap<DestinationsPayload>[keyof ActionMap<DestinationsPayload>];
type FlightsActions = ActionMap<FlightsPayload>[keyof ActionMap<FlightsPayload>];

export type Actions = BookingActions | DestinationsActions | FlightsActions
