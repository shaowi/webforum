import { Card, createStyles } from '@mantine/core';
import { useState } from 'react';
import { PostCardProps } from '../../types/Post';
import { Author } from '../../types/User';
import TransitionModal from '../TransitionModal';
import CardContent from './CardContent';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`
  },

  body: {
    marginTop: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`
  }
}));

export default function PostCard({
  postCardProps,
  deletePost,
  userAccessType,
  curUser,
  likeOrUnlikePost,
  addViewPost
}: {
  postCardProps: PostCardProps;
  deletePost: Function;
  userAccessType: number;
  curUser: Author;
  likeOrUnlikePost: Function;
  addViewPost: Function;
}) {
  const { classes, theme } = useStyles();
  const [opened, setOpened] = useState(false);
  // const commentOnPost = () => console.log('commenting');
  // const viewPost = () => setOpened(true);
  // const likePost = () => console.log('like');

  return (
    <>
      <TransitionModal
        opened={opened}
        onClose={() => setOpened(false)}
        size="xl"
        transition="rotate-left"
        InnerComponent={
          <CardContent
            classes={classes}
            theme={theme}
            postCardProps={postCardProps}
            setOpened={setOpened}
            renderBody={true}
            deletePost={deletePost}
            userAccessType={userAccessType}
            curUser={curUser}
            likeOrUnlikePost={likeOrUnlikePost}
            addViewPost={addViewPost}
          />
        }
      />
      <Card withBorder p="lg" radius="md" className={classes.card}>
        <CardContent
          classes={classes}
          theme={theme}
          postCardProps={postCardProps}
          setOpened={setOpened}
          renderBody={false}
          deletePost={deletePost}
          userAccessType={userAccessType}
          curUser={curUser}
          likeOrUnlikePost={likeOrUnlikePost}
          addViewPost={addViewPost}
        />
      </Card>
    </>
  );
}
