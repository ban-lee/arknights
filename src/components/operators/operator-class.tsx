import Image from 'next/image';
import { Box, Tooltip } from '@mantine/core';
import { Operator } from '@prisma/client';

const ARCHETYPES = new Map(
  [
    { label: 'Abjurer', value: 'abjurer' },
    { label: 'Agent', value: 'agent' },
    { label: 'Ambusher', value: 'ambusher' },
    { label: 'Artificer', value: 'artificer' },
    { label: 'Artilleryman', value: 'artilleryman' },
    { label: 'Arts Fighter', value: 'artsfighter' },
    { label: 'Arts Protector', value: 'artsprotector' },
    { label: 'Bard', value: 'bard' },
    { label: 'Besieger', value: 'besieger' },
    { label: 'Blast Caster', value: 'blastcaster' },
    { label: 'Centurion', value: 'centurion' },
    { label: 'Chain Caster', value: 'chaincaster' },
    { label: 'Chain Healer', value: 'chainhealer' },
    { label: 'Charger', value: 'charger' },
    { label: 'Core Caster', value: 'corecaster' },
    { label: 'Crusher', value: 'crusher' },
    { label: 'Deadeye', value: 'deadeye' },
    { label: 'Decel Binder', value: 'decelbinder' },
    { label: 'Dollkeeper', value: 'dollkeeper' },
    { label: 'Dreadnought', value: 'dreadnought' },
    { label: 'Duelist', value: 'duelist' },
    { label: 'Executor', value: 'executor' },
    { label: 'Fighter', value: 'fighter' },
    { label: 'Flinger', value: 'flinger' },
    { label: 'Fortress', value: 'fortress' },
    { label: 'Geek', value: 'geek' },
    { label: 'Guardian', value: 'guardian' },
    { label: 'Heavyshooter', value: 'heavyshooter' },
    { label: 'Hexer', value: 'hexer' },
    { label: 'Hookmaster', value: 'hookmaster' },
    { label: 'Incantation Medic', value: 'incantationmedic' },
    { label: 'Instructor', value: 'instructor' },
    { label: 'Juggernaut', value: 'juggernaut' },
    { label: 'Liberator', value: 'liberator' },
    { label: 'Lord', value: 'lord' },
    { label: 'Marksman', value: 'marksman' },
    { label: 'Mech-Accord', value: 'mechaccord' },
    { label: 'Medic', value: 'medic' },
    { label: 'Merchant', value: 'merchant' },
    { label: 'Multi-target Medic', value: 'multitargetmedic' },
    { label: 'Musha', value: 'musha' },
    { label: 'Mystic Caster', value: 'mysticcaster' },
    { label: 'Phalanx Caster', value: 'phalanxcaster' },
    { label: 'Pioneer', value: 'pioneer' },
    { label: 'Protector', value: 'protector' },
    { label: 'Push Stroker', value: 'pushstroker' },
    { label: 'Reaper', value: 'reaper' },
    { label: 'Sacrificial Specialist', value: 'sacrificialspecialist' },
    { label: 'Splash Caster', value: 'splashcaster' },
    { label: 'Spreadshooter', value: 'spreadshooter' },
    { label: 'Standard Bearer', value: 'standardbearer' },
    { label: 'Summoner', value: 'summoner' },
    { label: 'Swordmaster', value: 'swordmaster' },
    { label: 'Tactician', value: 'tactician' },
    { label: 'Therapist', value: 'therapist' },
    { label: 'Trapmaster', value: 'trapmaster' },
    { label: 'Wandering Medic', value: 'wanderingmedic' },
  ].map((type) => [type.value, type.label])
);

interface OperatorClassProps {
  operator: Operator;
}

function getClass(operator: Operator): string {
  if (!operator.archetype || !ARCHETYPES.has(operator.archetype)) return 'Unknown archetype';

  return `${ARCHETYPES.get(operator.archetype)}`;
}

export function OperatorClass({ operator }: OperatorClassProps) {
  return (
    <Tooltip label={getClass(operator)}>
      <Box
        sx={(theme) => ({
          position: 'absolute',
          top: 5,
          left: 5,
          zIndex: 100,

          backgroundColor: theme.black,
          borderRadius: 3,
          padding: 2,
          width: 29,
          height: 29,
        })}
      >
        <Image
          src={`/ui/class/class_${operator.class}.png`}
          alt={operator.class || 'Unknown class'}
          width="25"
          height="25"
          css={{
            objectFit: 'contain',
          }}
        />
      </Box>
    </Tooltip>
  );
}
