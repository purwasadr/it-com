import CardEvent from '@/components/card/card-event';
import type {NextPage} from 'next';
import Image from 'next/image';
import {GetServerSideProps} from 'next';
import ButtonLink from '@/components/button-link';
import EventModel, {EventItem} from 'models/event';
import { getDateShort } from 'utils/datetime';
import { deleteUndefined } from 'utils';
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const events = await EventModel.getLatestEvents();
        deleteUndefined(events);

        return {
            props: {
                events: {
                    data: events
                },
            },
        };
    } catch (error) {
        return {
            props: {
                events: {
                    error: 'Cannot get data',
                },
            },
        };
    }
};

interface PageProps {
    events: {data?: EventItem[]; error?: string};
}

const Home: NextPage<PageProps> = ({events}) => {

    return (
        <>
            <Head>
                <title key="title">Home | IT Com</title>
                <meta name="description" content="IT Com adalah website yang dikelola oleh ekskul IT di SMANRA" key="description" />
            </Head>
            <section>
                <div className="relative w-full h-[520px]">
                    <Image
                        className="object-cover brightness-[.65]"
                        src="/images/jumbotron.jpg"
                        layout="fill"
                        alt="jumbotron"
                    />
                    <div className="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] w-fit h-fit">
                        <h1 className="text-3xl uppercase tracking-wider text-center font-bold text-white">
                            IT Community<br />SMA Negeri 1 Kartasura
                        </h1>
                        <p className="text-base text-center text-white mt-8">
                            SMA unggul, SMANRA jaya, maju bersama hebat semua
                        </p>
                    </div>
                </div>
            </section>
            <section className="max-w-[90rem] mx-auto">
                <section>
                    <h1 className="mt-12 text-center">
                        Events
                    </h1>

                    <section
                        className={`flex flex-col md:flex-row md:justify-center md:flex-wrap mt-4 p-5 gap-4`}
                    >
                        {events.data?.map((event) => (
                            <CardEvent
                                className="md:flex-shrink-0"
                                href={`/events/detail/${event.slug}`}
                                key={event.id}
                                title={event.title}
                                poster={
                                    event.poster ?
                                    process.env.NEXT_PUBLIC_BACKEND_API + event.poster : undefined
                                }
                                eventTypes={event.eventTypes}
                                date={getDateShort(event.date)}
                            />
                        ))}
                        {!events.data?.length ? (
                            <p className="text-center">No event yet</p>
                        ) : (
                            ''
                        )}
                    </section>
                    <div className="flex justify-center mt-4">
                        <ButtonLink href={'/events'} variant="outline">
                            See all events
                        </ButtonLink>
                    </div>
                </section>
                <div className="mt-4"></div>
            </section>
        </>
    );
};

export default Home;
