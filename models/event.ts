import {fetchGet} from 'libs/fetch';
import qs from 'qs';

export interface Event {
    id: number;
    title?: string;
    slug?: string;
    description?: string;
    poster?: string;
    eventTypes?: any[];
    date?: string;
    location?: string;
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

const getUpcomingEvents = () =>
    fetchGet(
        process.env.NEXT_PUBLIC_BACKEND_API + `/api/events?${qEvents('$gt')}`
    ).then((res) => res.json());

const getHistoryEvents = () =>
    fetchGet(
        process.env.NEXT_PUBLIC_BACKEND_API + `/api/events?${qEvents('$lt')}`
    ).then((res) => res.json());

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


    return {
        ...data,
        data: data.data[0] ?? undefined
    }
}
    

const EventModel = {
    getUpcomingEvents,
    getHistoryEvents,
    getEvent
};
export default EventModel;
