import Image from 'next/image';
import Link from 'next/link';
import PictureIcon from '../icon/picture-icon';
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
                    className={`w-full h-full md:w-[260px] bg-white rounded-md border shadow-sm border-gray-300 hover:bg-gray-100 cursor-pointer overflow-hidden dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${className}`}
                >
                    <div className="relative aspect-[4/3]">
                    {poster ? (<Image
                            src={poster}
                            layout="fill"
                            alt="Poster"
                            objectFit="cover"
                        />) : (
                            <div className="p-10 w-full h-full bg-slate-500">
                                <PictureIcon className="w-full h-full text-slate-400" />
                            </div>
                        )}   
                    </div>
                    <div className="py-4 px-3.5">
                        {getOrNull(eventTypes?.length) && (
                            <div className="flex flex-wrap gap-2 mb-3.5">
                                {eventTypes?.map((eventType) => (
                                    <Tag
                                        key={eventType.id}
                                        caption={eventType.name}
                                    />
                                ))}
                            </div>
                        )}

                        <h5 className="font-semibold text-base capsize text-gray-900 dark:text-white">
                            <span className="line-clamp-2">{title}</span>
                        </h5>
                        <p className="mt-4 font-medium text-slate-500 dark:text-gray-400 text-xs capsize">
                            {date}
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
