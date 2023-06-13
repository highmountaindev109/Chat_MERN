import { useEffect, useState } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [role, setRole] = useState('user');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/checkToken');
        if (data === 'un-auth') {
          setLoading(false);
        } else {
          if (data.role === 'admin') setRole('admin');
          if (data.role === 'guest') setRole('guest');
          if(data.gender === 'female') setGender('female');
          else setGender('female');
          if(data.avatar) setAvatar(data.avatar);
          setUsername(data.username);
          setAuth(true);
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
      }
    })();
  }, [auth]);

  const removeCurrentUser = () => {
    setAuth(false);
    setUsername('');
    setRole('user');
  };

  return { auth, setAuth, gender, avatar, username, role, loading, setLoading, removeCurrentUser };
};

export default useAuth;
