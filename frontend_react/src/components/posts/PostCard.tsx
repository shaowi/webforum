import { Card, createStyles, Modal } from '@mantine/core';
import { useState } from 'react';
import { PostCardProps } from '../../types/Post';
import CardContent from './CardContent';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  body: {
    marginTop: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  icon: {
    border: 'none !important',
    background: 'transparent !important',
  },
}));

export default function PostCard(postCardProps: PostCardProps) {
  const { classes, theme } = useStyles();
  const [opened, setOpened] = useState(false);
  // const commentOnPost = () => console.log('commenting');
  // const viewPost = () => setOpened(true);
  // const likePost = () => console.log('like');

  return (
    <Card withBorder p="lg" radius="md" className={classes.card}>
      {opened && (
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          transition="fade"
          transitionDuration={600}
          transitionTimingFunction="ease"
        >
          <CardContent
            classes={classes}
            theme={theme}
            postCardProps={postCardProps}
            setOpened={setOpened}
            renderBody={true}
          />
        </Modal>
      )}
      <CardContent
        classes={classes}
        theme={theme}
        postCardProps={postCardProps}
        setOpened={setOpened}
        renderBody={false}
      />
    </Card>
  );
}
