import {
  Button,
  Container,
  Loader,
  Paper,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import TransitionModal from '../components/TransitionModal';
import { resetPassword } from '../utils/user_service';

export default function ResetPassword() {
  const [showError, setShowError] = useState(false);
  const [showChanged, setShowChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: ''
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
    }
  });

  const submit = async (values: { email: string }) => {
    setLoading(true);

    resetPassword(values)
      .then((content) => {
        if ('error' in content) {
          setShowError(true);
        } else {
          setShowChanged(true);
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
              {loading ? <Loader color="white" size="sm" /> : 'Reset Password'}
            </Button>
          </form>
        </Paper>
      </Container>

      <TransitionModal
        opened={showError}
        onClose={() => setShowError(false)}
        title="Something went wrong"
        InnerComponent={
          <Text c="red" fz="md">
            Invalid email address. Please try again.
          </Text>
        }
      />
      <TransitionModal
        opened={showChanged}
        onClose={() => navigate('/login')}
        title="Password has been reset"
        InnerComponent={
          <Text fz="md">
            Please check your email address for the new password and change it
            as soon as possible.
          </Text>
        }
      />
    </>
  );
}
