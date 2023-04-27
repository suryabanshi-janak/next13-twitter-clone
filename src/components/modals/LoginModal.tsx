import { useCallback, useState } from 'react';

import Input from '../Input';
import Modal from '../Modal';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) return;

    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, loginModal, registerModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className='mt-4 text-center text-neutral-400'>
      <p>
        First time using twitter?
        <span
          onClick={onToggle}
          className='text-white cursor-pointer hover:underline'
        >
          {' '}
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      title='Login'
      actionLabel='Sign in'
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
