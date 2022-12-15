import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Group,
  Loader,
  MantineTheme,
  Text,
  Tooltip
} from '@mantine/core';
import { IconEye, IconHeart, IconMessage2, IconTrash } from '@tabler/icons';
import { useState } from 'react';
import { PostCardProps } from '../../types/Post';
import CommentContainer from '../comments/CommentContainer';
import { getNameInitials, getRandomColors } from './../../utils/constants';

export default function CardContent({
  classes,
  theme,
  postCardProps,
  setOpened,
  renderBody,
  deletePost,
  userAccessType
}: {
  postCardProps: PostCardProps;
  theme: MantineTheme;
  classes: Record<any, string>;
  setOpened: Function;
  renderBody: true | false;
  deletePost: Function;
  userAccessType: number;
}) {
  const {
    post_id,
    categories,
    title,
    body,
    likes,
    views,
    comments,
    author_name,
    author_email,
    description
  }: PostCardProps = postCardProps;
  const commentOnPost = () => {
    setOpened(true);
  };
  const viewPost = () => setOpened(true);
  const likePost = () => {
    console.log('hi');
  };
  const authorInitials = getNameInitials(author_name);
  const [loading, setLoading] = useState(false);

  function onDelete() {
    setLoading(true);
    deletePost(post_id).then(() => setLoading(false));
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div
        className="flex-row-container"
        style={{
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}
      >
        <Text weight={700} className={classes.title}>
          {title}
        </Text>
        {userAccessType === 1 && (
          <Tooltip label="Delete Post">
            <ActionIcon
              onClick={onDelete}
              disabled={renderBody}
              className="action-icons"
            >
              <IconTrash size={20} color={theme.colors.red[8]} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        )}
      </div>

      {categories.map((cat, i) =>
        cat.length > 0 ? (
          <Badge key={cat + i} mt="xs">
            {cat}
          </Badge>
        ) : (
          ''
        )
      )}

      <Group mt="lg">
        <Avatar
          src={null}
          alt={author_name}
          color={getRandomColors()}
          size="md"
        >
          {authorInitials}
        </Avatar>
        <div>
          <Text weight={500} fz="md">
            {author_name}
          </Text>
          <Text weight={200} fz="xs">
            {author_email}
          </Text>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>

      {renderBody && (
        <Text weight={300} className={classes.body}>
          {body}
        </Text>
      )}

      <Card.Section className={classes.footer}>
        <Group position="right">
          <Group spacing={0}>
            <Text size="sm" color="dimmed">
              {likes}
            </Text>
            <ActionIcon onClick={likePost}>
              <IconHeart size={20} color={theme.colors.red[6]} stroke={1.5} />
            </ActionIcon>
          </Group>
          <Group spacing={0}>
            <Text size="sm" color="dimmed">
              {views}
            </Text>
            <ActionIcon
              onClick={viewPost}
              disabled={renderBody}
              className="action-icons"
            >
              <IconEye size={20} color={theme.colors.yellow[8]} stroke={1.5} />
            </ActionIcon>
          </Group>
          <Group spacing={0}>
            <Text size="sm" color="dimmed">
              {comments}
            </Text>
            <ActionIcon
              onClick={commentOnPost}
              disabled={renderBody}
              className="action-icons"
            >
              <IconMessage2
                size={20}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>

      {renderBody && <CommentContainer />}
    </>
  );
}
