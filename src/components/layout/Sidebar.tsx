import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';

import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarTweetButton from './SidebarTweetButton';

const Sidebar = () => {
  const items = [
    {
      label: 'Home',
      href: '/',
      icon: BsHouseFill,
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: BsBellFill,
    },
    {
      label: 'Profile',
      href: '/user/123',
      icon: FaUser,
    },
  ];

  return (
    <div className='h-full col-span-1 pr-4 md:pr-6'>
      <div className='flex flex-col items-end'>
        <div className='space-y-2 lg:w-[230px]'>
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
          <SidebarItem onClick={() => {}} label='Logout' icon={BiLogOut} />
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
