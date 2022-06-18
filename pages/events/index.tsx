import CardEvent from '@/components/card/card-event';
import Primary from '@/components/layouts/primary';
import useEventPaging from 'libs/useEventPaging';
import {useCallback, useRef, useState} from 'react';

const Events = () => {
    const [pageNum, setPageNum] = useState(1);
    const {isLoading, error, events, hasMore} = useEventPaging(pageNum);

    const observer = useRef<IntersectionObserver>();
    const lastBookElementRef = useCallback(
        (node: any) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPageNum((prev) => prev + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore]
    );

    console.log('Events:', events);
    console.log('PageNum:', pageNum);

    return (
        <Primary>
            <div
                className={`flex flex-col md:flex-row md:justify-center md:flex-wrap p-8 gap-4 ${
                    events.length ? '' : ''
                }`}
            >
                {events.length
                    ? events.map((event: any, i: number) =>
                          events.length === i + 1 ? (
                              <CardEvent
                                  className="md:flex-shrink-0"
                                  key={event.id}
                                  title={event.title}
                                  poster={
                                      process.env.NEXT_PUBLIC_BACKEND_API +
                                      event.poster
                                  }
                                  eventTypes={event.eventTypes}
                                  inputRef={lastBookElementRef}
                                  date={new Date(event.date).toDateString()}
                              />
                          ) : (
                              <CardEvent
                                  className="md:flex-shrink-0"
                                  key={event.id}
                                  title={event.title}
                                  poster={
                                      process.env.NEXT_PUBLIC_BACKEND_API +
                                      event.poster
                                  }
                                  eventTypes={event.eventTypes}
                                  date={new Date(event.date).toDateString()}
                              />
                          )
                      )
                    : 'No event yet'}
            </div>
        </Primary>
    );
};

export default Events;
