import { FaFeather } from 'react-icons/fa';

import useLoginModal from '@/hooks/useLoginModal';

const SidebarTweetButton = () => {
  const loginModal = useLoginModal();

  return (
    <div onClick={() => loginModal.onOpen()}>
      {/* small screen */}
      <div className='flex items-center justify-center p-4 mt-6 transition rounded-full cursor-pointer lg:hidden h-14 w-14 bg-sky-500 hover:bg-opacity-80'>
        <FaFeather size={24} color='white' />
      </div>

      {/* large screen */}
      <div className='hidden px-4 py-2 mt-6 rounded-full cursor-pointer lg:block bg-sky-500 hover:bg-opacity-90'>
        <p className='hidden font-semibold text-center text-white  lg:block text-[20px]'>
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
