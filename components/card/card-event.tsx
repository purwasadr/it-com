import Image from 'next/image';
import Tag from '../tag/tag';

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
            className={`w-full md:w-[260px] bg-white rounded-md border border-opacity-20 border-black hover:bg-gray-100 cursor-pointer overflow-hidden dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${className}`}
        >
            <div className="relative aspect-square">
                <Image
                    className=""
                    src={poster}
                    layout="fill"
                    alt="Poster"
                    objectFit="cover"
                />
            </div>
            <div className="p-4">
                <div className="inline-flex flex-wrap -mx-1">
                    {eventTypes?.map((eventType) => (
                    <Tag key={eventType.id} caption={eventType.name} />
                    ))}
                </div>

                <h5 className="mt-2 text-md font-medium text-gray-900 dark:text-white">
                    {title}
                </h5>
                <p className="mt-4 text-xs font-medium text-gray-700 dark:text-gray-400">
                    {date}
                </p>
            </div>
        </div>
    );
};

export default CardEvent;
