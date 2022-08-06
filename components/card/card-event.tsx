import { BACKEND_MEDIA_PREFIX } from 'libs/constants';
import { EventItem } from 'models/event';
import Image from 'next/image';
import Link from 'next/link';
import { getDateShort } from 'utils/datetime';
import PictureIcon from '../icon/picture-icon';
import Tag from '../tag/tag';

export interface Props extends EventItem{
    className?: string;
    inputRef?: (node: any) => void;
}

const CardEvent = ({
    className = '',
    title,
    slug,
    poster,
    eventTypes,
    date,
    inputRef,
}: Props) => {
    return (
        <Link href={`/events/detail/${slug}`}>
            <a
                className={`block w-full h-full bg-white rounded-md border shadow-sm border-gray-300 hover:bg-gray-100 cursor-pointer overflow-hidden focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${className}`}
                ref={inputRef}
            >
                <div className="relative aspect-[4/3]">
                    {poster ? (
                        <Image
                            src={BACKEND_MEDIA_PREFIX + poster}
                            layout="fill"
                            alt="Poster"
                            objectFit="cover"
                        />
                    ) : (
                        <div className="p-10 w-full h-full bg-gray-500">
                            <PictureIcon className="w-full h-full text-gray-400" />
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
                        {getDateShort(date)}
                    </p>
                </div>
            </a>
        </Link>
    );
};

export default CardEvent;

function getOrNull<T>(item: T) {
    return item ? item : null;
}
