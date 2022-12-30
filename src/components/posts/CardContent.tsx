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
import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Swal from 'sweetalert2';
import '../../App.css';
import { PostCardProps } from '../../types/Post';
import { CurrentUser } from '../../types/User';
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
  addViewPost,
  addCommentPost,
  deleteCommentPost,
  hasLiked,
  likePost
}: {
  postCardProps: PostCardProps;
  theme: MantineTheme;
  classes: Record<any, string>;
  setOpened: Function;
  renderBody: true | false;
  deletePost: Function;
  userAccessType: number;
  curUser: CurrentUser;
  addViewPost: Function;
  addCommentPost: Function;
  deleteCommentPost: Function;
  hasLiked: boolean;
  likePost: Function;
}) {
  const {
    post_id,
    categories,
    title,
    body,
    likes,
    views,
    comments,
    user,
    description
  }: PostCardProps = postCardProps;

  const { name, email, avatar_color } = user;
  const authorInitials = getNameInitials(name);
  const [loading, setLoading] = useState(false);

  function viewPost() {
    setOpened(true);
    addViewPost(post_id);
  }

  function onDelete() {
    Swal.fire({
      title: 'Are you sure that you want to delete the post?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        deletePost(post_id).finally(() => setLoading(false));
      }
    });
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
        {renderBody ? (
          <Title order={4} className={classes.title}>
            {title}
          </Title>
        ) : (
          <Title
            order={4}
            className={classes.title && classes.titleHover}
            onClick={viewPost}
          >
            {title}
          </Title>
        )}
        {userAccessType === 1 && !renderBody && (
          <Tooltip label="Delete Post" transitionDuration={0}>
            <ActionIcon onClick={onDelete} className="action-icons">
              <IconTrash size={20} color={theme.colors.red[8]} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        )}
      </div>

      {categories.map((cat, i) =>
        cat.length > 0 ? (
          <Badge key={cat + i} mt="xs" mr="xs">
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
          <Tooltip
            label={hasLiked ? 'Unlike this' : 'Like this'}
            position="left"
            transitionDuration={0}
          >
            <Group spacing={0}>
              <Text size="sm" color="dimmed">
                {likes}
              </Text>
              <ActionIcon onClick={() => likePost()}>
                {hasLiked ? (
                  <AiFillHeart size={20} style={{ color: '#ff2825' }} />
                ) : (
                  <AiOutlineHeart size={20} style={{ color: '#ff2825' }} />
                )}
              </ActionIcon>
            </Group>
          </Tooltip>
          <Group spacing={0}>
            <Text size="sm" color="dimmed">
              {views}
            </Text>
            <ActionIcon disabled className="action-icons">
              <IconEye size={20} color={theme.colors.yellow[8]} stroke={1.5} />
            </ActionIcon>
          </Group>
          <Group spacing={0}>
            <Text size="sm" color="dimmed">
              {comments}
            </Text>
            <ActionIcon disabled className="action-icons">
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
