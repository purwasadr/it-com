import ContactModel, { Contact } from 'models/contact';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { deleteUndefined } from 'utils';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const contacts = await ContactModel.getContacts();
        deleteUndefined(contacts);

        return {
            props: { 
                contacts: {
                    data: contacts
                }
            },
        };
    } catch (error) {
        return {
            props: {
                contacts: {
                    error: 'Error getting data'
                },
            },
        };
    }
};

interface PageProps {
    contacts: { data?: Contact[],  error?: string}
}

const ContactIndex: NextPage<PageProps> = ({ contacts }) => {
    
    return (
        <>
            <section className="flex flex-col mt-2 bg-white rounded-md shadow-md py-6 px-4">
                <h1 className="text-center">
                    About
                </h1>
                <p className="mt-4 text-lg text-center text-gray-500">
                    ITCOM adalah Organisasi atau Ekskul yang bergerak dan mempelajari tentang perkembangan
                    dan pemutakhiran teknologi di SMAN 1 Kartasura.
                </p>
                <hr className='mt-5'/>
                <p className="text-center mt-5 text-gray-500">
                    Jl. Raya Solo - Yogyakarta No.Km -11, Dusun III, Pucangan, Kec. Kartasura, Kabupaten Sukoharjo, Jawa Tengah 57168
                    <br />
                    +6285831482204
                    <br />
                    smanraitc@gmail.com
                </p>
            </section>
        </>
    );
}

export default ContactIndex;