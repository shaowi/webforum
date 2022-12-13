import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Modal,
} from '@mantine/core';
import { API_HOST } from '../utils/constants';
import '../App.css';
import { User } from '../types/User';
import { useForm } from '@mantine/form';

export default function Login({ setUser }: { setUser: Function }) {
  const [cacheUser, setCacheUser] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [showError, setShowError] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.trim().length >= 6
          ? null
          : 'Password must be at least 6 characters long',
    },
  });

  function submit(_: any) {
    console.log(process.env.REACT_APP_SERVICE_ID);
  }

  // const submit = async ({
  //   email,
  //   password,
  // }: {
  //   email: string;
  //   password: string;
  // }) => {
  //   const url = `${API_HOST}/login`;

  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     credentials: 'include',
  //     body: JSON.stringify({
  //       email,
  //       password,
  //     }),
  //   });

  //   const content = await response.json();
  //   if ('error' in content) {
  //     setUser(content as User);
  //     setRedirect(true);
  //   } else {
  //     setShowError(true);
  //   }
  // };

  return redirect ? (
    <Redirect to="/" />
  ) : (
    <>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Link to="/register" className="hyperlinks">
            Create account
          </Link>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => submit(values))}>
            <TextInput
              label="Email"
              placeholder="Enter your email address"
              required
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              required
              mt="md"
              {...form.getInputProps('password')}
            />
            <Group position="apart" mt="lg">
              <Checkbox
                label="Remember me"
                sx={{ lineHeight: 1 }}
                checked={cacheUser}
                onChange={(e) => setCacheUser(e.currentTarget.checked)}
              />
              <Link to="/resetpassword" className="hyperlinks">
                Forgot password?
              </Link>
            </Group>
            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
      <Modal
        opened={showError}
        onClose={() => setShowError(false)}
        title=""
        centered
      >
        <Title c="red" fw={700}>
          Error occured while signing in
        </Title>
        <Text c="red" fz="md">
          Invalid email address or password. Please try again.
        </Text>
      </Modal>
    </>
  );
}
