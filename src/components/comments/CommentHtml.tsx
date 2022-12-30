import {
  ActionIcon,
  Avatar,
  createStyles,
  Group,
  Loader,
  Text,
  Tooltip,
  TypographyStylesProvider
} from '@mantine/core';
import { IconTrash } from '@tabler/icons';
import { useState } from 'react';
import { CommentShow } from '../../types/Comment';
import { getNameInitials } from '../../utils/constants';

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`
  },

  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm
  },

  content: {
    '& > p:last-child': {
      marginBottom: 0
    }
  }
}));

export default function CommentHtml({
  commentCardProps,
  userAccessType,
  deleteComment
}: {
  commentCardProps: CommentShow;
  userAccessType: number;
  deleteComment: Function;
}) {
  const { comment_id, created_dt, content, user } = commentCardProps;
  const { name, email, avatar_color } = user;
  const { classes, theme } = useStyles();
  const authorInitials = getNameInitials(name);
  const [loading, setLoading] = useState(false);

  function onDelete() {
    setLoading(true);
    deleteComment(comment_id).finally(() => setLoading(false));
  }

  if (loading) {
    return (
      <Loader size="sm" className="centered" style={{ position: 'relative' }} />
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <Group position="apart">
        <Group>
          <Avatar src={null} alt={name} color={avatar_color} radius="xl">
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
              {created_dt}
            </Text>
          </div>
        </Group>
        {userAccessType === 1 ? (
          <Tooltip label="Delete Comment">
            <ActionIcon onClick={onDelete} className="action-icons">
              <IconTrash size={20} color={theme.colors.red[8]} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        ) : (
          ''
        )}
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </TypographyStylesProvider>
    </div>
  );
}
