import Button from '@/components/button';
import {GetServerSideProps, NextPage} from 'next';
import Image from 'next/image';
import {deleteUndefined} from 'utils';
import EventModel, {Event} from 'models/event';
import { getDateShort } from 'utils/datetime';
import LocationIcon from '@/components/icon/location-icon';
import DateIcon from '@/components/icon/date-icon';
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const slug = String(ctx.params?.slug);

        const event = await EventModel.getEvent(slug);
        
        deleteUndefined(event);
        return {
            props: {
                event: {
                    data: event,
                },
            },
        };
    } catch (error) {
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

    return (
        <>
            <Head>
                <title key="title">{`${event.data?.title} | IT Com`}</title>
                <meta name="description" content={event.data?.description} key="description" />
            </Head>
            <section className="flex flex-col md:flex-row flex-nowrap md:space-x-8">
                <section className="w-full md:w-[70%]">
                    <figure className="relative w-full h-[200px] sm:h-[250px] lg:h-[300px] rounded-md md:rounded-lg shadow-sm md:shadow-md overflow-hidden">
                      {event.data?.poster && (<Image
                            src={process.env.NEXT_PUBLIC_BACKEND_API + event.data.poster}
                            alt="Poster Event"
                            layout="fill"
                            objectFit="cover"
                        />)}
                    </figure>
                </section>
                <section className="w-full md:w-[30%] mt-4 md:mt-0 p-4 md:p-6 bg-white rounded-md md:rounded-lg shadow-sm md:shadow-md">
                    <h2 className="text-slate-900 text-lg md:text-xl line-clamp-3">
                        {event.data?.title}
                    </h2>
                    <section className="mt-4 md:mt-7">
                        <article className="flex items-center text-gray-500 dark:text-gray-400">
                            <DateIcon className='text-blue-700 h-[16px] w-[16px]' />
                            <span className="ml-4">
                                {getDateShort(event.data?.date) ?? '-'}
                            </span>
                        </article>
                        <article className="flex items-center mt-2 text-gray-500 dark:text-gray-400">
                            <LocationIcon className="text-blue-700 h-[16px] w-[16px]" />
                            <span className="ml-4">
                                {event.data?.location}
                            </span>
                        </article>
                    </section>
                </section>
            </section>
            <section className="flex flex-col md:flex-row flex-nowrap md:space-x-8 mt-4 md:mt-6">
                <section className="w-full md:w-[70%] p-4 md:p-5 bg-white rounded-md md:rounded-lg shadow-sm md:shadow-md ">
                    <h3 className="text-base md:text-lg">Description</h3>
                    <p className="mt-2 text-slate-500 whitespace-pre-line">
                        {event.data?.description}
                    </p>
                </section>
                <section className="w-full md:w-[30%] mt-4 md:mt-0">
                    {event.data?.registerLink && 
                    (<a className="" href={event.data?.registerLink} target="_blank" rel="noreferrer">
                        <Button className="w-full" variant="fill">Register</Button>
                    </a>)} 
                </section>
            </section>
        </>
    );
};

export default EventDetail;
