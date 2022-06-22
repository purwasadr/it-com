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
    variant = 'fill',
    className = '',
    disabled = false,
    children = '',
}: Props) => {
    const variantClas =
        variant === 'fill'
            ? 'bg-blue-700 text-white hover:bg-blue-900'
            : 'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100';

    return (
        <button
            type={type}
            className={
                `${variantClas} focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ${buttonClassDark} ${
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
