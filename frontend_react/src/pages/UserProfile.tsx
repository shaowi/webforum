import { Button, createStyles } from '@mantine/core';
import UserCardImage from '../components/user/UserCardImage';

export default function UserProfile() {
  const mockdata = {
    user: {
      user_id: 1,
      email: 'bill@test.com',
      name: 'Bill Headbanger',
      avatarColor: 'red',
      access_type: 1,
    },

    stats: [
      {
        value: '34K',
        label: 'Viewed',
      },
      {
        value: '187',
        label: 'Liked',
      },
      {
        value: '1.6K',
        label: 'Made',
      },
    ],
  };

  const useStyles = createStyles((theme) => ({
    card: {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    avatar: {
      border: `2px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
      }`,
    },
  }));

  const { classes, theme } = useStyles();

  return (
    <div
      className="flex-col-container centered"
      style={{
        rowGap: '2rem',
      }}
    >
      <UserCardImage data={mockdata} classes={classes} theme={theme} />
      <Button
        fullWidth
        radius="md"
        mt="xl"
        size="md"
        color={theme.colorScheme === 'dark' ? undefined : 'dark'}
      >
        Change Display Name
      </Button>
      <Button
        fullWidth
        radius="md"
        mt="xl"
        size="md"
        color={theme.colorScheme === 'dark' ? undefined : 'dark'}
      >
        Change Password
      </Button>
    </div>
  );
}
