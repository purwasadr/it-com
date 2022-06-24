import qs from 'qs';
import { useState, useEffect } from "react";
import { fetchGet } from './fetch';
import { toEvents } from '../utils/transform';

function useEventPaging(pageNum: number) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const qEvents = qs.stringify({
        populate: '*',
        pagination: {
            page: pageNum,
            pageSize: 5,
        }
    });

    const abortController = new AbortController()
    
    setIsLoading(true);
    setError(false);

    fetchGet(process.env.NEXT_PUBLIC_BACKEND_API +
        `/api/events?${qEvents}`, { signal:  abortController.signal })
        .then(res => res.json())
      .then((res) => {
        const trData = toEvents(res.data);
        setEvents((prev: any[]) => {
          // return [...prev, ...trData.data];
          return Array.from(new Map([...prev, ...trData].map(item => [item['id'], item])).values());
        });
        setHasMore(res.meta.pagination.page < res.meta.pagination.pageCount);
        setIsLoading(false);
      })
      .catch((err: any) => {
        if (abortController.signal.aborted) return
        setIsLoading(false);
        setError(err);
      });

    return () => {
        abortController.abort();
    }
  }, [pageNum]);

  return { isLoading, error, events, hasMore };
}

export default useEventPaging;