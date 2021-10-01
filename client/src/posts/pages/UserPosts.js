import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useHttpclient } from '../../shared/hooks/http-hook';
import PostList from '../components/PostList';

const UserPosts = () => {
  const userId = useParams().userId;
  const [posts, setPosts] = useState([]);
  const { sendRequest } = useHttpclient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/api/posts/user/${userId}`
        );
        setPosts(responseData.posts);
      } catch (err) {
        toast.error('Something went wrong, Please try again');
      }
    };

    fetchUsers();
  }, [sendRequest, userId]);

  const onDeleteHandler = deletedPostId => {
    setPosts(prevPosts => {
      return prevPosts.filter(post => post._id !== deletedPostId);
    });
    toast.success('Post deleted succesfully');
  };

  return (
    <>{posts && <PostList items={posts} onDeletePost={onDeleteHandler} />}</>
  );
};

export default UserPosts;
