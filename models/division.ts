import axios from 'axios';
import { BACKEND_API } from 'libs/constants';
import QueryString from 'qs';
import { toDivision, toDivisions } from 'utils/transform';

export interface Division extends DivisionItem {
}

export interface DivisionItem {
    id?: number;
    slug?: string;
    name?: string;
}

export async function getDivisions() {
    const req = await axios.get(
        BACKEND_API + '/api/divisions'
    );

    return toDivisions(req.data.data);
}

export const getDivision = async (slug: string) => {
    const query = QueryString.stringify(
        {
            filters: {
                slug: {
                    $eq: slug,
                },
            },
        },
        {encodeValuesOnly: true}
    );

    const req = await axios.get(BACKEND_API + '/api/divisions?' + query);
    const resData = req.data.data[0];

    if (!resData) {
        throw('Data not found');
    }
    
    return toDivision(resData);
    
}

const DivisionModel = {
    getDivisions,
    getDivision
};

export default DivisionModel;
