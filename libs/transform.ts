export const responseToEvents = (res: any) => {
    return {
        ...res,
        data : res.data.map((event: any) => ({
            id: event.id,
            title: event.title,
            poster: event.poster.formats.small.url,
            eventTypes: event.event_types,
            date: event.date
        }))
    }
}