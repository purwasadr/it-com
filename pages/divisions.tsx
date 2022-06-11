import Main from '@/components/layouts/main';

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
        <Main>
            <h1 className="mt-8 text-2xl text-center font-monumentExtended">Division<br />IT COM GEN 9</h1>
           
            <div className="mt-6 px-4 flex flex-col items-center space-y-4">
                {
                    divisionItems.map(items => (
                        <div key={items.id} className="md:max-w-lg w-full rounded-lg px-6 py-4 border font-monumentExtended text-center">{items.name}</div>
                    ))
                }
            </div>
        </Main>
    );
}

export default Divisions;