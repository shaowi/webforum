import { MantineTransition, Modal } from '@mantine/core';

export default function TransitionModal({
  opened,
  onClose,
  title = '',
  size = 'auto',
  transition = 'fade',
  InnerComponent
}: {
  opened: boolean;
  onClose: () => void;
  title?: string;
  size?: string;
  transition?: MantineTransition;
  InnerComponent?: any;
}) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      transition={transition}
      title={title}
      size={size}
      transitionDuration={600}
      transitionTimingFunction="ease"
      centered
    >
      {InnerComponent}
    </Modal>
  );
}
