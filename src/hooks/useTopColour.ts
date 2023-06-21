import { isLight } from '@/utils/colour';
import { MantineTheme, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';

function calculateFontColour(theme: MantineTheme, topColour: string): string {
  if (!topColour) {
    return theme.white;
  }
  return isLight(topColour) ? theme.black : theme.white;
}

export function useTopColour(topColour: string): [string, string] {
  const theme = useMantineTheme();
  const [fontColour, setFontColour] = useState(calculateFontColour(theme, topColour));

  useEffect(() => {
    const colour = calculateFontColour(theme, topColour);
    setFontColour(colour);
  }, [theme, topColour]);

  return [topColour, fontColour];
}
