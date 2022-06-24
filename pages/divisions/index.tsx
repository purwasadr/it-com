import Link from 'next/link';
import {GetServerSideProps, NextPage} from 'next';
import { fetchGet } from 'libs/fetch';
import DivisionModel, { Division } from 'models/division';
import { removeUndefined } from 'utils';
import { toDivisions } from 'utils/transform';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const divisions = await DivisionModel.getDivisions();
        
        return {
            props: removeUndefined({ 
                divisions: {
                    data: toDivisions(divisions.data)
                 }
            }),
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
            <h1 className="text-2xl text-center font-monumentExtended">
                Division
                <br />
                IT COM GEN 9
            </h1>
            <section className="mt-6 px-4 flex flex-col items-center space-y-4">
                {divisions.data?.map((item: any) => (
                    <Link key={item.id} href={`/divisions/${item.slug}`}>
                        <a className="md:max-w-lg w-full rounded-lg px-6 py-4 border font-monumentExtended text-center">
                            {item.name}
                        </a>
                    </Link>
                ))}
            </section>
        </>
    );
};

export default Divisions;
