import { ActionIcon, Popover } from '@mantine/core';
import { MaterialEvent } from '@/types/keystone-types';
import { Summary } from '../summary';
import { useDisclosure } from '@mantine/hooks';
import { useTopColour } from '@/hooks/useTopColour';

export const PIP_SIZE = 24;

export function Pip({ event }: { event: MaterialEvent }) {
  const [bgColour, fontColour] = useTopColour(event.topColour);
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Popover
      position="top"
      opened={opened}
    >
      <Popover.Target>
        <ActionIcon
          sx={{
            background: bgColour,
            color: fontColour,
          }}
          variant="transparent"
          radius="xl"
          size={PIP_SIZE}
          onMouseEnter={open}
          onMouseLeave={close}
          onKeyDown={(event) => {
            switch (event.key) {
              case 'Escape':
                close();
                break;
              case ' ':
                opened ? close() : open();
                break;
              default:
                break;
            }
          }}
          onBlur={close}
          onClick={() => (opened ? close() : open())}
          aria-label={`${event.name} info`}
        >
          <i className="bi bi-info"></i>
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown
        p={0}
        sx={{
          border: 'none',
          borderRadius: 10,
        }}
      >
        <Summary event={event} />
      </Popover.Dropdown>
    </Popover>
  );
}
