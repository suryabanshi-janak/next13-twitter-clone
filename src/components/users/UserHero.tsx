import useUser from '@/hooks/useUser';
import Image from 'next/image';
import Avatar from '../Avatar';

interface UserHeroProps {
  userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);

  return (
    <div>
      <div className='relative bg-neutral-700 h-44'>
        {fetchedUser?.coverImage && (
          <Image
            fill
            src={fetchedUser.coverImage}
            alt='Cover Image'
            style={{ objectFit: 'cover' }}
          />
        )}
        <div className='absolute left-4 -bottom-16'>
          <Avatar userId={userId} hasBorder isLarge />
        </div>
      </div>
    </div>
  );
};
export default UserHero;
