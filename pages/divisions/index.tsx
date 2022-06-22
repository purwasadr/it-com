import Link from 'next/link';
import {GetServerSideProps, NextPage} from 'next';
import { fetchGet } from 'libs/fetch';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const reqDivisions = await fetchGet(process.env.NEXT_PUBLIC_BACKEND_API + '/api/divisions?');
        const resDivisions = await reqDivisions.json();

        return {
            props: {
                divisions: resDivisions,
            },
        };

    } catch (error) {
        // console.log('divisionGssp:', error);
        
        return {
            props: {
                divisions: {
                    error: 'Error getting data'
                },
            },
        };
    }
};

interface PageProps {
    divisions: any
}

const Divisions: NextPage<PageProps> = ({ divisions }) => {
    return (
        <>
            <h1 className="text-2xl text-center font-monumentExtended">
                Division
                <br />
                IT COM GEN 9
            </h1>

            <div className="mt-6 px-4 flex flex-col items-center space-y-4">
                {divisions.data?.map((item: any) => (
                    <Link key={item.id} href={`/divisions/${item.slug}`}>
                        <a className="md:max-w-lg w-full rounded-lg px-6 py-4 border font-monumentExtended text-center">
                            {item.name}
                        </a>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Divisions;
