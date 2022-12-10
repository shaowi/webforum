// import React from 'react';
// import {Link} from "react-router-dom";

// const Nav = (props: { name: string, setName: (name: string) => void }) => {
//     const logout = async () => {
//         await fetch('http://localhost:8000/api/logout', {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             credentials: 'include',
//         });

//         props.setName('');
//     }

//     // let menu;

//     // if (props.name === '') {
//     //     menu = (
//     //         <ul className="navbar-nav me-auto mb-2 mb-md-0">
//     //             <li className="nav-item active">
//     //                 <Link to="/login" className="nav-link">Login</Link>
//     //             </li>
//     //             <li className="nav-item active">
//     //                 <Link to="/register" className="nav-link">Register</Link>
//     //             </li>
//     //         </ul>
//     //     )
//     // } else {
//     //     menu = (
//     //         <ul className="navbar-nav me-auto mb-2 mb-md-0">
//     //             <li className="nav-item active">
//     //                 <Link to="/login" className="nav-link" onClick={logout}>Logout</Link>
//     //             </li>
//     //         </ul>
//     //     )
//     // }

//     // return (
//     //     <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
//     //         <div className="container-fluid">
//     //             <Link to="/" className="navbar-brand">Home</Link>

//     //             <div>
//     //                 {menu}
//     //             </div>
//     //         </div>
//     //     </nav>
//     // );
// };
import { Center, Navbar, Stack } from '@mantine/core';
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconLogout,
  IconSettings,
  IconUser,
} from '@tabler/icons';
import { useState } from 'react';
import ColorSchemeToggle from './ColorSchemeToggle';
import NavbarLink from './NavbarLink';

export default function Nav({
  name,
  setName,
}: {
  name: string;
  setName: Function;
}) {
  const [active, setActive] = useState(2);

  const mockdata = [
    { icon: IconHome2, label: 'Home' },
    { icon: IconGauge, label: 'Dashboard' },
    { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
    { icon: IconCalendarStats, label: 'Releases' },
    { icon: IconUser, label: 'Account' },
    { icon: IconFingerprint, label: 'Security' },
    { icon: IconSettings, label: 'Settings' },
  ];

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  const logout = async () => {
    await fetch('http://localhost:8000/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    setName('');
  };

  return (
    <Navbar width={{ base: 80 }} p="md" style={{ height: '100vh' }}>
      <Center>
        <p>Logo</p>
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
