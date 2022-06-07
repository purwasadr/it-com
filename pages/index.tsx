import CardEvent, { Props as CardEventProps } from '@/components/card/card-event';
import Main from '@/components/layouts/main';
import type {NextPage} from 'next';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { fetchGet } from 'libs/fetch';
import qs from 'qs';
import { responseToEvents } from 'libs/transform';

interface IEvent extends CardEventProps {
    id: number,
}

const qEvents = (operator: string) => qs.stringify({
    populate: '*',
    filters: {
        date: {
            [operator]: new Date().toISOString()
        }
    }
});

export const getServerSideProps: GetServerSideProps = async () => {
    // console.log('Date : ', `${de.getFullYear()}-${de.getMonth()}-${de.getDate()}`);
    
    try {
        const resUpcomingEvents = await fetchGet(process.env.NEXT_PUBLIC_BACKEND_API + `/api/events?${qEvents('$gt')}`)

        const resHistoryEvents = await fetchGet(process.env.NEXT_PUBLIC_BACKEND_API + `/api/events?${qEvents('$lt')}`)

        const res = await Promise.all([resUpcomingEvents.json(), resHistoryEvents.json()]);
    
        return {
            props:{
                upcomingEvents: responseToEvents(res[0]),
                historyEvents: responseToEvents(res[1])
            }
        }
    } catch (error) {
        return {
            props: {
                upcomingEvents: {
                    data: []
                }
            }
        }
    }
}

interface PageProps {
    upcomingEvents: any,
    historyEvents: any,
}

const Home: NextPage<PageProps> = ({ upcomingEvents, historyEvents }) => {
    console.log('Home Page ', upcomingEvents);
    return (
        <Main>
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

            <h3 className="mt-12 text-2xl uppercase text-center font-monumentExtended">
                Upcoming Events
            </h3>

            <div
                className={`md:flex md:justify-center md:flex-wrap -m-4 p-8 ${
                    upcomingEvents.data.length ? '' : ''
                }`}
            >
                {upcomingEvents.data.length
                    ? upcomingEvents.data.map((event: any) => (
                        <CardEvent
                            className="flex-shrink-0 m-4"
                            key={event.id}
                            title={event.title}
                            poster={process.env.NEXT_PUBLIC_BACKEND_API + event.poster}
                            eventTypes={event.eventTypes}
                            date={new Date(event.date).toDateString()}
                        />
                      ))
                    : 'No event yet'}
            </div>

            <h3 className="text-2xl mt-12 uppercase text-center font-monumentExtended">
                Event History
            </h3>

            <div className="md:flex md:justify-center md:flex-wrap md:-m-4 p-8 space-y-4">
                {historyEvents?.data.map((event: any) => (
                    <CardEvent
                        className="flex-shrink-0 md:m-4"
                        key={event.id}
                        title={event.title}
                        poster={process.env.NEXT_PUBLIC_BACKEND_API + event.poster}
                        eventTypes={event.eventTypes}
                        date={new Date(event.date).toDateString()}
                    />
                ))}
            </div>
        </Main>
    );
};

export default Home;

