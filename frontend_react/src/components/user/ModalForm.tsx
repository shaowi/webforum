import {
  Button,
  Group,
  Loader,
  PasswordInput,
  TextInput,
  Text
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

export default function ModalForm({
  onChangeConfirm,
  curInput,
  validateCondition,
  type
}: {
  onChangeConfirm: Function;
  curInput: string;
  validateCondition: any;
  type: number;
}) {
  const form = useForm({
    initialValues: {
      input: curInput
    },
    validate: {
      ...validateCondition
    }
  });
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCpError, setShowCpError] = useState(false);

  function onFormSubmit(input: string) {
    if (type === 0 && confirmPassword !== input) {
      setShowCpError(true);
      return;
    }
    setLoading(true);
    onChangeConfirm(input, type).finally(() => setLoading(false));
  }

  return (
    <form onSubmit={form.onSubmit(({ input }) => onFormSubmit(input))}>
      {type === 1 ? (
        <TextInput
          required
          label="New name"
          placeholder="Please enter your new name"
          mt="md"
          {...form.getInputProps('input')}
        />
      ) : (
        <>
          <PasswordInput
            label="New password"
            placeholder="Please enter your new password"
            required
            mt="md"
            {...form.getInputProps('input')}
          />
          <PasswordInput
            withAsterisk
            label="Confirm New Password"
            placeholder="Please enter your new password again"
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
        </>
      )}
      <Group position="right" mt="md">
        <Button type="submit">
          {loading ? <Loader color="white" size="sm" /> : 'Save'}
        </Button>
      </Group>
    </form>
  );
}
