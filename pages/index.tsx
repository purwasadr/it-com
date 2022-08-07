import CardEvent from '@/components/card/card-event';
import type {NextPage} from 'next';
import Image from 'next/image';
import {GetServerSideProps} from 'next';
import ButtonLink from '@/components/button/button-link';
import EventModel, {EventItem} from 'models/event';
import { deleteUndefined } from 'utils';
import Head from 'next/head';
import { useRef } from 'react';
import Carousel from 'react-multi-carousel';
import { PropData } from 'types/index';

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const events = await EventModel.getLatestEvents();
        
        if (events.length > 0) deleteUndefined(events);
        
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
    events: PropData<EventItem[]>;
}

const Home: NextPage<PageProps> = ({events}) => {
    const eventSliderRef = useRef<Carousel>(null);
    
    const responsive = {
        xl: {
            breakpoint: {min: 1280, max: 4000},
            items: 5,
        },
        lg: {
            breakpoint: {min: 1024, max: 1280},
            items: 4,
        },
        md: {
            breakpoint: {min: 768 , max: 1023},
            items: 3,
        },
        sm: {
            breakpoint: {min: 640, max: 768},
            items: 2,
        },
        xs: {
            breakpoint: {min: 0, max: 640},
            items: 1,
        }
    }


    return (
        <>
            <Head>
                <title key="title">IT Com SMAN 1 Kartasura</title>
                <meta name="description" content="IT Com adalah website yang dikelola oleh ekskul IT di SMANRA" key="description" />
            </Head>
            <section>
                <div className="relative w-full h-[520px]">
                    <Image
                        className="object-cover brightness-[.65]"
                        src="/images/jumbotron.jpg"
                        layout="fill"
                        alt="jumbotron"
                        priority
                    />
                    <div className="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] w-fit h-fit">
                        <h1 className="text-3xl uppercase tracking-wider text-center font-bold text-white">
                            IT Community<br />SMA Negeri 1 Kartasura
                        </h1>
                        <p className="font-medium tracking-wide text-center text-white mt-7">
                            SMA unggul, SMANRA jaya, maju bersama hebat semua !
                        </p>
                    </div>
                </div>
            </section>
            <section className="max-w-[90rem] mx-auto">
                <section>
                    <header>
                        <h1 className="mt-12 text-center">
                            Events
                        </h1>
                    </header> 
                    <section>
                        <div className="mt-6 overflow-hidden">
                            <Carousel className="sm:mx-16 !overflow-visible" autoPlay={true} rewindWithAnimation={true} partialVisible={true} itemClass={"carousel-card-event-item"} rewind={true} ref={eventSliderRef} responsive={responsive}>
                                {events.data?.map((event) => (
                                    <CardEvent
                                        {...event}
                                        className="max-w-[260px] sm:max-w-none w-full "
                                        key={event.id}
                                    />
                                    )) ?? []
                                }
                            </Carousel>
                        </div>
                        <div className="flex justify-center mt-5">
                            <ButtonLink href={'/events'} variant="outline">
                                See all events
                            </ButtonLink>
                        </div>
                    </section>
                    
                </section>
                <div className="mt-4"></div>
            </section>
        </>
    );
};

export default Home;
