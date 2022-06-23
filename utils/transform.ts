import { Event, EventItem } from 'models/event';
import { ResEvent } from '../libs/types';

export const responseToEvents = (res: any) => {
    return {
        ...res,
        data : res.data.map((event: any): ResEvent => ({
            id: event.id,
            title: event.title,
            poster: event.poster?.formats.small.url,
            eventTypes: event.event_types,
            date: event.date,
        }))
    }
}
export const toEvents = (data: any[]) => {
    return data.map((event: any): EventItem => ({
            id: event.id,
            title: event.title,
            poster: event.poster?.formats.small.url,
            eventTypes: event.event_types,
            date: event.date,
        }))
}

export const responseToEvent = (res: any) => {
    const event = res.data;
    return {
        ...res,
        data: {
            title: event.title,
            description: event.description,
            poster: event.poster?.formats.small.url,
            eventTypes: event.event_types,
            date: event.date,
            location: event.location
        }
    }
}
export const toEvent = (data: any): Event => {
    return {
            id: data.id,
            title: data.title,
            description: data.description,
            poster: data.poster.formats.small.url,
            eventTypes: data.event_types,
            date: data.date,
            location: data.location
        }
}

