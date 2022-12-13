import { Redirect } from 'react-router-dom';
import '../App.css';
import Nav from '../components/nav/Nav';
import PostContainer from '../components/posts/PostContainer';
import { User } from '../types/User';
import UserProfile from './UserProfile';

export default function Home({
  user,
  setUser,
  activePage,
  setActivePage,
}: {
  user: User | undefined;
  setUser: Function;
  activePage: number;
  setActivePage: Function;
}) {
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
