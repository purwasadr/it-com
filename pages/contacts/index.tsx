import ContactModel, { Contact } from 'models/contact';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { removeUndefined } from 'utils';
import { toContacts } from 'utils/transform';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const contacts = await ContactModel.getContacts();
        
        return {
            props: removeUndefined({ 
                contacts: {
                    data: toContacts(contacts.data)
                }
            }),
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
    console.log('Contacts: ', contacts.data);
    
    return (
        <>
            <h1 className="text-2xl text-center font-monumentExtended">
                Contacts
                <br />
                IT COM GEN 9
            </h1>
            <section className="flex flex-col items-center space-y-4 mt-6">
                {contacts.data?.map((item: any) => (
                    <Link key={item.id} href={`/divisions/`}>
                        <a className="md:max-w-lg w-full rounded-lg py-4 border font-monumentExtended text-center">
                            {item.name}
                        </a>
                    </Link>
                ))}
            </section>
        </>
    );
}

export default ContactIndex;