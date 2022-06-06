import CardEvent, { Props as CardEventProps } from '@/components/card/card-event';
import Main from '@/components/layouts/main';
import type {NextPage} from 'next';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { fetchGet } from 'libs/fetch';
import qs from 'qs';
import { ResponseToEvents } from 'libs/transform';

interface IEvent extends CardEventProps {
    id: number,
}

const upcomingEvents: any[] = [
    // {
    //     id: 1,
    //     title: 'Hahaha',
    //     poster: '/images/poster1.jpg',
    //     date: '19 April 2002',
    // },
];

const historyEvent: IEvent[] = [
    {
        id: 1,
        title: 'Hahaha',
        poster: '/images/poster1.jpg',
        date: '19 April 2002',
    },
    {
        id: 2,
        title: 'Makan-makan dibayari',
        poster: '/images/poster1.jpg',
        date: '19 April 2003',
    },
    {
        id: 3,
        title: 'Makan-makan dibayari',
        poster: '/images/poster1.jpg',
        date: '19 April 2003',
    },
    {
        id: 4,
        title: 'Makan-makan dibayari',
        poster: '/images/poster1.jpg',
        date: '19 April 2003',
    },
    {
        id: 5,
        title: 'Makan-makan dibayari',
        poster: '/images/poster1.jpg',
        date: '19 April 2003',
    },
];

interface PageProps {
    events: any
}

const Home: NextPage<PageProps> = ({ events }) => {
    // console.log('Home Page ', events.data);
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
                className={`flex p-8 space-x-8 ${
                    upcomingEvents.length > 0 ? '' : 'justify-center'
                }`}
            >
                {upcomingEvents.length > 0
                    ? upcomingEvents.map((event) => (
                          <CardEvent
                              key={event.id}
                              title={event.title}
                              poster={event.poster}
                              date={event.date}
                          />
                      ))
                    : 'No event yet'}
            </div>

            <h3 className="text-2xl mt-12 uppercase text-center font-monumentExtended">
                Event History
            </h3>

            <div className="md:flex md:justify-center md:flex-wrap md:-m-4 p-8 space-y-4">
                {events.data.map((event: any) => (
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
            <div className="h-[1000px]"></div>
        </Main>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
    const de = new Date();

    const qEvent = qs.stringify({
        populate: '*',
        filters: {
            date: {
                $lt: de.toISOString()
            }
        }
    });

    console.log('qEvent :', qEvent);

    
    console.log('Date : ', `${de.getFullYear()}-${de.getMonth()}-${de.getDate()}`);
    
    
    const fetchUrl = process.env.NEXT_PUBLIC_BACKEND_API + `/api/events?${qEvent}`

    try {
        const resEvent = await fetchGet(fetchUrl)

        const events = await resEvent.json()
        
        return {
            props:{
                events: ResponseToEvents(events)
            }
        }
    } catch (error) {
        return {
            props: {
                events: {
                    data: []
                }
            }
        }
    }
 
}