import { useEffect, useState } from 'react';
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
        console.log(err);
      }
    };

    fetchUsers();
  }, [sendRequest, userId]);

  const onDeleteHandler = deletedPostId => {
    setPosts(prevPosts => {
      return prevPosts.filter(post => post._id !== deletedPostId);
    });
    console.log(deletedPostId);
    console.log(posts);
  };

  return (
    <>{posts && <PostList items={posts} onDeletePost={onDeleteHandler} />}</>
  );
};

export default UserPosts;
