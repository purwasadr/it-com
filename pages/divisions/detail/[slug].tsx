import CardDivisionMember from '@/components/card/card-division-member';
import DivisionModel, { Division } from 'models/division';
import DivisionMemberModel, { DivisionMemberItem } from 'models/division-member-model';
import {GetServerSideProps, NextPage} from 'next';
import Head from 'next/head';
import { PropData } from 'types';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const slug = ctx.params?.slug;

        if (!slug) {
            return {
                notFound: true
            }
        }
    
        const res = await Promise.all(
                [
                    DivisionModel.getDivision(slug.toString()) , 
                    DivisionMemberModel.getDivisionMembers(slug.toString())
                ]
            );
        
        console.log('res[0]', res[0]);
        
        return {
            props: {
                division: {
                    data: res[0]
                },
                divisionMembers: {
                    data: res[1]
                },
            },
        };
    } catch (error) {
        return {
            props: {
                division: {
                    error: 'Cannot fetch data'
                },
                divisionMembers: {
                    error: 'Cannot fetch data'
                }
            }
        }
    }

};

interface PropsPage {
    division: PropData<Division>;
    divisionMembers: PropData<DivisionMemberItem[]>;
}

const DivisionMember: NextPage<PropsPage> = ({division, divisionMembers}) => {
    return (
        <>
            <h1 className="text-center text-2xl">
                Division
                <br />
                {division.data?.name}
            </h1>
            <div className="flex flex-col md:flex-row md:justify-center md:flex-wrap p-8 gap-4">
                {divisionMembers.data?.map((item) => (
                    <CardDivisionMember
                        {...item}
                        className="md:flex-shrink-0"
                        key={item.id}
                        title={item.name}
                    />
                ))}
            </div>
        </>
    );
};

export default DivisionMember;
