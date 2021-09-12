import UsersList from '../components/UsersList';

const Users = () => {
  const users = [
    {
      id: 1,
      name: 'pooya',
      image: 'imgUrl',
      posts: 25,
    },
    {
      id: 2,
      name: 'mamad',
      image: 'imgUrl',
      posts: 2,
    },
    {
      id: 3,
      name: 'asal',
      image: 'imgUrl',
      posts: 22,
    },
  ];
  return <UsersList items={users} />;
};

export default Users;
