import { Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
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
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch cache cookie user
    (async () => {
      getCacheUser()
        .then((content) => {
          if (content.hasOwnProperty('error')) {
            setRedirect(true);
          } else {
            const curUser: User = content;
            setUser(curUser);
          }
        })
        .catch(() => setRedirect(true))
        .finally(() => setLoading(false));
    })();
  }, []);

  if (redirect) {
    return <Redirect to="/login" />;
  }
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
