import {Menu} from '@headlessui/react';
import Link from 'next/link';
import { forwardRef } from 'react';
import MenuDotsIcon from '../icon/menu-dots-icon';
import NavbarLink from './navbar-link';

interface PropsMenuLink {
    active: boolean,
    href: string,
    children: React.ReactNode,
}

const MenuLink = forwardRef<HTMLAnchorElement, PropsMenuLink>(({ active, href, children, ...rest }, ref) => {
    
    return (
        <Link href={href}>
            <a
                className={`${
                    active
                        ? 'bg-gray-100'
                        : 'text-gray-900'
                } block w-full items-center px-4 py-3 text-sm font-medium`}
            {...rest}>
                {children}
            </a>
        </Link>
    )
});

MenuLink.displayName = 'MenuLink'


const Navbar = () => {

    return (
        <nav className="sticky top-0 z-10 py-2.5 border-b border-gray-200 bg-white shadow-sm dark:bg-gray-800">
            <div className="flex flex-wrap max-w-[90rem] justify-between items-center px-4 sm:px-6 md:px-8 mx-auto">
                <div className="flex items-center w-auto">
                    <Link href="/">
                        <a className="flex items-center">
                            <span className="text-xl font-bold whitespace-nowrap dark:text-white">
                                IT COM
                            </span>
                        </a>
                    </Link>
                </div>
                <div className="hidden md:flex md:items-center">
                    <ul className="flex flex-row flex-wrap pl-4 text-sm font-medium">
                        <NavbarLink href="/">Home</NavbarLink>
                        <NavbarLink href="/divisions">Division</NavbarLink>
                        <NavbarLink href="/contacts">Contact</NavbarLink>
                    </ul>
                </div>
                <div className="md:hidden relative">
                    <Menu as="div">
                        <Menu.Button className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-slate-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <MenuDotsIcon className="w-6 h-6 text-slate-500 hover:text-slate-600" />
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 mt-2 w-56 overflow-y-hidden divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({active}) => (
                                    <MenuLink active={active} href="/" >Home</MenuLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <MenuLink active={active} href="/divisions">Divisions</MenuLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <MenuLink active={active} href="/contacts">Contact</MenuLink>
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
