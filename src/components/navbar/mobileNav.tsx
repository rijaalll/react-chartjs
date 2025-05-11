import type { FC } from 'react';
import { useState } from 'react';
import data from '../../data/navbarData.json';


interface MobileNavProps {
    currentPath: string;
}

const MobileNav: FC<MobileNavProps> = ({ currentPath }) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    interface NavData {
        name: string;
        path: string;
    }
    const NavData = data;

    return (
        <div className='w-full h-auto px-2'>
            <div className='w-full h-auto flex flex-row justify-between items-center'>
                <div>
                    <p className='text-xl'>Sosmed data Chart</p>
                    <p className='text-sm text-gray-500'>analisa BIBD</p>
                </div>
                <div>
                    <button onClick={toggleMenu} className='text-2xl'>
                        <span className={`${isOpen ? 'bi-x' : 'bi-list'} bi`}></span>
                    </button>
                </div>
            </div>
        {isOpen ? (
            <div className='mt-3 flex flex-col gap-3'>
                { NavData.map((item: NavData, index: number) => (
                    <a href={item.path} key={index} className={`${currentPath === item.path ? 'text-blue-500' : 'text-black'} text-lg`}>{item.name}</a>
                ))}
            </div>
        ) : null}
        </div>
    );
};

export default MobileNav;