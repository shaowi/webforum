import { Button, createStyles, Loader, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import '../App.css';
import TransitionModal from '../components/TransitionModal';
import ModalForm from '../components/user/ModalForm';
import UserCardImage from '../components/user/UserCardImage';
import { User, UserCardImageProps } from '../types/User';
import {
  changeName,
  changePassword,
  getUserStats
} from '../utils/user_service';

export default function UserProfile({
  user,
  setUser
}: {
  user: User;
  setUser: Function;
}) {
  const [changedMessage, setChangedMessage] = useState('');
  const [showChanged, setShowChanged] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showChangePwModal, setShowChangePwModal] = useState(false);
  const [showChangeNameModal, setShowChangeNameModal] = useState(false);
  const [userInfo, setUserInfo] = useState<UserCardImageProps>({
    user,
    stats: []
  });

  useEffect(() => {
    // Get and set user stats info
    const token = localStorage.getItem('jwt-token');
    if (token !== null) {
      setLoading(true);
      getUserStats({ jwt_token: JSON.parse(token) })
        .then((content) => {
          if ('error' in content) {
            setShowError(true);
          } else {
            setUserInfo({
              user,
              stats: [
                { value: content.views, label: 'Viewed' },
                { value: content.likes, label: 'Liked' },
                { value: content.mades, label: 'Made' }
              ]
            });
          }
        })
        .finally(() => setLoading(false));
    } else {
      setShowError(true);
    }
  }, [user]);

  const useStyles = createStyles((theme) => ({
    card: {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
    },

    avatar: {
      border: `2px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
      }`
    }
  }));

  const { classes, theme } = useStyles();

  async function onChangeConfirm(input: string, type: number): Promise<any> {
    setChangedMessage(
      `${type === 1 ? 'Name' : `Password`} has been changed successfully`
    );
    let data = { email: user.email };
    let res;
    if (type === 0) {
      res = changePassword(Object.assign(data, { password: input }));
      res.then((content: any) => {
        if ('error' in content) {
          setShowError(true);
        } else {
          setShowChanged(true);
          setShowChangePwModal(false);
        }
      });
    } else {
      res = changeName(Object.assign(data, { name: input }));
      res.then((content: any) => {
        if ('error' in content) {
          setShowError(true);
        } else {
          setUser((curUser: User) => {
            curUser.name = input;
            return curUser;
          });
          setShowChanged(true);
          setShowChangeNameModal(false);
        }
      });
    }
    return res;
  }

  if (loading) {
    return <Loader className="centered" />;
  }

  return (
    <>
      <div
        className="flex-col-container centered"
        style={{
          rowGap: '2rem'
        }}
      >
        <UserCardImage userInfo={userInfo} classes={classes} theme={theme} />
        <Button
          fullWidth
          radius="md"
          mt="xl"
          size="md"
          color={theme.colorScheme === 'dark' ? undefined : 'dark'}
          onClick={() => setShowChangeNameModal(true)}
        >
          Change Display Name
        </Button>
        <Button
          fullWidth
          radius="md"
          mt="xl"
          size="md"
          color={theme.colorScheme === 'dark' ? undefined : 'dark'}
          onClick={() => setShowChangePwModal(true)}
        >
          Change Password
        </Button>
      </div>

      <TransitionModal
        opened={showChangePwModal}
        onClose={() => setShowChangePwModal(false)}
        InnerComponent={
          <ModalForm
            onChangeConfirm={onChangeConfirm}
            curInput=""
            validateCondition={{
              input: (value: string) =>
                value.trim().length >= 6
                  ? null
                  : 'Password must be at least 6 characters long'
            }}
            type={0}
          />
        }
      />
      <TransitionModal
        opened={showChangeNameModal}
        onClose={() => setShowChangeNameModal(false)}
        InnerComponent={
          <ModalForm
            onChangeConfirm={onChangeConfirm}
            curInput={user?.name}
            validateCondition={{}}
            type={1}
          />
        }
      />
      <TransitionModal
        opened={showError}
        onClose={() => setShowError(false)}
        title="Error occured while fetching user info"
        InnerComponent={
          <Text c="red" fz="md">
            Something went wrong. Please refresh your browser and try again.
          </Text>
        }
      />
      <TransitionModal
        opened={showChanged}
        onClose={() => setShowChanged(false)}
        title="Changed successfully"
        InnerComponent={<Text fz="md">{changedMessage}</Text>}
      />
    </>
  );
}
