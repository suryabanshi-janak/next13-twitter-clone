import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

import usePost from '@/hooks/usePost';

import Header from '@/components/Header';
import PostItem from '@/components/posts/PostItem';
import Form from '@/components/Form';

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, error, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className='flex items-center justify-center h-full'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    );
  }

  return (
    <div>
      <Header label='Tweet' showBackArrow />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder='Tweet your reply'
      />
    </div>
  );
};

export default PostView;
