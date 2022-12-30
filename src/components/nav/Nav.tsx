import { Avatar, Center, Navbar, Stack } from '@mantine/core';
import { IconHistory, IconHome2, IconLogout, IconUser } from '@tabler/icons';
import { useNavigate } from 'react-router';
import '../../App.css';
import wfLogo from '../../assets/wf.png';
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
  const navIcons = [
    { icon: IconHome2, label: 'Home' },
    { icon: IconUser, label: 'Account' },
    { icon: IconHistory, label: 'History' }
  ];
  const navigate = useNavigate();

  const links = navIcons.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === activePage}
      onClick={() => setActivePage(index)}
    />
  ));

  const logout = () => {
    localStorage.removeItem('jwt-token');
    setUser(undefined);
    navigate('/login');
  };

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
