import Button from '@/components/button';
import Primary from '@/components/layouts/primary';
import { fetchGet } from 'libs/fetch';
import { responseToEvent } from 'libs/transform';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import qs from 'qs';

const qEvents = qs.stringify({
        populate: '*',
    });

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    try {
        const reqEvent = await fetchGet(
            process.env.NEXT_PUBLIC_BACKEND_API +
                `/api/events/${ctx.params?.id}?${qEvents}`
        );

        const resEvent = await reqEvent.json()

        console.log('resEvent:', resEvent);
        
        return {
            props: {
                event: responseToEvent(resEvent)
            },
        };
    } catch (error) {
        console.log('Error in gssp:', (error as Error).message);
        return {
            props: {
                event: {
                    error: 'Cannot get data',
                },
            },
        };
    }
};

interface PageProps {
    event: any
}

const EventDetail: NextPage<PageProps> = ({ event: { data: event } }) => {
    console.log('PageEvent:', event);

    return (
        <>
            <section className="flex flex-col md:flex-row flex-nowrap gap-x-10">
                <section className="w-full md:w-4/6">
                    <figure className="relative w-full h-[300px]">
                        <Image className="rounded-lg" src={process.env.NEXT_PUBLIC_BACKEND_API + event.poster} alt="Poster Event" layout="fill" objectFit="cover"/>
                    </figure>
                </section>
                <aside className="w-full md:w-2/6">
                    <h3 className="mt-4 text-xl font-medium text-slate-900">{event.title}</h3>
                    <article className="inline-flex items-center mt-8 text-gray-500 dark:text-gray-400">
                        <svg className="text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V7A5.006,5.006,0,0,0,19,2ZM2,7A3,3,0,0,1,5,4H19a3,3,0,0,1,3,3V8H2ZM19,22H5a3,3,0,0,1-3-3V10H22v9A3,3,0,0,1,19,22Z"/>
                            <circle cx="12" cy="15" r="1.5"/>
                            <circle cx="7" cy="15" r="1.5"/>
                            <circle cx="17" cy="15" r="1.5"/>
                        </svg>
                        <span className="ml-[6px] text-sm font-medium text-slate-900">{new Date(event.date).toDateString()}</span>
                    </article>
                    <article className="flex items-center mt-2 text-gray-500 dark:text-gray-400">
                        <svg className="text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V7A5.006,5.006,0,0,0,19,2ZM2,7A3,3,0,0,1,5,4H19a3,3,0,0,1,3,3V8H2ZM19,22H5a3,3,0,0,1-3-3V10H22v9A3,3,0,0,1,19,22Z"/>
                            <circle cx="12" cy="15" r="1.5"/>
                            <circle cx="7" cy="15" r="1.5"/>
                            <circle cx="17" cy="15" r="1.5"/>
                        </svg>
                        <span className="ml-[6px] text-sm font-medium text-slate-900">{event.location}</span>
                    </article>
                </aside>
            </section>
            <section className="flex flex-col md:flex-row flex-nowrap gap-x-10 mt-4">
                <section className="w-full md:w-4/6">
                    <h3 className="text-xl font-medium">Event Description</h3>
                    <p className="mt-2 text-sm text-slate-700">{event.description}</p>
                </section>
                <aside className="w-full md:w-2/6">
                    <h6 className="text-xs text-slate-700">HTM</h6>
                    <p className="text-xl font-medium">Free</p>
                    <Button className="mt-2 w-full">Daftar Event</Button>
                </aside>
            </section>
            
        </>
    );
}

export default EventDetail;