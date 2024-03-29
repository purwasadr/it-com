import { Contact } from 'models/contact';
import { Division, DivisionItem } from 'models/division';
import { DivisionMemberItem } from 'models/division-member-model';
import { Event, EventItem } from 'models/event';

export const toEvents = (data: any[]) => {
    return data.map((event: any): EventItem => ({
            id: event.id,
            title: event.title,
            slug: event.slug,
            poster: event.poster?.formats?.small?.url,
            eventTypes: event.event_types,
            date: event.date,
        }))
}

export const toEvent = (data: any): Event => {
    return {
            id: data?.id,
            title: data?.title,
            slug: data?.slug,
            description: data?.description,
            poster: data?.poster?.formats?.small?.url,
            eventTypes: data?.event_types,
            date: data?.date,
            location: data?.location,
            registerLink: data?.register_link,
            providedBy: data?.provided_by,
            providedByPhoto: data?.provided_by_photo?.formats?.thumbnail?.url
        }
}

export const toDivisions = (data: any[]) => {
    return data.map((item): DivisionItem => ({
        id: item.id,
        slug: item.slug,
        name: item.name
    }));
}

export const toDivision = (data: any): Division => {
    return {
        id: data.id,
        slug: data.slug,
        name: data.name
    };
}

export const toContacts = (data: any[]) => {
    return data.map((item): Contact => ({
        id: item.id,
        name: item.name,
        link: item.link
    }));
}

export const toDivisionMembers = (data: any[]) => {
    return data.map((item): DivisionMemberItem => ({
        id: item.id,
        name: item.profile?.name,
        photo: item.profile?.photo?.formats?.medium?.url,
        role: item.role,
        kelas: item.profile?.kelas
    }));
}
