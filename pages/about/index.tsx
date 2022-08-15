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
            <h1 className="text-center">
                About
            </h1>
            <section className="mt-7 bg-white rounded-md shadow-md py-4 px-4 h-96">
                <p className="">
                    ITCOM adalah Organisasi atau Ekskul yang bergerak dan mempelajari tentang perkembangan
                    dan pemutakhiran teknologi di SMAN 1 Kartasura.
                </p>
            </section>
        </>
    );
}

export default ContactIndex;