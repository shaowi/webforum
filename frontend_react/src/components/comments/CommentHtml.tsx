import {
  Avatar,
  createStyles,
  Group,
  Text,
  TypographyStylesProvider,
} from '@mantine/core';
import { getNameInitials } from '../../utils/constants';
import { Comment } from '../../types/Comment';

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },

  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    '& > p:last-child': {
      marginBottom: 0,
    },
  },
}));

export default function CommentHtml({ posted_on, body, author }: Comment) {
  const { classes } = useStyles();
  const authorInitials = getNameInitials(author.name);

  return (
    <div>
      <Group>
        <Avatar
          src={null}
          alt={author.name}
          color={author.avatarColor}
          radius="xl"
        >
          {authorInitials}
        </Avatar>
        <div>
          <Text size="sm">{author.name}</Text>
          <Text size="xs" color="dimmed">
            {posted_on}
          </Text>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </TypographyStylesProvider>
    </div>
  );
}
