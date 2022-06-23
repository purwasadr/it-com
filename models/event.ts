import { fetchGet } from 'libs/fetch';
import qs from 'qs';

export interface Event {
    id: number,
    title?: string,
    description?: string,
    poster?: string,
    eventTypes?: any[],
    date?: string,
    location?: string
}

export interface EventItem {
    id: number,
    title?: string,
    poster?: string,
    eventTypes?: any[],
    date?: string,
}

const qEvents = (operator: string) =>
    qs.stringify({
        populate: '*',
        filters: {
            date: {
                [operator]: new Date().toISOString(),
            },
        },
    });

const getUpcomingEvents = () => fetchGet(
    process.env.NEXT_PUBLIC_BACKEND_API +
        `/api/events?${qEvents('$gt')}`
);

const getHistoryEvents = () => fetchGet(
    process.env.NEXT_PUBLIC_BACKEND_API +
        `/api/events?${qEvents('$lt')}`
);

const EventModel = {
    getUpcomingEvents,
    getHistoryEvents
}
export default EventModel;