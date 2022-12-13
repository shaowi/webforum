import {
  Button,
  Container,
  Modal,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../App.css';
import { User } from '../types/User';
import { API_HOST } from '../utils/constants';

export default function Register({ setUser }: { setUser: Function }) {
  const [redirect, setRedirect] = useState(false);
  const [showError, setShowError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCpError, setShowCpError] = useState(false);

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

  const submit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    if (confirmPassword !== password) {
      setShowCpError(true);
      return;
    }
    const url = `${API_HOST}/register`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const content = await response.json();
    if ('error' in content) {
      setUser(content as User);
      setRedirect(true);
    } else {
      setShowError(true);
    }
  };

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
          Your Particulars
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Please fill in your informations below
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
            <PasswordInput
              withAsterisk
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
              <Text c="red" fz="md">
                Password must match confirm password
              </Text>
            )}

            <Button fullWidth mt="xl" type="submit">
              Sign Up
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
          Error occured while signing up
        </Title>
        <Text c="red" fz="md">
          Please try again.
        </Text>
      </Modal>
    </>
  );
}
