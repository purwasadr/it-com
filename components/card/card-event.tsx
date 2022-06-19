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

                        <h5 className="mt-2 font-medium text-gray-900 dark:text-white">
                            {title}
                        </h5>
                        <p className="inline-flex items-center mt-2 text-gray-700 dark:text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="13"
                                height="13"
                                fill="currentColor"
                            >
                                <path d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V7A5.006,5.006,0,0,0,19,2ZM2,7A3,3,0,0,1,5,4H19a3,3,0,0,1,3,3V8H2ZM19,22H5a3,3,0,0,1-3-3V10H22v9A3,3,0,0,1,19,22Z" />
                                <circle cx="12" cy="15" r="1.5" />
                                <circle cx="7" cy="15" r="1.5" />
                                <circle cx="17" cy="15" r="1.5" />
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
