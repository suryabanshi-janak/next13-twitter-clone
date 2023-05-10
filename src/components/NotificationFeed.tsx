import { useEffect } from 'react';
import { BsTwitter } from 'react-icons/bs';

import useCurrentUser from '@/hooks/useCurrentUser';
import useNotifications from '@/hooks/useNotifications';

const NotificationFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className='p-6 text-xl text-center text-neutral-500'>
        No Notification
      </div>
    );
  }

  return (
    <div className='flex flex-col'>
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className='flex flex-row items-center gap-4 p-6 border-b-[1px] border-neutral-800'
        >
          <BsTwitter color='white' size={32} />
          <p className='text-white'>{notification.body}</p>
        </div>
      ))}
    </div>
  );
};
export default NotificationFeed;
