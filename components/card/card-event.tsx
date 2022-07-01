import Image from 'next/image';
import Link from 'next/link';
import Tag from '../tag/tag';

export interface Props {
    className?: string;
    title: string;
    poster: string;
    date?: string;
    eventTypes: any[];
    inputRef?: (node: any) => void;
    href?: string;
}

const CardEvent = ({
    className = '',
    title,
    poster = '/',
    eventTypes,
    date,
    inputRef,
    href = '#',
}: Props) => {
    return (
        <Link href={href} >
            <a>
                <div
                    ref={inputRef}
                    className={`w-full h-full md:w-[260px] bg-white rounded-md border border-opacity-20 border-black hover:bg-gray-100 cursor-pointer overflow-hidden dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${className}`}
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
                        {getOrNull(eventTypes.length) && (
                            <div className="inline-flex flex-wrap -mx-1">
                                {eventTypes.map((eventType) => (
                                    <Tag
                                        key={eventType.id}
                                        caption={eventType.name}
                                    />
                                ))}
                            </div>
                        )}

                        <h5 className="mt-2 font-medium text-gray-900 line-clamp-2 dark:text-white">
                            {title}
                        </h5>
                        <p className="inline-flex items-center mt-2 text-gray-700 dark:text-gray-400">
                            <svg
                                className='mb-[0.3px]'
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="13"
                                height="13"
                                fill="currentColor"
                            >
                                <path d="M18.5,2H18V1.5A1.5,1.5,0,0,0,16.5,0h0A1.5,1.5,0,0,0,15,1.5V2H9V1.5A1.5,1.5,0,0,0,7.5,0h0A1.5,1.5,0,0,0,6,1.5V2H5.5A5.5,5.5,0,0,0,0,7.5v11A5.5,5.5,0,0,0,5.5,24h13A5.5,5.5,0,0,0,24,18.5V7.5A5.5,5.5,0,0,0,18.5,2Zm0,19H5.5A2.5,2.5,0,0,1,3,18.5V10H21v8.5A2.5,2.5,0,0,1,18.5,21Z" />
                            </svg>
                            <span className="ml-[6px] text-xs font-medium">
                                {date}
                            </span>
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default CardEvent;

function getOrNull<T>(item: T) {
    return item ? item : null;
}
