import { Container } from '@mantine/core';
import Nav from '../components/Nav';
import PostContainer from '../components/PostContainer';

export default function Home({
  name,
  setName,
}: {
  name: string;
  setName: Function;
}) {
  return (
    <Container>
      <Nav name={name} setName={setName} />
      <PostContainer />
    </Container>
  );
}
