import Primary from '@/components/layouts/primary';
import Link from 'next/link';

const divisionItems: any[] = [
    {
        id: 1,
        name: 'Mage'
    },
    {
        id: 2,
        name: 'Assassins'
    },
    {
        id: 3,
        name: 'Archer'
    },
    {
        id: 4,
        name: 'Tank'
    },
]

const Divisions = () => {


    return (
        <Primary>
            <h1 className="text-2xl text-center font-monumentExtended">Division<br />IT COM GEN 9</h1>
           
            <div className="mt-6 px-4 flex flex-col items-center space-y-4">
                {
                    divisionItems.map(items => (
                        <Link key={items.id} href="#">
                            <a className="md:max-w-lg w-full rounded-lg px-6 py-4 border font-monumentExtended text-center">{items.name}</a>
                        </Link>
                    ))
                }
            </div>
        </Primary>
    );
}

export default Divisions;