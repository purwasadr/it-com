import '../styles/globals.css';
import type {AppProps} from 'next/app';
import Primary from '@/components/layouts/primary';
import { useRouter } from 'next/router';

function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter();

    return (
        <Primary noPadding={router.pathname === '/'}>
            <Component {...pageProps} />
        </Primary>
    );
}

export default MyApp;
