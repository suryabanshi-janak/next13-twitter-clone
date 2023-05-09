import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { formatDistanceToNowStrict } from 'date-fns';
import { AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';

import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';

import Avatar from '../Avatar';

interface PostItemProps {
  userId?: string;
  data: Record<string, any>;
}

const PostItem: React.FC<PostItemProps> = ({ userId, data }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [data.user.id, router]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [data.id, router]);

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();

      loginModal.onOpen();
    },
    [loginModal]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div
      className='border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:border-neutral-900 transition'
      onClick={goToPost}
    >
      <div className='flex flex-row items-start gap-3'>
        <Avatar userId={data.user.id} />
        <div>
          <div className='flex flex-row items-center gap-2'>
            <p
              onClick={goToUser}
              className='font-bold text-white cursor-pointer hover:underline'
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className='hidden cursor-pointer text-neutral-500 hover:underline md:block'
            >
              @{data.user.username}
            </span>
            <span className='text-sm text-neutral-500'>{createdAt}</span>
          </div>
          <div className='mt-1 text-white'>{data.body}</div>
          <div className='flex flex-row items-center gap-10 mt-3'>
            <div className='flex flex-row items-center gap-2 transition cursor-pointer text-neutral-500 hover:text-sky-500'>
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className='flex flex-row items-center gap-2 transition cursor-pointer text-neutral-500 hover:text-red-500'
            >
              <AiOutlineHeart size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostItem;
