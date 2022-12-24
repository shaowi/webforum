import { Avatar, Card, Group, MantineTheme, Text } from '@mantine/core';
import { UserCardImageProps } from '../../types/User';
import { getNameInitials } from '../../utils/constants';

export default function UserCardImage({
  userInfo,
  classes,
  theme
}: {
  userInfo: UserCardImageProps;
  classes: any;
  theme: MantineTheme;
}) {
  const { user, stats } = userInfo;
  const { email, name, avatar_color, access_type } = user;
  const authorInitials = getNameInitials(name);

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text align="center" size="lg" weight={500}>
        {stat.value}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {stat.label}
      </Text>
    </div>
  ));
  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <Card.Section
        sx={{
          backgroundColor: theme.colorScheme === 'dark' ? 'white' : 'black',
          height: 140
        }}
      />
      <Avatar
        src={null}
        alt={name}
        color={avatar_color}
        variant="filled"
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      >
        {authorInitials}
      </Avatar>
      <Text align="center" size="lg" weight={500} mt="sm">
        {name}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {email}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {access_type === 1 ? 'Administrator' : 'User'}
      </Text>
      <Text align="center" size="lg" weight={500} mt="sm">
        Posts You Have
      </Text>
      <Group mt="md" position="center" spacing={30}>
        {items}
      </Group>
    </Card>
  );
}
