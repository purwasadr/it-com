import Button from '@/components/button';
import { toEvent } from 'utils/transform';
import {GetServerSideProps, NextPage} from 'next';
import Image from 'next/image';
import qs from 'qs';
import {removeUndefined} from 'utils';
import EventModel, {Event} from 'models/event';

const qEvents = qs.stringify({
    populate: '*',
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const id = Number(ctx.params?.id)
        if (isNaN(id)) return {
            notFound: true,
        }

        const event = await EventModel.getEvent(id);

        console.log('resEvent:', event);

        return {
            props: removeUndefined({
                event: {
                    data: toEvent(event.data),
                },
            }),
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
    event: {data?: Event; error?: string};
}

const EventDetail: NextPage<PageProps> = ({event}) => {
    console.log('PageEvent:', event);

    return (
        <>
            <section className="flex flex-col md:flex-row flex-nowrap gap-x-10">
                <section className="w-full md:w-4/6">
                    <figure className="relative w-full h-[300px]">
                        <Image
                            className="rounded-lg"
                            src={
                                event.data?.poster
                                    ? process.env.NEXT_PUBLIC_BACKEND_API +
                                      event.data?.poster
                                    : ''
                            }
                            alt="Poster Event"
                            layout="fill"
                            objectFit="cover"
                        />
                    </figure>
                </section>
                <aside className="w-full md:w-2/6">
                    <h3 className="mt-4 text-xl font-medium text-slate-900">
                        {event.data?.title}
                    </h3>
                    <article className="inline-flex items-center mt-8 text-gray-500 dark:text-gray-400">
                        <svg
                            className="text-blue-700"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="currentColor"
                        >
                            <path d="M18.5,2H18V1.5A1.5,1.5,0,0,0,16.5,0h0A1.5,1.5,0,0,0,15,1.5V2H9V1.5A1.5,1.5,0,0,0,7.5,0h0A1.5,1.5,0,0,0,6,1.5V2H5.5A5.5,5.5,0,0,0,0,7.5v11A5.5,5.5,0,0,0,5.5,24h13A5.5,5.5,0,0,0,24,18.5V7.5A5.5,5.5,0,0,0,18.5,2Zm0,19H5.5A2.5,2.5,0,0,1,3,18.5V10H21v8.5A2.5,2.5,0,0,1,18.5,21Z" />
                        </svg>

                        <span className="ml-[6px] text-sm font-medium text-slate-900">
                            {event.data?.date
                                ? new Date(event.data?.date).toDateString()
                                : '-'}
                        </span>
                    </article>
                    <article className="flex items-center mt-2 text-gray-500 dark:text-gray-400">
                        <svg
                            className="text-blue-700"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="currentColor"
                        >
                            <path d="M12,0A10.513,10.513,0,0,0,1.5,10.5c0,2.826,2.2,6.766,6.541,11.709a5.275,5.275,0,0,0,7.92,0C20.3,17.267,22.5,13.327,22.5,10.5A10.513,10.513,0,0,0,12,0Zm1.706,20.231a2.33,2.33,0,0,1-3.412,0c-3.683-4.195-5.8-7.742-5.8-9.73a7.5,7.5,0,0,1,15,0C19.5,12.489,17.389,16.036,13.706,20.231Z" />
                            <path d="M12,6.055a4.363,4.363,0,1,0,4.363,4.363A4.368,4.368,0,0,0,12,6.055Zm0,5.726a1.363,1.363,0,1,1,1.363-1.363A1.364,1.364,0,0,1,12,11.781Z" />
                        </svg>
                        <span className="ml-[6px] text-sm font-medium text-slate-900">
                            {event.data?.location}
                        </span>
                    </article>
                </aside>
            </section>
            <section className="flex flex-col md:flex-row flex-nowrap gap-x-10 mt-4">
                <section className="w-full md:w-4/6">
                    <h3 className="text-xl font-medium">Event Description</h3>
                    <p className="mt-2 text-sm text-slate-700">
                        {event.data?.description}
                    </p>
                </section>
                <aside className="w-full md:w-2/6">
                    <h6 className="text-xs text-slate-700">HTM</h6>
                    <p className="text-xl font-medium">Free</p>
                    <Button className="mt-2 w-full">Daftar Event</Button>
                </aside>
            </section>
        </>
    );
};

export default EventDetail;
