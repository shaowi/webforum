import { Avatar, Center, Navbar, Stack } from '@mantine/core';
import { IconHistory, IconHome2, IconLogout, IconUser } from '@tabler/icons';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../../App.css';
import wfLogo from '../../assets/wf.png';
import { API_HOST_USER } from '../../utils/constants';
import ColorSchemeToggle from './ColorSchemeToggle';
import NavbarLink from './NavbarLink';

export default function Nav({
  setUser,
  activePage,
  setActivePage
}: {
  setUser: Function;
  activePage: Number;
  setActivePage: Function;
}) {
  const [redirect, setRedirect] = useState(false);
  const navIcons = [
    { icon: IconHome2, label: 'Home' },
    { icon: IconUser, label: 'Account' },
    { icon: IconHistory, label: 'History' }
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
      credentials: 'include'
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
        <Avatar size="md" src={wfLogo} alt="WebForum" />
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
