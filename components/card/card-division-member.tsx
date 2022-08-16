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
            className={`w-full bg-white p-3.5 rounded-md border border-gray-200 shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${className}`}
        >
            
            <div className="relative aspect-[7/5] rounded-md overflow-hidden">
                {photo && <Image
                    className=""
                    src={BACKEND_MEDIA_PREFIX + photo}
                    layout="fill"
                    alt="Photo Profile"
                    objectFit="cover"
                />}
            </div>
            <div className="mt-3">
                <h3 className="text-center font-medium text-gray-900 dark:text-white">
                    {title}
                </h3>
                <p className=" text-center font-medium text-blue-700">{role}</p>
                <p className="mt-3 text-sm text-center text-gray-500 dark:text-gray-400">
                    {kelas}
                </p>
            </div>
        </div>
    );
};

export default CardDivisionMember;