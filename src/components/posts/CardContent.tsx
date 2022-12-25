import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Group,
  Loader,
  MantineTheme,
  Text,
  Title,
  Tooltip
} from '@mantine/core';
import { IconEye, IconMessage2, IconTrash } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import '../../App.css';
import { PostCardProps } from '../../types/Post';
import { Author } from '../../types/User';
import { getUserStatsForAPost } from '../../utils/user_service';
import CommentContainer from '../comments/CommentContainer';
import { getNameInitials } from './../../utils/constants';

export default function CardContent({
  classes,
  theme,
  postCardProps,
  setOpened,
  renderBody,
  deletePost,
  userAccessType,
  curUser,
  likeOrUnlikePost,
  addViewPost,
  addCommentPost,
  deleteCommentPost
}: {
  postCardProps: PostCardProps;
  theme: MantineTheme;
  classes: Record<any, string>;
  setOpened: Function;
  renderBody: true | false;
  deletePost: Function;
  userAccessType: number;
  curUser: Author;
  likeOrUnlikePost: Function;
  addViewPost: Function;
  addCommentPost: Function;
  deleteCommentPost: Function;
}) {
  const {
    post_id,
    categories,
    title,
    body,
    likes,
    views,
    comments,
    author,
    description
  }: PostCardProps = postCardProps;

  const { name, email, avatar_color } = author;
  const authorInitials = getNameInitials(name);
  const [loading, setLoading] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUserStatsForAPost(post_id, curUser.user_id)
      .then(({ likes }) => setHasLiked(likes))
      .finally(() => setLoading(false));
  }, [curUser.user_id, post_id]);

  function viewPost() {
    setOpened(true);
    addViewPost(post_id);
  }

  function likePost() {
    likeOrUnlikePost(post_id, !hasLiked).then(() => setHasLiked(!hasLiked));
  }

  function onDelete() {
    setLoading(true);
    deletePost(post_id).finally(() => setLoading(false));
  }

  if (loading) {
    return <Loader className="centered" style={{ position: 'relative' }} />;
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
        <Title order={3} className={classes.title}>
          {title}
        </Title>
        {userAccessType === 1 && !renderBody && (
          <Tooltip label="Delete Post">
            <ActionIcon onClick={onDelete} className="action-icons">
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
        <Avatar src={null} alt={name} color={avatar_color} size="md">
          {authorInitials}
        </Avatar>
        <div>
          <Text weight={500} fz="md">
            {name}
          </Text>
          <Text weight={200} fz="xs">
            {email}
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
              {hasLiked ? (
                <AiFillHeart style={{ color: '#ff2825' }} />
              ) : (
                <AiOutlineHeart style={{ color: '#ff2825' }} />
              )}
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
              onClick={viewPost}
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

      {renderBody && (
        <CommentContainer
          post_id={post_id}
          userAccessType={userAccessType}
          curUser={curUser}
          addCommentPost={addCommentPost}
          deleteCommentPost={deleteCommentPost}
        />
      )}
    </>
  );
}
