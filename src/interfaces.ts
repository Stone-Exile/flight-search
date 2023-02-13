export interface ILocation {
    code: string
    city: string
}

export interface IFlight {
    price: number
    departure: Date
    arrival: Date
    code: string
    from: ILocation
    to: ILocation
    airline: string
    icon?: string
}

export interface ISearch {
    origin: string
    destination: string
    travelers: number
    departure?: Date
}

export interface IUserDetail {
    title: string
    firstname: string
    lastname: string
    dateOfBirth: string
    nationality: string
}