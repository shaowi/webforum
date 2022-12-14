import { Center, Navbar, Stack, Avatar, Text } from '@mantine/core';
import { IconHome2, IconLogout, IconUser } from '@tabler/icons';
import '../../App.css';
import { User } from '../../types/User';
import { API_HOST_USER } from '../../utils/constants';
import ColorSchemeToggle from './ColorSchemeToggle';
import NavbarLink from './NavbarLink';
import wfLogo from '../../assets/wf.png';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function Nav({
  user,
  setUser,
  activePage,
  setActivePage,
}: {
  user: User;
  setUser: Function;
  activePage: Number;
  setActivePage: Function;
}) {
  const [redirect, setRedirect] = useState(false);
  const navIcons = [
    { icon: IconHome2, label: 'Home' },
    { icon: IconUser, label: 'Account' },
  ];

  const links = navIcons.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === activePage}
      onClick={() => setActivePage(index)}
    />
  ));

  const logout = async () => {
    const url = `${API_HOST_USER}/logout`;
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }).then((_) => {
      setUser(undefined);
      setRedirect(true);
    });
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }
  return (
    <Navbar className="side-nav" p="md">
      <Center>
        <Avatar size="md" src={wfLogo} alt="WebForum" color="white" />
        <Text>{user ? user.name : ''}</Text>
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>

      <Navbar.Section>
        <ColorSchemeToggle />
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconLogout} label="Logout" onClick={logout} />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
