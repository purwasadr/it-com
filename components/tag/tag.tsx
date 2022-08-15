interface Props {
    caption: string;
}

const Tag = ({caption}: Props) => {
    return (
        <div className="px-2 py-1 flex rounded-md w-fit bg-blue-100 text-blue-700 font-medium text-xs">
            {caption}
        </div>
    );
};

export default Tag;
