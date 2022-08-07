import Link from 'next/link';
import {ReactNode} from 'react';
import Button from './button';

interface Props {
    href: string;
    variant?: 'fill' | 'outline';
    type?: 'submit' | 'button' | 'reset';
    className?: string;
    disabled?: boolean;
    children: ReactNode;
}

const ButtonLink = ({
    href,
    type = 'submit',
    variant = 'fill',
    className = '',
    disabled = false,
    children,
}: Props) => {
    return (
        <Link href={href}>
            <a>
                <Button className={className} variant={variant} type={type} disabled={disabled}>{children}</Button>
            </a>
        </Link>
    );
};

export default ButtonLink;
