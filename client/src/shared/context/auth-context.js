import { useState, createContext } from 'react';

const AuthContext = createContext({
  token: '',
  userId: '',
  isLoggedIn: false,
  login: (userId, token) => {},
  logout: () => {},
});

export const AuthContextProvider = props => {
  const initialToken = localStorage.getItem('token');
  const initialUserId = localStorage.getItem('userId');

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialUserId);

  const userIsLoggedIn = !!token;

  const loginHandler = (userId, token) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  };

  const logoutHandler = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  const contextValue = {
    token: token,
    userId: userId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
