import Link from 'next/link';
import { hrtime } from 'process';
import {ReactNode} from 'react';
import { Url } from 'url';

interface Props {
    href: string;
    type?: 'submit' | 'button' | 'reset';
    className?: string;
    disabled?: boolean;
    children: ReactNode;
}

const ButtonLink = ({
    href,
    type = 'submit',
    className = '',
    disabled = false,
    children,
}: Props) => {
    return (
        <Link href={href}>
            <button
                type={type}
                className={
                    `text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${
                        disabled && 'opacity-25'
                    } ` + className
                }
                disabled={disabled}
            >
                {children}
            </button>
        </Link>
    );
};

export default ButtonLink;
