import CardEvent, {Props as CardEventProps} from '@/components/card/card-event';
import type {NextPage} from 'next';
import Image from 'next/image';
import {GetServerSideProps} from 'next';
import {fetchGet} from 'libs/fetch';
import qs from 'qs';
import {responseToEvents} from 'libs/transform';
import ButtonLink from '@/components/button-link';

const qEvents = (operator: string) =>
    qs.stringify({
        populate: '*',
        filters: {
            date: {
                [operator]: new Date().toISOString(),
            },
        },
    });

export const getServerSideProps: GetServerSideProps = async () => {
    // console.log('Date : ', `${de.getFullYear()}-${de.getMonth()}-${de.getDate()}`);

    try {
        const reqUpcomingEvents =  fetchGet(
            process.env.NEXT_PUBLIC_BACKEND_API +
                `/api/events?${qEvents('$gt')}`
        );

        const reqHistoryEvents = fetchGet(
            process.env.NEXT_PUBLIC_BACKEND_API +
                `/api/events?${qEvents('$lt')}`
        );

        const res = await Promise.all([
            reqUpcomingEvents,
            reqHistoryEvents,
        ]);

        const [resUpcomingEvents, resHistoryEvents] = await Promise.all([res[0].json(), res[1].json()])

        return {
            props: {
                upcomingEvents: responseToEvents(resUpcomingEvents),
                historyEvents: responseToEvents(resHistoryEvents),
            },
        };
    } catch (error) {
       
        console.log('Error in gssp:', (error as Error).message);
        return {
            props: {
                upcomingEvents: {
                    data: [],
                    error: 'Cannot get data',
                },
            },
        };
    }
};

interface PageProps {
    upcomingEvents: any;
    historyEvents: any;
}

const Home: NextPage<PageProps> = ({upcomingEvents, historyEvents}) => {
    console.log('Home Page ', upcomingEvents);
    return (
        <>
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
                            IT Community <br /> SMA Negeri 1 Kartasura
                        </h3>
                        <p className="text-base text-center text-white mt-8">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Quidem, debitis.
                        </p>
                    </div>
                </div>
            </section>
            <section className="max-w-[90rem] mx-auto">
                <h3 className="mt-12 text-2xl uppercase text-center font-monumentExtended">
                    Upcoming Events
                </h3>

                <div
                    className={`flex flex-col md:flex-row md:justify-center md:flex-wrap p-8 gap-4 ${
                        upcomingEvents.data.length ? '' : ''
                    }`}
                >
                    {upcomingEvents.data.length
                        ? upcomingEvents.data.map((event: any) => (
                            <CardEvent
                                className="md:flex-shrink-0"
                                href={`/events/detail/${event.id}`}
                                key={event.id}
                                title={event.title}
                                poster={
                                    process.env.NEXT_PUBLIC_BACKEND_API +
                                    event.poster
                                }
                                eventTypes={event.eventTypes}
                                date={new Date(event.date).toDateString()}
                            />
                        ))
                        : 'No event yet'}
                </div>

                <h3 className="text-2xl mt-12 uppercase text-center font-monumentExtended">
                    Event History
                </h3>

                <div className="flex flex-col md:flex-row md:justify-center md:flex-wrap p-8 gap-4">
                    {historyEvents?.data.length
                        ? historyEvents?.data.map((event: any) => (
                            <CardEvent
                                className="flex-shrink-0"
                                href={`/events/detail/${event.id}`}
                                key={event.id}
                                title={event.title}
                                poster={
                                    process.env.NEXT_PUBLIC_BACKEND_API +
                                    event.poster
                                }
                                eventTypes={event.eventTypes}
                                date={new Date(event.date).toDateString()}
                            />
                        ))
                        : 'No Event yet'}
                </div>

                <div className="flex justify-center mt-4"> 
                    <ButtonLink href={"/events"} variant='outline'>See all events</ButtonLink>
                </div>
                <div className="mt-4"></div>
            </section>
        </>
    );
};

export default Home;
