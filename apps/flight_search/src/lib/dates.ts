const padDateSegment = (segment: number) => {
    return segment.toString().padStart(2, '0')
}

export const getDisplayDate = (date: string | Date, seperator: string = '-') => {
    const newDate = new Date(date)

    return [
        newDate.getFullYear(),
        (newDate.getMonth() + 1).toString().padStart(2, '0'),
        newDate.getDate().toString().padStart(2, '0')
    ].join(seperator)
}

export const getDisplayTime = (date: string | Date) => {
    const newDate = new Date(date)
    let hours = newDate.getHours()
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours >= 12 ? hours - 12 : hours;

    return `${padDateSegment(hours)}:${padDateSegment(newDate.getMinutes())} ${ampm}`
}

export const getDayDisplayDate = (date: string | Date) => {
    const newDate = new Date(date)

    return `${newDate.toLocaleDateString(undefined, { weekday: 'short' })}, ${newDate.getDate()} ${newDate.toLocaleDateString(undefined, { month: 'short' })}`
}


export const today: Date = new Date(Date.now())
