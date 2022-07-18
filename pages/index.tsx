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
        const res = [
            EventModel.getUpcomingEvents(),
            EventModel.getHistoryEvents(),
        ];

        const [resUpcomingEvents, resHistoryEvents] = await Promise.all([
            res[0],
            res[1],
        ]);

        deleteUndefined(resUpcomingEvents);
        deleteUndefined(resHistoryEvents);

        return {
            props: {
                upcomingEvents: {
                    data: resUpcomingEvents
                },
                historyEvents: {
                    data: resHistoryEvents,
                },
            },
        };
    } catch (error) {
        return {
            props: {
                upcomingEvents: {
                    error: 'Cannot get data',
                },
                historyEvents: {
                    error: 'Cannot get data',
                },
            },
        };
    }
};

interface PageProps {
    upcomingEvents: {data?: EventItem[]; error?: string};
    historyEvents: {data?: EventItem[]; error?: string};
}

const Home: NextPage<PageProps> = ({upcomingEvents, historyEvents}) => {

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
                        <h3 className="text-2xl uppercase tracking-wider text-center font-monumentExtended font-extrabold text-white">
                            IT Community<br />SMA Negeri 1 Kartasura
                        </h3>
                        <p className="text-base text-center text-white mt-8">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Quidem, debitis.
                        </p>
                    </div>
                </div>
            </section>
            <section className="max-w-[90rem] mx-auto">
                <section>
                    <h3 className="mt-12 text-2xl uppercase text-center font-monumentExtended">
                        Upcoming Events
                    </h3>

                    <section
                        className={`flex flex-col md:flex-row md:justify-center md:flex-wrap p-8 gap-4`}
                    >
                        {upcomingEvents.data?.map((event) => (
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
                        {!upcomingEvents.data?.length ? (
                            <p className="text-center">No event yet</p>
                        ) : (
                            ''
                        )}
                    </section>
                </section>

                <section>
                    <h3 className="text-2xl mt-12 uppercase text-center font-monumentExtended">
                        Event History
                    </h3>

                    <section className="flex flex-col md:flex-row md:justify-center md:flex-wrap p-8 gap-4">
                        {historyEvents.data?.map((event: any) => (
                            <CardEvent
                                className="flex-shrink-0"
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
                        {!historyEvents.data?.length ? (
                            <p className="text-center">No event yet</p>
                        ) : (
                            ''
                        )}
                    </section>
                </section>
                <section>
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
