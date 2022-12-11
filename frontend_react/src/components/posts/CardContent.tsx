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
  }: PostCardProps = postCardProps;
  const commentOnPost = () => console.log('commenting');
  const viewPost = () => setOpened(true);
  const likePost = () => console.log('like');
  const authorName = author.user_info.name;
  const authorInitials = authorName
    .split(' ')
    .map((s) => s[0])
    .join('')
    .toUpperCase();

  return (
    <>
      <Text weight={700} className={classes.title}>
        {title}
      </Text>

      <Badge mt="xs">{category}</Badge>

      <Group mt="lg">
        <Avatar
          src={null}
          alt={authorName}
          color={author.user_info.avatarColor}
        >
          {authorInitials}
        </Avatar>
        <div>
          <Text weight={500}>{authorName}</Text>
          <Text size="xs" color="dimmed">
            {author.description}
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
              className={classes.icon}
            >
              <IconEye size={16} color={theme.colors.yellow[6]} stroke={1.5} />
            </ActionIcon>
          </Group>
          <Group spacing={0}>
            <Text size="xs" color="dimmed">
              {comments}
            </Text>
            <ActionIcon
              onClick={commentOnPost}
              disabled={renderBody}
              className={classes.icon}
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
    </>
  );
}
