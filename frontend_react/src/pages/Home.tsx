import '../App.css';
import { Redirect } from 'react-router-dom';
import Nav from '../components/nav/Nav';
import PostContainer from '../components/posts/PostContainer';
import { User } from '../types/User';

export default function Home({
  user,
  setUser,
}: {
  user: User | undefined;
  setUser: Function;
}) {
  if (typeof user === 'undefined' || user.name.length === 0) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="flex-container">
      <Nav user={user} setUser={setUser} />
      <PostContainer />
    </div>
  );
}
