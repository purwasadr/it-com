interface Props {
    caption: string;
}

const Tag = ({caption}: Props) => {
    return (
        <div className="inline-flex items-center mx-1 px-2 py-1 rounded-md w-fit bg-purple-200">
            <span className="text-purple-900 font-medium text-[0.7rem]">
                {caption}
            </span>
        </div>
    );
};

export default Tag;
