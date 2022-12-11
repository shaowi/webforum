import '../App.css';
import { Redirect } from 'react-router-dom';
import Nav from '../components/nav/Nav';
import PostContainer from '../components/posts/PostContainer';
import { User } from '../types/User';
import UserProfile from './UserProfile';
import { useState } from 'react';

export default function Home({
  user,
  setUser,
}: {
  user: User | undefined;
  setUser: Function;
}) {
  const [activePage, setActivePage] = useState(0);

  if (typeof user === 'undefined' || user.name.length === 0) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="flex-row-container">
      <Nav
        user={user}
        setUser={setUser}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      {activePage === 0 ? <PostContainer /> : <UserProfile />}
    </div>
  );
}
