import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Group,
  MantineTheme,
  Text,
} from '@mantine/core';
import { IconEye, IconHeart, IconMessage2 } from '@tabler/icons';
import { PostCardProps } from '../../types/Post';
import CommentContainer from '../comments/CommentContainer';
import { getNameInitials } from './../../utils/constants';

export default function CardContent({
  classes,
  theme,
  postCardProps,
  setOpened,
  renderBody,
}: {
  postCardProps: PostCardProps;
  theme: MantineTheme;
  classes: Record<any, string>;
  setOpened: Function;
  renderBody: true | false;
}) {
  const {
    category,
    title,
    body,
    likes,
    views,
    comments,
    author,
    description,
  }: PostCardProps = postCardProps;
  const commentOnPost = () => {
    setOpened(true);
  };
  const viewPost = () => setOpened(true);
  const likePost = () => {
    console.log('hi');
  };
  const authorInitials = getNameInitials(author.name);

  return (
    <>
      <Text weight={700} className={classes.title}>
        {title}
      </Text>

      <Badge mt="xs">{category}</Badge>

      <Group mt="lg">
        <Avatar src={null} alt={author.name} color={author.avatarColor}>
          {authorInitials}
        </Avatar>
        <div>
          <Text weight={500}>{author.name}</Text>
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
            <Text size="xs" color="dimmed">
              {likes}
            </Text>
            <ActionIcon onClick={likePost}>
              <IconHeart size={18} color={theme.colors.red[6]} stroke={1.5} />
            </ActionIcon>
          </Group>
          <Group spacing={0}>
            <Text size="xs" color="dimmed">
              {views}
            </Text>
            <ActionIcon
              onClick={viewPost}
              disabled={renderBody}
              className="action-icons"
            >
              <IconEye size={16} color={theme.colors.yellow[8]} stroke={1.5} />
            </ActionIcon>
          </Group>
          <Group spacing={0}>
            <Text size="xs" color="dimmed">
              {comments}
            </Text>
            <ActionIcon
              onClick={commentOnPost}
              disabled={renderBody}
              className="action-icons"
            >
              <IconMessage2
                size={16}
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
