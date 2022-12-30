import {
  ActionIcon,
  Group,
  Tooltip,
  useMantineColorScheme
} from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

export default function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <Tooltip label="Ctrl/Cmd+j" position="right" transitionDuration={0}>
      <Group position="center" mt="xl">
        <ActionIcon
          onClick={() => toggleColorScheme()}
          color={dark ? 'yellow' : 'blue'}
          size="xl"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
            color:
              theme.colorScheme === 'dark'
                ? theme.colors.yellow[4]
                : theme.colors.blue[6]
          })}
        >
          {dark ? (
            <IconSun size={20} stroke={1.5} />
          ) : (
            <IconMoonStars size={20} stroke={1.5} />
          )}
        </ActionIcon>
      </Group>
    </Tooltip>
  );
}
