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
          `http://localhost:8080/api/posts/user/${userId}`
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
      prevPosts.filter(post => post._id !== deletedPostId);
    });
  };

  return (
    <>{posts && <PostList items={posts} onDeletePost={onDeleteHandler} />}</>
  );
};

export default UserPosts;
