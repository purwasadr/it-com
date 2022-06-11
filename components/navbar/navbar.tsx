import {Menu} from '@headlessui/react';
import Link from 'next/link';
import NavbarLink from './navbar-link';

interface PropsMenuLink {
    active: boolean,
    href: string,
    children: React.ReactNode,
}

const MenuLink = ({ active, href, children, ...rest }: PropsMenuLink) => (
    <Link href={href}>
        <a
            className={`${
                active
                    ? 'bg-gray-100'
                    : 'text-gray-900'
            } inline-flex w-full items-center px-4 py-3 text-sm`}
        {...rest}>
            {children}
        </a>
    </Link>
)

const Navbar = () => {

    return (
        <nav className="sticky top-0 z-10 px-2 sm:px-4 py-2.5 border-b border-gray-200 bg-white dark:bg-gray-800">
            <div className="flex flex-wrap justify-between items-center px-3 lg:px-4 mx-auto">
                <div className="flex items-center w-auto">
                    <Link href="/dashboard/posts">
                        <div className="flex items-center">
                            <span className="self-center text-xl font-regular font-monumentExtended whitespace-nowrap dark:text-white">
                                IT COM
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="hidden md:flex md:items-center">
                    <ul className="flex flex-row flex-wrap pl-4 text-sm font-medium">
                        <NavbarLink href="/" caption="Home" />
                        <NavbarLink
                            href="#"
                            caption="Organization"
                            isDropdown={true}
                        />
                        <NavbarLink href="/divisions" caption="Division" />
                        <NavbarLink href="#" caption="Contact" />
                    </ul>
                </div>
                <div className="md:hidden relative">
                    <Menu as="div">
                        <Menu.Button className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 mt-2 w-56 overflow-y-hidden divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({active}) => (
                                    <MenuLink active={active} href="/" >Home</MenuLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <MenuLink active={active} href="#">Organization</MenuLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <MenuLink active={active} href="/divisions">Divisions</MenuLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <MenuLink active={active} href="#">Contact</MenuLink>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
