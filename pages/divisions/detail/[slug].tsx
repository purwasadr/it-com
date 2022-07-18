import CardDivisionMember from '@/components/card/card-division-member';
import {fetchGet} from 'libs/fetch';
import {GetServerSideProps, NextPage} from 'next';
import Head from 'next/head';
import qs from 'qs';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const slug = ctx.params?.slug;
    const reqDivisionQuery = qs.stringify(
        {
            filters: {
                slug: {
                    $eq: slug,
                },
            },
        },
        {encodeValuesOnly: true}
    );

    const reqDivisionMemberQuery = qs.stringify(
        {
            filters: {
                division: {
                    slug: {
                        $eq: slug,
                    },
                },
            },
            populate: ['profile.photo'],
        },
        {encodeValuesOnly: true}
    );

    console.log('reqDivisionQuery:', reqDivisionQuery);
    console.log('reqDivisionMemberQuery:', reqDivisionMemberQuery);

    try {
        const reqDivision = await fetchGet(
            process.env.NEXT_PUBLIC_BACKEND_API +
                '/api/divisions?' +
                reqDivisionQuery
        );
        const resDivision = await reqDivision.json();

        const reqDivisionMembers = await fetchGet(
            process.env.NEXT_PUBLIC_BACKEND_API +
                '/api/division-members?' +
                reqDivisionMemberQuery
        );
        const resDivisionMembers = await reqDivisionMembers.json();

        return {
            props: {
                division: resDivision.data[0],
                divisionMembers: responseToDivisionMembers(resDivisionMembers),
            },
        };
    } catch (error) {
        return {
            props: {
                division: [],
            },
        };
    }
};

interface PropsPage {
    division?: any;
    divisionMembers?: { data: any[] };
}

const DivisionMember: NextPage<PropsPage> = ({division, divisionMembers}) => {
    return (
        <>
            <h1 className="font-monumentExtended text-center text-2xl">
                Division
                <br />
                {division.name}
            </h1>
            <div className="flex flex-col md:flex-row md:justify-center md:flex-wrap p-8 gap-4">
                {divisionMembers?.data.map((item: any) => (
                    <CardDivisionMember
                        className="md:flex-shrink-0"
                        key={item.id}
                        title={item.name}
                        photo={
                            item.photo ? process.env.NEXT_PUBLIC_BACKEND_API + item.photo : undefined
                        }
                        role={item.role}
                        kelas={item.kelas}
                    />
                ))}
            </div>
        </>
    );
};

export default DivisionMember;

interface IDivisionMember {
    id: number,
    name: string,
    photo: string,
    role: string,
    kelas: string
}

const responseToDivisionMembers = (res: any) => ({
    ...res,
    data: res.data.map((item: any) => ({
        id: item.id,
        name: item.profile?.name ? item.profile?.name : null,
        photo: item.profile?.photo.formats.medium.url ? item.profile?.photo.formats.medium.url : null,
        role: item.role,
        kelas: item.profile?.kelas ? item.profile?.kelas : null
    })),
});
