// import React, {SyntheticEvent, useState} from 'react';
// import {Redirect} from "react-router-dom";

// const Login = (props: { setName: (name: string) => void }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [redirect, setRedirect] = useState(false);

//     const submit = async (e: SyntheticEvent) => {
//         e.preventDefault();

//         const response = await fetch('http://localhost:8000/api/login', {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             credentials: 'include',
//             body: JSON.stringify({
//                 email,
//                 password
//             })
//         });

//         const content = await response.json();

//         setRedirect(true);
//         props.setName(content.name);
//     }

//     if (redirect) {
//         return <Redirect to="/"/>;
//     }

//     return (
//         <form onSubmit={submit}>
//             <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
//             <input type="email" className="form-control" placeholder="Email address" required
//                    onChange={e => setEmail(e.target.value)}
//             />

//             <input type="password" className="form-control" placeholder="Password" required
//                    onChange={e => setPassword(e.target.value)}
//             />

//             <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
//         </form>
//     );
// };

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';

const Login = () => {
  return (
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
        <Anchor<'a'>
          href="#"
          size="sm"
          onClick={(event) => event.preventDefault()}
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
          <Anchor<'a'>
            onClick={(event) => event.preventDefault()}
            href="#"
            size="sm"
          >
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
