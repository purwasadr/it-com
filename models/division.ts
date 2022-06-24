import {fetchGet} from 'libs/fetch';

export interface Division {
    id: number;
    slug?: string;
    name?: string;
}

export function getDivisions() {
    return fetchGet(
        process.env.NEXT_PUBLIC_BACKEND_API + '/api/divisions'
    ).then((res) => res.json());
}

const DivisionModel = {
    getDivisions,
};

export default DivisionModel;
