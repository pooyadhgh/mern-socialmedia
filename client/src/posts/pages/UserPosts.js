import PostList from '../components/PostList';
import { useParams } from 'react-router-dom';

const UserPosts = () => {
  const userId = useParams().userId;
  const posts = [
    {
      id: 1,
      image: 'https://static-cse.canva.com/image/3823/Teal17.6f16e050.png',
      title: 'hi',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro aspernatur, libero quibusdam facilis, eius nisi eveniet in aliquam harum odit fuga, qui est sint rem quidem? Ducimus eum quis rerum.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro aspernatur, libero quibusdam facilis, eius nisi eveniet in aliquam harum odit fuga, qui est sint rem quidem? Ducimus eum quis rerum.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro aspernatur, libero quibusdam facilis, eius nisi eveniet in aliquam harum odit fuga, qui est sint rem quidem? Ducimus eum quis rerum.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro aspernatur, libero quibusdam facilis, eius nisi eveniet in aliquam harum odit fuga, qui est sint rem quidem? Ducimus eum quis rerum.',
      creator: 1,
    },
    {
      id: 3,
      image: 'https://avatars.githubusercontent.com/u/73394809?v=4',
      title: 'hiaaaaaa',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro aspernatur, libero quibusdam facilis, eius nisi eveniet in aliquam harum odit fuga, qui est sint rem quidem? Ducimus eum quis rerum.',
      creator: 1,
    },
    {
      id: 2,
      image: 'https://avatars.githubusercontent.com/u/73394809?v=4',
      title: 'hi2',
      description: 'desc2',
      creator: 2,
    },
    {
      id: 4,
      image: 'https://avatars.githubusercontent.com/u/73394809?v=4',
      title: 'hi2',
      description: 'desc2',
      creator: 1,
    },
  ];

  const userPosts = posts.filter(post => +post.creator === +userId);

  return <PostList items={userPosts} />;
};

export default UserPosts;
