import {fetchGet} from 'libs/fetch';
import qs from 'qs';

export interface Event {
    id: number;
    title?: string;
    description?: string;
    poster?: string;
    eventTypes?: any[];
    date?: string;
    location?: string;
}

export interface EventItem {
    id: number;
    title?: string;
    poster?: string;
    eventTypes?: any[];
    date?: string;
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

const getUpcomingEvents = () =>
    fetchGet(
        process.env.NEXT_PUBLIC_BACKEND_API + `/api/events?${qEvents('$gt')}`
    ).then((res) => res.json());

const getHistoryEvents = () =>
    fetchGet(
        process.env.NEXT_PUBLIC_BACKEND_API + `/api/events?${qEvents('$lt')}`
    ).then((res) => res.json());

const getEvent = (id: number) => {
    const qEvent = qs.stringify({
        populate: '*',
    });

    return fetchGet(
        process.env.NEXT_PUBLIC_BACKEND_API + `/api/events/${id}?${qEvent}`
    ).then((res) => res.json());
}
    

const EventModel = {
    getUpcomingEvents,
    getHistoryEvents,
    getEvent
};
export default EventModel;
