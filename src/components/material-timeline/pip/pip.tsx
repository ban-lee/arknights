import { MaterialEvent } from '@/types/keystone-types';
import { Popover, UnstyledButton } from '@mantine/core';
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
        <UnstyledButton
          aria-label={`${event.name} info`}
          sx={{
            background: bgColour,
            borderRadius: PIP_SIZE / 2,
            color: fontColour,
            height: PIP_SIZE,
            textAlign: 'center',
            width: PIP_SIZE,
          }}
          variant="transparent"
          onKeyDown={(event) => {
            switch (event.key) {
              case 'Escape':
              case 'Tab':
                close();
                break;
              case ' ':
                opened ? close() : open();
                break;
              default:
                break;
            }
          }}
          onMouseEnter={open}
          onMouseLeave={close}
        >
          <i className="bi bi-info"></i>
        </UnstyledButton>
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
