import { Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import '../App.css';
import Nav from '../components/nav/Nav';
import HistoryPostContainer from '../components/posts/HistoryPostContainer';
import PostContainer from '../components/posts/PostContainer';
import { User } from '../types/User';
import { getCacheUser } from '../utils/user_service';
import './UserProfile';
import UserProfile from './UserProfile';

export default function Home({
  activePage,
  setActivePage
}: {
  activePage: number;
  setActivePage: Function;
}) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cache cookie user
    const token = localStorage.getItem('jwt-token');
    if (token !== null) {
      getCacheUser({ jwt_token: JSON.parse(token) })
        .then((content) => {
          if (content.hasOwnProperty('error')) {
            localStorage.removeItem('jwt-token');
            navigate('/login');
          } else {
            const curUser: User = content;
            setUser(curUser);
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('jwt-token');
          navigate('/login');
        })
        .finally(() => setLoading(false));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (loading) {
    return <Loader className="centered" />;
  }
  return (
    <div className="flex-row-container">
      <Nav
        setUser={setUser}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      {activePage === 0 ? (
        <PostContainer user={user!} />
      ) : activePage === 1 ? (
        <UserProfile user={user!} setUser={setUser} />
      ) : (
        <HistoryPostContainer user={user!} />
      )}
    </div>
  );
}
