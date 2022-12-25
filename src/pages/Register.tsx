import {
  Button,
  Container,
  Loader,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../App.css';
import TransitionModal from '../components/TransitionModal';
import { getRandomColors } from '../utils/constants';
import { signIn, signUp } from '../utils/user_service';

export default function Register() {
  const [showError, setShowError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCpError, setShowCpError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      name: ''
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.trim().length >= 6
          ? null
          : 'Password must be at least 6 characters long'
    }
  });

  const submit = async ({
    email,
    password,
    name
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    if (confirmPassword !== password) {
      setShowCpError(true);
      return;
    }
    setLoading(true);
    const newUser = {
      email,
      password,
      name,
      access_type: '1',
      avatar_color: getRandomColors()
    };

    signUp(newUser)
      .then((content) => {
        if ('error' in content) {
          setShowError(true);
        } else {
          signIn({
            email,
            password
          }).then((content) => {
            if ('error' in content) {
              navigate('/login');
            } else {
              localStorage.setItem(
                'jwt-token',
                JSON.stringify(content.jwt_token)
              );
              navigate('/');
            }
          });
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900
          })}
        >
          Your Particulars
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Please fill in your informations below
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => submit(values))}>
            <TextInput
              label="Name"
              placeholder="Enter your display name"
              required
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Email"
              placeholder="Enter your email address"
              required
              {...form.getInputProps('email')}
              mt="md"
            />
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              required
              mt="md"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Enter your password again"
              mt="md"
              value={confirmPassword}
              onChange={(e) => {
                setShowCpError(false);
                setConfirmPassword(e.currentTarget.value);
              }}
            />
            {showCpError && (
              <Text c="red" fz="xs">
                Password must match confirm password
              </Text>
            )}
            <Button fullWidth mt="xl" type="submit">
              {loading ? <Loader color="white" size="sm" /> : 'Sign Up'}
            </Button>
          </form>
        </Paper>
      </Container>
      <TransitionModal
        opened={showError}
        onClose={() => setShowError(false)}
        title="Error occured while signing up"
        InnerComponent={
          <Text c="red" fz="md">
            Email has been taken. Please try again.
          </Text>
        }
      />
    </>
  );
}
