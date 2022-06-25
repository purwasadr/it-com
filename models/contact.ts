import { fetchGet } from 'libs/fetch';

export interface Contact {
    id: number,
    name?: string,
}

const getContacts = () => {
    return fetchGet(
        process.env.NEXT_PUBLIC_BACKEND_API + `/api/contacts`
    ).then((res) => res.json());
}

const ContactModel = {
    getContacts
}

export default ContactModel;