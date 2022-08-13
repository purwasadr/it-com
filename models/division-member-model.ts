import axios from 'axios';
import { BACKEND_API } from 'libs/constants';
import QueryString from 'qs';
import { Result } from 'types/model';
import { toDivisionMembers } from 'utils/transform';

export interface DivisionMemberItem {
    id?: number;
    name?: string;
    photo?: string;
    role?: string;
    kelas?: string;
}

const getDivisionMembers = async (slug: string)  => {
   
    const qsQuery = QueryString.stringify(
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
    const req = await axios.get(`${BACKEND_API}/api/division-members?${qsQuery}`);

    return toDivisionMembers(req.data.data);
}

const DivisionMemberModel = {
    getDivisionMembers
}

export default DivisionMemberModel;