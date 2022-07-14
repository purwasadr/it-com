import Image from 'next/image';
import Link from 'next/link';
import Tag from '../tag/tag';

export interface Props {
    className?: string;
    title?: string;
    poster?: string;
    date?: string;
    eventTypes?: any[];
    inputRef?: (node: any) => void;
    href?: string;
}

const CardEvent = ({
    className = '',
    title,
    poster,
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
                    className={`w-full h-full md:w-[260px] bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-100 cursor-pointer overflow-hidden dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${className}`}
                >
                    <div className="relative aspect-[4/3]">
                    {poster && (<Image
                            src={poster}
                            layout="fill"
                            alt="Poster"
                            objectFit="cover"
                        />)}   
                    </div>
                    <div className="p-3.5">
                        {getOrNull(eventTypes?.length) && (
                            <div className="flex flex-wrap gap-2 mb-2">
                                {eventTypes?.map((eventType) => (
                                    <Tag
                                        key={eventType.id}
                                        caption={eventType.name}
                                    />
                                ))}
                            </div>
                        )}

                        <h5 className="font-medium text-gray-900 line-clamp-2 dark:text-white">
                            {title}
                        </h5>
                        <p className="inline-flex items-center mt-1.5 text-slate-500 dark:text-gray-400">
                            <span className="text-xs">
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
