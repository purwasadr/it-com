import Link from 'next/link';
import {GetServerSideProps, NextPage} from 'next';
import { fetchGet } from 'libs/fetch';
import DivisionModel, { Division } from 'models/division';
import { deleteUndefined, removeUndefined } from 'utils';
import { toDivisions } from 'utils/transform';
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const divisions = await DivisionModel.getDivisions();
        
        deleteUndefined(divisions);
        return {
            props: { 
                divisions: {
                    data: divisions
                 }
            },
        };
    } catch (error) {
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
    divisions: { data?: Division[], error?: string }
}

const Divisions: NextPage<PageProps> = ({ divisions }) => {
    return (
        <>
            <Head>
                <title key="title">Divisions | IT Com SMAN 1 Kartasura</title>
                <meta name="description" content="Halaman yang berisi divisi-divisi apa saja yang ada di ekstrakulikuler IT SMANRA" key="description" />
            </Head>
            <h1 className="text-center">
                Division
                <br />
                IT COM GEN 9
            </h1>
            <section className="mt-6 px-4 flex flex-col items-center space-y-4">
                {divisions.data?.map((item: any) => (
                    <Link key={item.id} href={`/divisions/detail/${item.slug}`}>
                        <a className="md:max-w-lg w-full bg-white rounded-lg px-6 py-4 border text-center">
                            {item.name}
                        </a>
                    </Link>
                ))}
            </section>
        </>
    );
};

export default Divisions;
