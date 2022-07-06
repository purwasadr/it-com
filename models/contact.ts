import { fetchGet } from 'libs/fetch';
import { toContacts } from 'utils/transform';

export interface Contact {
    id?: number,
    name?: string,
    link?: string
}

const getContacts = async () => {
    const req = await fetchGet(
        process.env.NEXT_PUBLIC_BACKEND_API + `/api/contacts`
    ).then((res) => res.json());

    return toContacts(req.data);
}

const ContactModel = {
    getContacts
}

export default ContactModel;