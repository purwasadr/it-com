import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import type {AppProps} from 'next/app';
import Primary from '@/components/layouts/primary';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';

function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter();

    return (
        <Primary noPadding={router.pathname === '/'}>
            <NextNProgress height={3} options={{ showSpinner: false }}/>
            <Component {...pageProps} />
        </Primary>
    );
}

export default MyApp;
