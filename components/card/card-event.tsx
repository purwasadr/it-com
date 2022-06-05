import Image from 'next/image';
import { FC } from 'react';

export interface Props {
    className?: string,
    title: string,
    poster: string,
    date?: string,
}

const CardEvent: FC<Props> = ({ className = '', title, poster = '/', date }) => {
    return (
        <div className={`p-7 w-[300px] bg-white rounded-lg border border-opacity-20 border-black cursor-pointer hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${className}`}>
            <div className="relative aspect-square">
                <Image className="object-cover" src={poster} layout="fill" alt="Poster" />
            </div>
            <div className="mt-6 px-2 py-1 bg-purple-200 rounded-md w-fit">
                <span className="text-purple-900 font-medium text-sm">OSIS</span>
            </div>
            <h5 className="mt-3 text-md font-normal font-monumentExtended text-gray-900 dark:text-white">{title}</h5>
            <p className="text-xs font-medium mt-4 text-gray-700 dark:text-gray-400">{date}</p>
        </div>
    );
}

export default CardEvent;