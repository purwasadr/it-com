import { Contact } from 'models/contact';
import { Division } from 'models/division';
import { Event, EventItem } from 'models/event';
import { ResEvent } from '../types/types';

export const toEvents = (data: any[]) => {
    return data.map((event: any): EventItem => ({
            id: event.id,
            title: event.title,
            poster: event.poster?.formats.small.url,
            eventTypes: event.event_types,
            date: event.date,
        }))
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

export const toDivisions = (data: any[]) => {
    return data.map((item): Division => ({
        id: item.id,
        slug: item.slug,
        name: item.name
    }));
}

export const toContacts = (data: any[]) => {
    return data.map((item): Contact => ({
        id: item.id,
        name: item.name
    }));
}