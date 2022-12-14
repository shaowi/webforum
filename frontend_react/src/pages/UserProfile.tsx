import { Button, createStyles } from '@mantine/core';
import { useEffect, useState } from 'react';
import UserCardImage from '../components/user/UserCardImage';
import { User, UserCardImageProps } from '../types/User';

export default function UserProfile({ user }: { user: User }) {
  const [userInfo, setUserInfo] = useState<UserCardImageProps>({
    user,
    stats: [],
  });
  useEffect(() => {
    // Get and set user stats info
    // API_HOST_USER
  }, []);

  // const userInfo : UserCardImageProps
  // = {
  //   user,
  //   stats: [
  //     {
  //       value: '34K',
  //       label: 'Viewed',
  //     },
  //     {
  //       value: '187',
  //       label: 'Liked',
  //     },
  //     {
  //       value: '1.6K',
  //       label: 'Made',
  //     },
  //   ],
  // };

  function changeName() {}

  function changePw() {}

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
      <UserCardImage userInfo={userInfo} classes={classes} theme={theme} />
      <Button
        fullWidth
        radius="md"
        mt="xl"
        size="md"
        color={theme.colorScheme === 'dark' ? undefined : 'dark'}
        onClick={changeName}
      >
        Change Display Name
      </Button>
      <Button
        fullWidth
        radius="md"
        mt="xl"
        size="md"
        color={theme.colorScheme === 'dark' ? undefined : 'dark'}
        onClick={changePw}
      >
        Change Password
      </Button>
    </div>
  );
}
