import { BACKEND_MEDIA_PREFIX } from 'libs/constants';
import Image from 'next/image';

export interface Props {
    className?: string;
    title?: string;
    photo?: string;
    role?: string;
    kelas?: string;
}

const CardDivisionMember = ({
    className = '',
    title,
    photo = '/',
    role,
    kelas,
}: Props) => {
    return (
        <div
            className={`w-full md:w-[250px] bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${className}`}
        >
            <h2 className="mt-4 text-xl text-center uppercase font-bold">{role}</h2>
            <div className="relative mt-4 aspect-square">
                {photo && <Image
                    className=""
                    src={BACKEND_MEDIA_PREFIX + photo}
                    layout="fill"
                    alt="Photo Profile"
                    objectFit="cover"
                />}
            </div>
            <div className="p-4">
                <h5 className="text-center text-lg font-medium text-gray-900 dark:text-white">
                    {title}
                </h5>
                <h5 className="mt-1 text-center text-md font-medium text-gray-700 dark:text-gray-400">
                    {kelas}
                </h5>
            </div>
        </div>
    );
};

export default CardDivisionMember;