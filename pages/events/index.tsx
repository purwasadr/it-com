import CardEvent from '@/components/card/card-event';
import useEventPaging from 'hooks/useEventPaging';
import {useCallback, useRef, useState} from 'react';

const CardEventLoc = ({
    event,
    lastElementRef,
}: {
    event: any;
    lastElementRef?: (node: any) => void;
}) => {
    return <CardEvent {...event} key={event.id} inputRef={lastElementRef} />;
};

const Events = () => {
    const [pageNum, setPageNum] = useState(1);
    const {isLoading, error, events, hasMore} = useEventPaging(pageNum);

    const observer = useRef<IntersectionObserver>();
    const lastEventElementRef = useCallback(
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
            {/* sm:grid-cols-[repeat(2,260px)] lg:grid-cols-[repeat(3,260px)] xl:grid-cols-[repeat(4,260px)] */}
            <div
                className={`grid grid-cols-[repeat(auto-fit,minmax(0,260px))] gap-4 place-content-center`}
            >
                {events.map((event: any, i: number) =>
                    events.length === i + 1 ? (
                        <CardEventLoc
                            event={event}
                            lastElementRef={lastEventElementRef}
                        />
                    ) : (
                        <CardEventLoc event={event} />
                    )
                )}
            </div>
            {/* {events.length <= 0 && !isLoading && !error && <div>No Event yet</div>} */}
            {isLoading && (
                <div className="flex justify-center mt-4">Loading...</div>
            )}
            {!isLoading && error && (
                <div className="flex justify-center mt-4">Error get data</div>
            )}
        </>
    );
};

export default Events;
