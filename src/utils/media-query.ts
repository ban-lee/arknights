import { em, getBreakpointValue, MantineTheme } from '@mantine/styles';

export function lessThanSmall(theme: MantineTheme) {
  return `(max-width: ${em(getBreakpointValue(theme.breakpoints.md) - 1)})`;
}

export function lessThanLarge(theme: MantineTheme) {
  return `(max-width: ${em(getBreakpointValue(theme.breakpoints.lg) - 1)})`;
}

export function smallOrMore(theme: MantineTheme) {
  return `(min-width: ${em(getBreakpointValue(theme.breakpoints.md))})`;
}

export function largeOrMore(theme: MantineTheme) {
  return `(min-width: ${em(getBreakpointValue(theme.breakpoints.lg))})`;
}
