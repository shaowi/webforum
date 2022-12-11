import { Center, Navbar, Stack } from '@mantine/core';
import { IconHome2, IconLogout, IconUser } from '@tabler/icons';
import '../../App.css';
import { User } from '../../types/User';
import { API_HOST } from '../../utils/constants';
import ColorSchemeToggle from './ColorSchemeToggle';
import NavbarLink from './NavbarLink';

export default function Nav({
  user,
  setUser,
  activePage,
  setActivePage,
}: {
  user: User | undefined;
  setUser: Function;
  activePage: Number;
  setActivePage: Function;
}) {
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
    const url = `${API_HOST}/logout`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    setUser(undefined);
  };

  return (
    <Navbar className="side-nav" p="md">
      <Center>
        <p>Logo</p>
        <p>{user ? user.name : ''}</p>
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
