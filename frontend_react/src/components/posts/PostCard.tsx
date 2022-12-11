import {
  createStyles,
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
  Modal,
} from '@mantine/core';
import { IconHeart, IconMessage2, IconEye } from '@tabler/icons';
import { useState } from 'react';
import { PostCardProps } from '../../types/Post';
import { getRandomColors } from '../../utils/constants';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

export default function PostCard({
  image,
  category,
  title,
  likes,
  views,
  comments,
  author,
}: PostCardProps) {
  const { classes, theme } = useStyles();
  const [opened, setOpened] = useState(false);
  const commentOnPost = () => console.log('commenting');
  const viewPost = () => console.log('viewing');
  const likePost = () => console.log('like');
  const authorName = author.user_info.name;
  const authorInitials = authorName
    .split(' ')
    .map((s) => s[0])
    .join('')
    .toUpperCase();
  const avatarColor = getRandomColors();

  return (
    <Card withBorder p="lg" radius="md" className={classes.card}>
      {opened && (
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="title"
          transition="fade"
          transitionDuration={600}
          transitionTimingFunction="ease"
        >
          Some modal content
        </Modal>
      )}
      <Card.Section mb="sm">
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Badge>{category}</Badge>

      <Text weight={700} className={classes.title} mt="xs">
        {title}
      </Text>

      <Group mt="lg">
        <Avatar src={null} alt={authorName} color={avatarColor}>
          {authorInitials}
        </Avatar>
        <div>
          <Text weight={500}>{authorName}</Text>
          <Text size="xs" color="dimmed">
            {author.description}
          </Text>
        </div>
      </Group>

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
            <ActionIcon onClick={viewPost}>
              <IconEye size={16} color={theme.colors.yellow[6]} stroke={1.5} />
            </ActionIcon>
          </Group>
          <Group spacing={0}>
            <Text size="xs" color="dimmed">
              {comments}
            </Text>
            <ActionIcon onClick={commentOnPost}>
              <IconMessage2
                size={16}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
