import { useEffect, useState } from 'react';
import { useHttpclient } from '../../shared/hooks/http-hook';
import UsersList from '../components/UsersList';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { sendRequest } = useHttpclient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/api/users`
        );
        console.log(process.env.REACT_APP_BASE_URL);
        setUsers(responseData.users);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      {users.length === 0 ? <h2>Loading...</h2> : <UsersList items={users} />}
    </>
  );
};

export default Users;
