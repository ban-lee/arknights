import { em, getBreakpointValue, MantineTheme } from '@mantine/styles';

export function lessThanSmall(theme: MantineTheme) {
  return `@media (max-width: ${em(getBreakpointValue(theme.breakpoints.sm))})`;
}

export function moreThanSmall(theme: MantineTheme) {
  return `@media (min-width: ${em(getBreakpointValue(theme.breakpoints.sm) + 1)})`;
}

export function moreThanMedium(theme: MantineTheme) {
  return `@media (min-width: ${em(getBreakpointValue(theme.breakpoints.lg) + 1)})`;
}

export function mediumScreenSize(theme: MantineTheme) {
  return (
    `@media ` +
    `(min-width: ${em(getBreakpointValue(theme.breakpoints.sm))}) and ` +
    `(max-width: ${em(getBreakpointValue(theme.breakpoints.lg))})`
  );
}
