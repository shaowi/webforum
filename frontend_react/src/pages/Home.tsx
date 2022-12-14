import { Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../App.css';
import Nav from '../components/nav/Nav';
import PostContainer from '../components/posts/PostContainer';
import { User } from '../types/User';
import { API_HOST_USER, getRandomColors } from '../utils/constants';
import './UserProfile';
import UserProfile from './UserProfile';

export default function Home({
  activePage,
  setActivePage,
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
      const url = API_HOST_USER;
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      response.json().then((content) => {
        if (content.hasOwnProperty('error')) {
          setRedirect(true);
        } else {
          const curUser: User = content;
          curUser.avatarColor = getRandomColors();
          setUser(curUser);
        }
        setLoading(false);
      });
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
        user={user!}
        setUser={setUser}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      {activePage === 0 ? <PostContainer /> : <UserProfile user={user!} />}
    </div>
  );
}
