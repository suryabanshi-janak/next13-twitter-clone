import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { IconType } from 'react-icons';
import { BsDot } from 'react-icons/bs';

import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';

interface SidebarItemProps {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
  alert,
}) => {
  const { data: currentUser } = useCurrentUser();
  const loginModal = useLoginModal();

  const router = useRouter();

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [onClick, auth, currentUser, href, loginModal, router]);

  return (
    <div onClick={handleClick} className='flex flex-row items-center'>
      {/* small screen */}
      <div className='relative flex items-center justify-center p-4 rounded-full cursor-pointer h-14 w-14 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden'>
        <Icon size={28} color='white' />
        {alert ? (
          <BsDot className='absolute left-0 text-sky-500 -top-4' size={70} />
        ) : null}
      </div>

      {/* large screen */}
      <div className='relative items-center hidden gap-4 p-4 rounded-full cursor-pointer lg:flex items-row hover:bg-slate-300 hover:bg-opacity-10'>
        <Icon size={24} color='white' />
        <p className='hidden text-xl text-white lg:block'>{label}</p>
        {alert ? (
          <BsDot className='absolute left-0 text-sky-500 -top-4' size={70} />
        ) : null}
      </div>
    </div>
  );
};

export default SidebarItem;
