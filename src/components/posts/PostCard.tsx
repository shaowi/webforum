import { Card, createStyles, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { PostCardProps } from '../../types/Post';
import { Author } from '../../types/User';
import { getUserStatsForAPost } from '../../utils/user_service';
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

  titleHover: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
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
  addViewPost,
  addCommentPost,
  deleteCommentPost
}: {
  postCardProps: PostCardProps;
  deletePost: Function;
  userAccessType: number;
  curUser: Author;
  likeOrUnlikePost: Function;
  addViewPost: Function;
  addCommentPost: Function;
  deleteCommentPost: Function;
}) {
  const { classes, theme } = useStyles();
  const [opened, setOpened] = useState(false);
  const { post_id } = postCardProps;
  const [loading, setLoading] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUserStatsForAPost(post_id, curUser.user_id)
      .then(({ likes }) => setHasLiked(likes))
      .finally(() => setLoading(false));
  }, [curUser.user_id, post_id]);

  function likePost() {
    likeOrUnlikePost(post_id, !hasLiked).then(() => setHasLiked(!hasLiked));
  }

  if (loading) {
    return <Loader className="centered" style={{ position: 'relative' }} />;
  }

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
            addViewPost={addViewPost}
            addCommentPost={addCommentPost}
            deleteCommentPost={deleteCommentPost}
            hasLiked={hasLiked}
            likePost={likePost}
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
          addViewPost={addViewPost}
          addCommentPost={addCommentPost}
          deleteCommentPost={deleteCommentPost}
          hasLiked={hasLiked}
          likePost={likePost}
        />
      </Card>
    </>
  );
}
