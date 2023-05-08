import useCurrentUser from '@/hooks/useCurrentUser';
import useEditModal from '@/hooks/useEditModal';
import useUser from '@/hooks/useUser';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Modal from '../Modal';
import Input from '../Input';
import ImageUpload from '../ImageUpload';

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser, mutate: mutateFetchedUser } = useUser(
    currentUser?.id
  );

  const editModal = useEditModal();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setBio(currentUser?.bio);
  }, [currentUser]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch('/api/edit', {
        name,
        username,
        profileImage,
        bio,
        coverImage,
      });
      mutateFetchedUser();

      toast.success('Upadated');
      editModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [
    bio,
    coverImage,
    editModal,
    mutateFetchedUser,
    name,
    profileImage,
    username,
  ]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image: string) => setProfileImage(image)}
        label='Upload Profile Image'
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image: string) => setCoverImage(image)}
        label='Upload Cover Image'
      />
      <Input
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder='Bio'
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      onClose={editModal.onClose}
      actionLabel='Save'
      title='Edit your profile'
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
