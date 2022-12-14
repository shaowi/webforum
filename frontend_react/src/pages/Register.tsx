import {
  Button,
  Container,
  Loader,
  Modal,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../App.css';
import { signIn, signUp } from '../utils/user_service';

export default function Register() {
  const [redirect, setRedirect] = useState(false);
  const [showError, setShowError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCpError, setShowCpError] = useState(false);
  const [loading, setLoading] = useState(false);

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
      access_type: '1'
    };

    signUp(newUser).then((content) => {
      if ('error' in content) {
        setShowError(true);
        setLoading(false);
      } else {
        signIn({
          email,
          password
        }).then(() => {
          setRedirect(true);
        });
      }
    });
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
              style={{
                marginTop: '16px'
              }}
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
      <Modal
        opened={showError}
        onClose={() => setShowError(false)}
        title="Error occured while signing up"
        centered
      >
        <Text c="red" fz="md">
          Email has been taken. Please try again.
        </Text>
      </Modal>
    </>
  );
}
