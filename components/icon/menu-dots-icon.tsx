interface Props {
    className?: string;
}


const MenuDotsIcon = ({ className = '' }: Props) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512" fill="currentColor">
            <g>
                <circle cx="256" cy="53.333" r="53.333"/>
                <circle cx="256" cy="256" r="53.333"/>
                <circle cx="256" cy="458.667" r="53.333"/>
            </g>
        </svg>
    );
}

export default MenuDotsIcon;