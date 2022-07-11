import Link from 'next/link';

const contacts = [
    {
        id: 1,
        name: 'Instagram',
        
    }
]

const MenuList = () => {
    return (
        <div>
            <section className="mt-6 px-4 flex flex-col items-center space-y-4">
                {contacts?.map((item: any) => (
                    <Link key={item.id} href={`/divisions/${item.slug}`}>
                        <a className="md:max-w-lg w-full rounded-lg px-6 py-4 border font-monumentExtended text-center">
                            {item.name}
                        </a>
                    </Link>
                ))}
            </section>
        </div>
    );
}

export default MenuList;