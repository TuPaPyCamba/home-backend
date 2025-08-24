import {DateTime} from "luxon"

/**
 * Checks if a given date falls within the current week in the CDMX time zone.
 *
 * @param inputDate - A JavaScript Date object or ISO string to evaluate.
 * @returns `true` if the date is in the same week and year as now (CDMX time), otherwise `false`.
 */
export const isWithinCDMXWeek = (inputDate: Date | string): boolean => {
    const date =
        typeof inputDate === "string"
            ? DateTime.fromISO(inputDate, {zone: "America/Mexico_City"})
            : DateTime.fromJSDate(inputDate).setZone("America/Mexico_City")

    const now = DateTime.now().setZone("America/Mexico_City")

    return date.weekNumber === now.weekNumber && date.year === now.year
}

/**
 * Checks if today is Monday in the CDMX time zone.
 *
 * @returns `true` if today is Monday (weekday === 1), otherwise `false`.
 */
export const isCDMXMonday = (): boolean => {
    const now = DateTime.now().setZone("America/Mexico_City")
    return now.weekday === 1
}

export const getStartOfCDMXWeek = (): Date => {
    const now = DateTime.now().setZone("America/Mexico_City")
    const monday = now.startOf("week") // Luxon considera lunes como inicio
    return monday.toJSDate()
}

export const isThisWeek = (date: Date) => {
    const dtCDMX = DateTime.now().setZone("America/Mexico_City")

    const startOfWeek = dtCDMX.startOf("week").startOf("day")
    const endOfWeek = startOfWeek.plus({days: 6}).endOf("day")

    const dtDate = DateTime.fromJSDate(date).setZone("America/Mexico_City")

    return dtDate >= startOfWeek && dtDate <= endOfWeek
}
