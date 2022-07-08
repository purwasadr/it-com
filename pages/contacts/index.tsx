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
            <h1 className="text-2xl text-center font-monumentExtended">
                Contacts
                <br />
                IT COM GEN 9
            </h1>
            <section className="flex flex-col items-center space-y-4 mt-6">
                {contacts.data?.map((item: any) => (
                    <a key={item.id} target="_blank" href={item.link ?? '#'} rel="noreferrer" className="md:max-w-lg w-full rounded-lg py-4 border font-monumentExtended text-center">
                        {item.name}
                    </a>
                ))}
            </section>
        </>
    );
}

export default ContactIndex;