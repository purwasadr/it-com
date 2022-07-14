import {fetchGet} from 'libs/fetch';
import qs from 'qs';
import { toEvent, toEvents } from 'utils/transform';

export interface Event {
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    poster?: string;
    eventTypes?: any[];
    date?: string;
    location?: string;
    registerLink?: string;
}

export interface EventItem {
    id: number;
    title?: string;
    slug?: string;
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
        pagination: {
            pageSize: 10,
        }
    });

const getUpcomingEvents = async () => {
    const req = await fetchGet(
        process.env.NEXT_PUBLIC_BACKEND_API + `/api/events?${qEvents('$gt')}`
    ).then((res) => res.json());

    return toEvents(req.data)
}
    

const getHistoryEvents = async () => {
    const req = await fetchGet(
        process.env.NEXT_PUBLIC_BACKEND_API + `/api/events?${qEvents('$lt')}`
    ).then((res) => res.json());

    return toEvents(req.data)
}
    

const getEvent = async (slug: string) => {
    const qEvent = qs.stringify({
        populate: '*',
        filters: {
            slug: {
                $eq: slug
            }
        }
    });

    const data = await fetchGet(
        process.env.NEXT_PUBLIC_BACKEND_API + `/api/events?${qEvent}`
    ).then((res) => res.json());


    return data.data[0] ? toEvent(data.data[0]) : undefined;
}
    

const EventModel = {
    getUpcomingEvents,
    getHistoryEvents,
    getEvent
};
export default EventModel;
