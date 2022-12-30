import { Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import '../App.css';
import Nav from '../components/nav/Nav';
import PostContainer from '../components/posts/PostContainer';
import { CurrentUser } from '../types/User';
import { isError } from '../utils/constants';
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
  const [user, setUser] = useState<CurrentUser>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [postsType, setPostsType] = useState('');

  useEffect(() => {
    // Fetch cache cookie user
    const token = localStorage.getItem('jwt-token');
    if (token !== null) {
      getCacheUser({ jwt_token: JSON.parse(token) })
        .then((content) => {
          if (isError(content)) {
            localStorage.removeItem('jwt-token');
            navigate('/login');
          } else {
            const curUser = content as CurrentUser;
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
        setPostsType={setPostsType}
      />
      {activePage === 0 ? (
        <PostContainer
          user={user!}
          isHistory={false}
          postsType={postsType}
          setPostsType={setPostsType}
        />
      ) : activePage === 1 ? (
        <UserProfile user={user!} setUser={setUser} />
      ) : (
        <PostContainer
          user={user!}
          isHistory={true}
          postsType={postsType}
          setPostsType={setPostsType}
        />
      )}
    </div>
  );
}
