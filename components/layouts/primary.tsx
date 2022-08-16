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
            <div className="flex flex-col min-h-screen">
                <Navbar/>
                <main className={`${!noPadding ? 'max-w-6xl py-6 px-4 sm:px-6 md:px-8 mx-auto flex-1 w-full' : 'flex-1 w-full'}`}>
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
            </div>
        </>
    )
}

export default Primary;