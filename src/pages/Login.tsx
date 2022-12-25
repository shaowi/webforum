import {
  Button,
  Container,
  Group,
  Loader,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import TransitionModal from '../components/TransitionModal';
import { signIn } from '../utils/user_service';

export default function Login() {
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.trim().length >= 6
          ? null
          : 'Password must be at least 6 characters long'
    }
  });

  const submit = async (values: { email: string; password: string }) => {
    setLoading(true);

    signIn(values)
      .then((content) => {
        if ('error' in content) {
          setShowError(true);
        } else {
          localStorage.setItem('jwt-token', JSON.stringify(content.jwt_token));
          navigate('/');
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
              <Link to="/resetpassword" className="hyperlinks">
                Forgot password?
              </Link>
            </Group>
            <Button fullWidth mt="xl" type="submit">
              {loading ? <Loader color="white" size="sm" /> : 'Sign in'}
            </Button>
          </form>
        </Paper>
      </Container>
      <TransitionModal
        opened={showError}
        onClose={() => setShowError(false)}
        title="Error occured while signing in"
        InnerComponent={
          <Text c="red" fz="md">
            Invalid email address or password. Please try again.
          </Text>
        }
      />
    </>
  );
}
