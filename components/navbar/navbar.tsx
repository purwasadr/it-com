import Link from 'next/link';
import { FC } from 'react';
import NavbarLink from './navbar-link';


const Navbar: FC = () => {
    return (
        <nav className="sticky top-0 z-10 bg-white border-gray-200 px-2 sm:px-4 py-2.5 border-b dark:bg-gray-800">
            <div className="flex flex-wrap justify-between items-center px-3 lg:px-4 mx-auto">
                <div className="items-center flex w-auto">
                    <Link href="/dashboard/posts">
                        <div className="flex items-center">
                            <span className="self-center text-xl font-regular font-monumentExtended whitespace-nowrap dark:text-white">
                                IT COM
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="flex items-center">
                    <ul className="flex flex-row pl-4 text-sm font-medium">
                        <NavbarLink href='#' caption="Home" />
                        <NavbarLink href="#" caption="Organization" isDropdown={true}/>
                        <NavbarLink href="#" caption="Division"/>
                        <NavbarLink href="#" caption="Contact"/>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;