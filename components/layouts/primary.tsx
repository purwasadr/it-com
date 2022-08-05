import Head from 'next/head';
import { FC, ReactNode } from 'react';
import FacebookIcon from '../icon/facebook-icon';
import InstagramIcon from '../icon/instagram-icon';
import TwitterIcon from '../icon/twitter-icon';
import Navbar from '../navbar/navbar';

interface Props {
    children: ReactNode,
    noPadding?: boolean
}

const Primary = ({ noPadding = false, children }: Props) => {
    return (
        <>
            <Head>
                <title key="title">IT Com</title>
                <meta name="description" content="IT Com adalah website yang dikelola oleh ekskul IT di SMANRA" key="description" />
                <link rel="icon" href="/favicon.ico" key="icon" />
            </Head>
            <Navbar/>
            <main className={`${!noPadding ? 'max-w-6xl min-h-screen py-6 px-5 lg:px-8 mx-auto' : ''}`}>
                {children}
            </main>
            <footer className='px-5 sm:px-8 bg-white border-t'>
                <span className="flex py-8">
                    <a className="h-[20px] w-[20px] ml-6" href="">
                        <TwitterIcon />
                    </a>
                    <a className="h-[20px] w-[20px] ml-6" href='https://facebook.com/itcsmanra' target="_blank" rel="noreferrer">
                        <FacebookIcon />
                    </a>
                    <a className="h-[20px] w-[20px] ml-6" href="https://instagram.com/itcom.smanra" target="_blank" rel="noreferrer">
                        <InstagramIcon />
                    </a>
                </span>
            </footer>
        </>
    )
}

export default Primary;