import {ReactNode} from 'react';

interface Props {
    type?: 'submit' | 'button' | 'reset';
    variant?: 'fill' | 'outline';
    className?: string;
    disabled?: boolean;
    children?: ReactNode;
}

const buttonClassDark =
    'dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700';

const Button = ({
    type = 'submit',
    variant = 'outline',
    className = '',
    disabled = false,
    children = '',
}: Props) => {
    const variantClas =
        variant === 'fill'
            ? 'bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-500'
            : 'text-slate-900 bg-white border border-gray-300 shadow-sm hover:bg-gray-100 focus:ring-slate-200';

    return (
        <button
            type={type}
            className={
                `${variantClas} focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium rounded-lg text-sm px-5 py-2.5 ${buttonClassDark} ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
