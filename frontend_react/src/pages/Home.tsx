import '../App.css';
import { Redirect } from 'react-router-dom';
import Nav from '../components/nav/Nav';
import PostContainer from '../components/posts/PostContainer';

export default function Home({
  name,
  setName,
}: {
  name: string;
  setName: Function;
}) {
  if (name.length === 0) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="flex-container">
      <Nav name={name} setName={setName} />
      <PostContainer />
    </div>
  );
}
