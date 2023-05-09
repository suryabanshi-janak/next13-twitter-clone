import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import usePosts from '@/hooks/usePosts';

import Button from './Button';
import Avatar from './Avatar';

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();

  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post('/api/posts', { body });

      toast.success('Tweet Created');

      setBody('');
      mutatePosts();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts]);

  return (
    <div className='border-b-[1px] border-neutral-800 px-5 py-2'>
      {currentUser ? (
        <div className='flex flex-row gap-4'>
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className='w-full'>
            <textarea
              disabled={isLoading}
              placeholder={placeholder}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className='disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white'
            ></textarea>
            <hr className='opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition' />
            <div className='flex flex-row justify-end mt-4'>
              <Button
                disabled={isLoading || !body}
                label='Tweet'
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className='py-8'>
          <h1 className='mb-4 text-2xl font-bold text-center text-white'>
            Welcome to Twitter
          </h1>
          <div className='flex flex-row items-center justify-center gap-4'>
            <Button label='Login' onClick={loginModal.onOpen} />
            <Button label='Register' onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};
export default Form;
