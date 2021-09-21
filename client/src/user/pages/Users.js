import UsersList from '../components/UsersList';

const Users = () => {
  const users = [
    {
      id: 1,
      name: 'pooya',
      image: 'https://avatars.githubusercontent.com/u/73394809?v=4',
      posts: 25,
    },
    {
      id: 2,
      name: 'mamad',
      image: 'https://avatars.githubusercontent.com/u/73394809?v=4',
      posts: 2,
    },
    {
      id: 3,
      name: 'asal',
      image: 'https://avatars.githubusercontent.com/u/73394809?v=4',
      posts: 22,
    },
  ];
  return (
    <>
      <UsersList items={users} />
    </>
  );
};

export default Users;
