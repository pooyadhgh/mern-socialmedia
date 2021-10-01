import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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
        setUsers(responseData.users);
      } catch (err) {
        toast.error('Something went wrong, Please try again');
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
