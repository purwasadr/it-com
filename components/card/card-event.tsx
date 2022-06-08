import Image from 'next/image';
import {FC} from 'react';

export interface Props {
    className?: string;
    title: string;
    poster: string;
    date?: string;
    eventTypes?: any[];
}

const CardEvent = ({
    className = '',
    title,
    poster = '/',
    eventTypes,
    date,
}: Props) => {
    return (
        <div
            className={`p-3 w-full md:w-[260px] bg-white rounded-md border border-opacity-20 border-black hover:bg-gray-100 cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${className}`}
        >
            <div className="relative aspect-square">
                <Image
                    className="object-cover"
                    src={poster}
                    layout="fill"
                    alt="Poster"
                />
            </div>
            <div className="inline-flex flex-wrap -mx-1 mt-6">
                {eventTypes?.map((eventType) => (
                    <div
                        key={eventType.id}
                        className="mx-1 px-2 py-1 rounded-md w-fit bg-purple-200"
                    >
                        <span className="text-purple-900 font-medium text-xs ">
                            {eventType.name}
                        </span>
                    </div>
                ))}
            </div>

            <h5 className="mt-2 text-md font-normal font-monumentExtended text-gray-900 dark:text-white">
                {title}
            </h5>
            <p className=" mt-4 text-xs font-medium text-gray-700 dark:text-gray-400">
                {date}
            </p>
        </div>
    );
};

export default CardEvent;
