import { isLight } from '@/utils/colour';
import { useEffect, useState } from 'react';
import { useMantineTheme } from '@mantine/core';

export function useTopColour(topColour: string): [string, string] {
  const theme = useMantineTheme();
  const [fontColour, setFontColour] = useState('');

  useEffect(() => {
    if (!topColour) {
      setFontColour(theme.white);
      return;
    }

    const isBgLight = isLight(topColour);
    setFontColour(isBgLight ? theme.black : theme.white);
  }, [theme, topColour]);

  return [topColour, fontColour];
}
