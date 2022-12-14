import {
  Button,
  Container,
  Modal,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { API_HOST_USER } from '../utils/constants';
import '../App.css';

export default function ResetPassword() {
  const [showError, setShowError] = useState(false);
  const [showChanged, setShowChanged] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const submit = async ({ email }: { email: string }) => {
    const url = `${API_HOST_USER}/resetpassword`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email,
      }),
    });

    const content = await response.json();
    if ('error' in content) {
      setShowError(true);
    } else {
      setShowChanged(true);
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Reset your password
        </Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => submit(values))}>
            <TextInput
              label="Email"
              placeholder="Enter your email address"
              required
              {...form.getInputProps('email')}
            />
            <Button fullWidth mt="xl" type="submit">
              Reset Password
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
          Error occured
        </Title>
        <Text c="red" fz="md">
          Invalid email address. Please try again.
        </Text>
      </Modal>
      <Modal
        opened={showChanged}
        onClose={() => setRedirect(true)}
        title="Password has been reset"
      >
        <Text fz="md">
          Please check your email address for the new password and change it as
          soon as possible.
        </Text>
      </Modal>
    </>
  );
}
