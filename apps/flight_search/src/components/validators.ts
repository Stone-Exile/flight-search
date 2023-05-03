import { IFormValidation } from "../hooks";

export const userValidator: IFormValidation = {
    firstname: {
        required: true
    },
    lastname: {
        required: true
    },
    dateOfBirth: {
        required: true
    },
    nationality: {
        required: true
    },
}

export const searchValidator: IFormValidation = {
    origin: {
        required: true,
    },
    destination: {
        required: true,
    },
    departure: {
        required: true,
    },
}
