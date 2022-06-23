import CardEvent from '@/components/card/card-event';
import useEventPaging from 'libs/useEventPaging';
import {useCallback, useRef, useState} from 'react';

const CardEventLoc = ({ event, lastElementRef }: { event: any, lastElementRef?: (node: any) => void}) => {
    return <CardEvent
                className=""
                href={`/events/detail/${event.id}`}
                key={event.id}
                title={event.title}
                poster={
                    process.env.NEXT_PUBLIC_BACKEND_API +
                    event.poster
                }
                eventTypes={event.eventTypes}
                inputRef={lastElementRef}
                date={new Date(event.date).toDateString()}
                />
}

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

    return (
        <>
            <div
                className={`grid sm:grid-cols-[repeat(2,260px)] lg:grid-cols-[repeat(3,260px)] xl:grid-cols-[repeat(4,260px)] gap-4 place-content-center ${
                    events.length ? '' : ''
                }`}
            >
                {events.map((event: any, i: number) =>
                          events.length === i + 1 ? (
                              <CardEventLoc event={event} lastElementRef={lastBookElementRef} />
                          ) : (
                              <CardEventLoc event={event} />
                          )
                      )}
            </div>
            {/* {events.length <= 0 && !isLoading && !error && <div>No Event yet</div>} */}
            {isLoading && <div className='flex justify-center mt-4'>Loading...</div>}
            {!isLoading && error && <div className='flex justify-center mt-4'>Error get data</div>}
        </>
    );
};

export default Events;
