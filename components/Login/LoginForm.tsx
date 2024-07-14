'use client'

import { login, signup } from '@/app/(withSideBar)/login/actions'

import { useToggle, upperFirst } from '@mantine/hooks';
import { FormErrors, useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Box,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import { GoogleButton } from './GoogleButton';
import { TwitterButton } from './TwitterButton';
import { notifications } from '@mantine/notifications';

export default function LoginForm({ props, next }: { props: PaperProps, next: string }) {

  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      terms: true,
      next: next,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
      terms: (val) => (val ? null : 'You should accept terms and conditions'),
    },
  });

  const handleSubmit = (formData: any) => {
    if (type === 'login') {
      login(formData).then((err) => {
        if (err) {
          notifications.show({
            title: 'Login failed',
            message: err,
            autoClose: 2000,
          })
        }
      });
    } else {
      signup(formData).then((err) => {
        if (err) {
          notifications.show({
            title: 'Signup failed',
            message: err,
            autoClose: 2000,
          })
        }
      });
    }
  }

  const handleValidationError = (error: FormErrors) => {
    console.log(error);
    notifications.show({
      title: 'Invalid input',
      message: "Please check your input and try again",
      autoClose: 2000,
    })
  }

  return (
    <Box
      className='min-w-80 min-h-80 flex justify-center items-center pt-12 md:pt-24'>
      <Paper className="max-w-96" radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          Welcome to fablette, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(handleSubmit, handleValidationError)}>
          <Stack>

            <TextInput
              required
              label="Email"
              placeholder="Email address"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
              radius="md"
            />

            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Box>
  );
}